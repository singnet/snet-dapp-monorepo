import { API } from "aws-amplify";
import isEmpty from "lodash/isEmpty";

import { initializeAPIOptions } from "../../../Utils/API";
import { memberStatus } from "../../../Utils/TeamMembers";
import { APIEndpoints, APIPaths } from "../../AWS/APIEndpoints";
import { fetchAuthenticatedUser } from "./userActions/loginActions";
import { loaderActions, organizationActions } from "./";
import { LoaderContent } from "../../../Utils/Loader";
import { APIError } from "shared/dist/utils/API";
import { setUserInviteeStatus, setUserInviteCode } from "./userActions/onboardingActions";
import { initSDK } from "shared/dist/utils/snetSdk";
import { blockChainEvents } from "../../../Utils/Blockchain";
import ValidationError from "shared/dist/utils/validationError";

export const SET_MEMBERS_FOR_STATUS = "SET_MEMBERS_FOR_STATUS";

export const setMembersForStatus = (status, members) => ({
  type: SET_MEMBERS_FOR_STATUS,
  payload: { [status]: members },
});

const getMembersAPI = (status, uuid) => async dispatch => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.REGISTRY.name;
  const apiPath = APIPaths.GET_MEMBERS(uuid);
  const queryStringParameters = { status };
  const apiOptions = initializeAPIOptions(token, null, queryStringParameters);
  return await API.get(apiName, apiPath, apiOptions);
};

export const getMembers = (status, uuid) => async dispatch => {
  const { data } = await dispatch(getMembersAPI(status, uuid));
  dispatch(setMembersForStatus(status, data));
};

export const getAllMembers = uuid => async dispatch => {
  try {
    dispatch(loaderActions.startAppLoader(LoaderContent.GET_ALL_MEMBERS));
    const promises = Object.values(memberStatus).map(status => {
      return dispatch(getMembers(status, uuid));
    });
    await Promise.all(promises);
    dispatch(loaderActions.stopAppLoader());
  } catch (error) {
    dispatch(loaderActions.stopAppLoader());
  }
};

const generateInviteMembersPayload = members => ({ members: members.map(member => ({ username: member.trim() })) });

const inviteMembersAPI = (payload, uuid) => async dispatch => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.REGISTRY.name;
  const apiPath = APIPaths.INVITE_MEMBERS(uuid);
  const apiOptions = initializeAPIOptions(token, payload);
  return await API.post(apiName, apiPath, apiOptions);
};

export const inviteMembers = (members, uuid) => async dispatch => {
  try {
    dispatch(loaderActions.startAppLoader(LoaderContent.INVITE_MEMBERS));
    const payload = generateInviteMembersPayload(members);
    await dispatch(inviteMembersAPI(payload, uuid));
    await dispatch(getMembers(memberStatus.PENDING, uuid));
    return dispatch(loaderActions.stopAppLoader());
  } catch (error) {
    dispatch(loaderActions.stopAppLoader());
    throw error;
  }
};

const acceptInvitationAPI = payload => async dispatch => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.REGISTRY.name;
  const apiPath = APIPaths.ACCEPT_INVITATION;
  const apiOptions = initializeAPIOptions(token, payload);
  return await API.post(apiName, apiPath, apiOptions);
};

export const acceptInvitation = payload => async dispatch => {
  const { data, error } = await dispatch(acceptInvitationAPI(payload));
  if (error.code) {
    throw new APIError(error.message);
  }
  return data;
};

export const acceptInvitationAndGetLatestOrgStatus = payload => async dispatch => {
  try {
    dispatch(loaderActions.startAppLoader(LoaderContent.ACCEPT_INVITATION));
    await dispatch(acceptInvitation(payload));
    const orgList = await dispatch(organizationActions.getStatus);

    dispatch(loaderActions.stopAppLoader());
    if (isEmpty(orgList)) {
      return null;
    }
    const selectedOrg = orgList[0];
    return selectedOrg;
  } catch (error) {
    dispatch(loaderActions.stopAppLoader());
    throw error;
  }
};

const verifyInvitationCodeAPI = code => async dispatch => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.REGISTRY.name;
  const apiPath = APIPaths.VERIFY_INIVITATION;
  const queryParameters = {
    invite_code: code,
  };
  const apiOptions = initializeAPIOptions(token, null, queryParameters);
  return await API.get(apiName, apiPath, apiOptions);
};

export const verifyInvitation = code => async dispatch => {
  try {
    dispatch(loaderActions.startAppLoader(LoaderContent.VERIFY_INVITATION_CODE));
    const { data, error } = await dispatch(verifyInvitationCodeAPI(code));
    if (error.code) {
      throw new APIError(error.message);
    }
    dispatch(setUserInviteCode(code));
    dispatch(loaderActions.stopAppLoader());
    return data;
  } catch (error) {
    dispatch(loaderActions.stopAppLoader());
    throw error;
  }
};

const getMemberStatusAPI = (username, orgUuid) => async dispatch => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.REGISTRY.name;
  const apiPath = APIPaths.GET_MEMBER_STATUS(orgUuid, username);
  const apiOptions = initializeAPIOptions(token);
  return await API.get(apiName, apiPath, apiOptions);
};

export const getMemberStatus = (username, orgUuid) => async dispatch => {
  const { data, error } = await dispatch(getMemberStatusAPI(username, orgUuid));
  if (error.code) {
    throw new APIError(error.message);
  }
  if (data[0] && data[0].status) {
    setUserInviteeStatus(data[0].status);
  }
};
const generatePublishMembersPayload = (members, txnHash) => ({
  transaction_hash: txnHash,
  members: members.map(member => ({
    username: member.username,
    address: member.address,
    status: member.status,
  })),
});

const publishMembersAPI = (payload, uuid) => async dispatch => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.REGISTRY.name;
  const apiPath = APIPaths.PUBLISH_MEMBERS(uuid);
  const apiOptions = initializeAPIOptions(token, payload);
  return await API.post(apiName, apiPath, apiOptions);
};

export const publishMembers = (members, uuid, txnHash) => async dispatch => {
  try {
    dispatch(loaderActions.startAppLoader(LoaderContent.PUBLISH_MEMBERS));
    const payload = generatePublishMembersPayload(members, txnHash);
    await dispatch(publishMembersAPI(payload, uuid));
  } catch (error) {
    dispatch(loaderActions.stopAppLoader());
  }
};

const filterAdressFromMembers = members => members.map(member => member.address).filter(value => !!value);

export const addAndPublishMembers = (members, orgId, uuid, ownerAddress) => async dispatch => {
  try {
    const sdk = await initSDK();
    const address = await sdk.account.getAddress();
    if (address !== ownerAddress) {
      throw new ValidationError("The account selected in the Metamask is not the owner of this organization");
    }
    const newMembersAddress = filterAdressFromMembers(members);
    dispatch(loaderActions.startAppLoader(LoaderContent.ADD_MEMBERS_TO_BLOCKCHAIN));
    return new Promise((resolve, reject) => {
      const method = sdk._registryContract
        .addOrganizationMembers(orgId, newMembersAddress)
        .send()
        .on(blockChainEvents.TRANSACTION_HASH, async txnHash => {
          await dispatch(publishMembers(members, uuid, txnHash));
        })
        .once(blockChainEvents.CONFIRMATION, async () => {
          dispatch(loaderActions.stopAppLoader());
          resolve();
          await method.off();
        })
        .on(blockChainEvents.ERROR, error => {
          dispatch(loaderActions.stopAppLoader());
          reject(error);
        });
    });
  } catch (error) {
    dispatch(loaderActions.stopAppLoader());
    throw error;
  }
};
