import { API } from "aws-amplify";
import isEmpty from "lodash/isEmpty";

import { APIEndpoints, APIPaths } from "../../AWS/APIEndpoints";
import { initializeAPIOptions } from "../../../Utils/API";
import { fetchAuthenticatedUser } from "./userActions/loginActions";
import { loaderActions } from "./";
import { LoaderContent } from "../../../Utils/Loader";
import { responseStatus, APIError } from "shared/dist/utils/API";
import { organizationSetupStatuses, addressTypes, orgSubmitActions } from "../../../Utils/organizationSetup";
import { initSDK } from "shared/dist/utils/snetSdk";
import { blockChainEvents } from "../../../Utils/Blockchain";

export const SET_ALL_ATTRIBUTES = "SET_ALL_ATTRIBUTES";
export const SET_ONE_BASIC_DETAIL = "SET_ONE_BASIC_DETAIL";
export const SET_CONTACTS = "SET_CONTACTS";
export const SET_HERO_IMAGE = "SET_HERO_IMAGE";
export const SET_GROUPS = "SET_GROUPS";
export const SET_ORGANIZATION_STATUS = "SET_ORGANIZATION_STATUS";
export const SET_HQ_ADDRESS_DETAIL = "SET_HQ_ADDRES_DETAIL";
export const SET_MAILING_ADDRESS_DETAIL = "SET_MAILING_ADDRESS_DETAIL";

export const setAllAttributes = value => ({ type: SET_ALL_ATTRIBUTES, payload: value });

export const setOneBasicDetail = (name, value) => ({ type: SET_ONE_BASIC_DETAIL, payload: { [name]: value } });

export const setContacts = contacts => ({ type: SET_CONTACTS, payload: contacts });

export const setHeroImage = (raw, fileType) => ({ type: SET_HERO_IMAGE, payload: { raw, fileType } });

export const setGroups = groups => ({ type: SET_GROUPS, payload: groups });

export const setOrganizationStatus = status => ({ type: SET_ORGANIZATION_STATUS, payload: status });

export const setHqAddressDetail = (name, value) => ({ type: SET_HQ_ADDRESS_DETAIL, payload: { [name]: value } });

export const setMailingAddressDetail = (name, value) => ({
  type: SET_MAILING_ADDRESS_DETAIL,
  payload: { [name]: value },
});

const payloadForSubmit = organization => {
  // prettier-ignore
  const { id, uuid,duns, name, type, website, shortDescription, longDescription, metadataIpfsHash,
    contacts, assets, ownerFullName, hqAddress, mailingAddress, sameMailingAddress } = organization;

  const payload = {
    org_id: id,
    org_uuid: uuid,
    org_name: name,
    duns_no: duns,
    org_type: type,
    owner_name: ownerFullName,
    metadata_ipfs_hash: metadataIpfsHash,
    description: longDescription,
    short_description: shortDescription,
    url: website,
    contacts,
    mail_address_same_hq_address: sameMailingAddress,
    addresses: [
      {
        address_type: addressTypes.HEAD_QUARTERS,
        street_address: hqAddress.street,
        apartment: hqAddress.apartment,
        city: hqAddress.city,
        pincode: hqAddress.zip,
        country: hqAddress.country,
      },
      {
        address_type: addressTypes.MAILING,
        street_address: sameMailingAddress ? hqAddress.street : mailingAddress.street,
        apartment: sameMailingAddress ? hqAddress.apartment : mailingAddress.apartment,
        city: sameMailingAddress ? hqAddress.city : mailingAddress.city,
        pincode: sameMailingAddress ? hqAddress.zip : mailingAddress.zip,
        country: sameMailingAddress ? hqAddress.country : mailingAddress.country,
      },
    ],
    assets: { hero_image: {} },
    ownerAddress: organization.ownerAddress,
  };

  const groupsToBeSubmitted = organization.groups.map(group => ({
    name: group.name,
    id: group.id,
    payment_address: group.paymentAddress,
    payment_config: {
      payment_expiration_threshold: group.paymentConfig.paymentExpirationThreshold,
      payment_channel_storage_type: group.paymentConfig.paymentChannelStorageType,
      payment_channel_storage_client: {
        connection_timeout: group.paymentConfig.paymentChannelStorageClient.connectionTimeout,
        request_timeout: group.paymentConfig.paymentChannelStorageClient.connectionTimeout,
        endpoints: group.paymentConfig.paymentChannelStorageClient.endpoints,
      },
    },
  }));

  payload.groups = groupsToBeSubmitted;

  if (assets.heroImage.url) {
    payload.assets.hero_image = { url: assets.heroImage.url };
  } else {
    payload.assets.hero_image = { raw: assets.heroImage.raw, file_type: assets.heroImage.fileType };
  }

  return payload;
};

const getStatusAPI = () => async dispatch => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.REGISTRY.name;
  const apiPath = APIPaths.ORG_SETUP;
  const apiOptions = initializeAPIOptions(token);
  return await API.get(apiName, apiPath, apiOptions);
};

export const getStatus = async dispatch => {
  const { data } = await dispatch(getStatusAPI());
  if (isEmpty(data)) {
    return;
  }
  const organization = {
    status: data[0].status,
    id: data[0].org_id,
    uuid: data[0].org_uuid,
    ownerFullName: data[0].owner_name,
    // TODO rename data[0].name to data[0].org_name
    name: data[0].name,
    type: data[0].org_type,
    description: data[0].description,
    shortDescription: data[0].short_description,
    website: data[0].url,
    duns: data[0].duns_no,
    contacts: data[0].contacts,
  };

  if (data[0].assets && data[0].assets.hero_image && data[0].assets.hero_image.url) {
    organization.assets = {};
    organization.assets.heroImage = { url: data[0].assets.hero_image.url };
  }

  if (!isEmpty(data[0].groups)) {
    const parsedGroups = data[0].groups.map(group => ({
      name: group.name,
      id: group.id,
      paymentAddress: group.payment_address,
      paymentConfig: {
        paymentExpirationThreshold: group.payment_config.payment_expiration_threshold,
        paymentChannelStorageType: group.payment_config.payment_channel_storage_type,
        paymentChannelStorageClient: {
          connectionTimeout: group.payment_config.payment_channel_storage_client.connection_timeout,
          requestTimeout: group.payment_config.payment_channel_storage_client.connection_timeout,
          endpoints: group.payment_config.payment_channel_storage_client.endpoints,
        },
      },
    }));
    organization.groups = parsedGroups;
  }
  dispatch(setAllAttributes(organization));
};

const finishLaterAPI = payload => async dispatch => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.REGISTRY.name;
  const apiPath = APIPaths.ORG_SETUP;
  const queryStringParameters = { action: orgSubmitActions.DRAFT };
  const apiOptions = initializeAPIOptions(token, payload, queryStringParameters);
  return await API.post(apiName, apiPath, apiOptions);
};

export const finishLater = organization => async dispatch => {
  try {
    dispatch(loaderActions.startAppLoader(LoaderContent.ORG_SETUP_FINISH_LATER));
    const payload = payloadForSubmit(organization);
    await dispatch(finishLaterAPI(payload));
    dispatch(loaderActions.stopAppLoader());
  } catch (error) {
    dispatch(loaderActions.stopAppLoader());
    throw error;
  }
};

export const submitForApprovalAPI = payload => async dispatch => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.REGISTRY.name;
  const apiPath = APIPaths.ORG_SETUP;
  const queryStringParameters = { action: orgSubmitActions.SUBMIT };
  const apiOptions = initializeAPIOptions(token, payload, queryStringParameters);
  return await API.post(apiName, apiPath, apiOptions);
};

export const submitForApproval = organization => async dispatch => {
  try {
    dispatch(loaderActions.startAppLoader(LoaderContent.ORG_SETUP_SUBMIT_FOR_APPROVAL));
    const payload = payloadForSubmit(organization);
    const { status, error } = await dispatch(submitForApprovalAPI(payload));
    if (status !== responseStatus.SUCCESS) {
      throw new APIError(error.message);
    }
    dispatch(loaderActions.stopAppLoader());
  } catch (error) {
    dispatch(loaderActions.stopAppLoader());
    throw error;
  }
};

const publishToIPFSAPI = uuid => async dispatch => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.REGISTRY.name;
  const apiPath = APIPaths.PUBLISH_TO_IPFS(uuid);
  const apiOptions = initializeAPIOptions(token);
  return await API.post(apiName, apiPath, apiOptions);
};

export const publishToIPFS = uuid => async dispatch => {
  try {
    dispatch(loaderActions.startAppLoader(LoaderContent.ORG_SETUP_PUBLISH_TO_IPFS));
    const { status, data, error } = await dispatch(publishToIPFSAPI(uuid));
    dispatch(setOneBasicDetail("metadataIpfsHash", data.metadata_ipfs_hash));
    if (status !== responseStatus.SUCCESS) {
      dispatch(loaderActions.stopAppLoader());
      throw new APIError(error.message);
    }
    dispatch(loaderActions.stopAppLoader());
    return data.metadata_ipfs_hash;
  } catch (error) {
    dispatch(loaderActions.stopAppLoader());
    throw error;
  }
};

const saveTransactionAPI = (orgUuid, hash, ownerAddress) => async dispatch => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.REGISTRY.name;
  const apiPath = APIPaths.SAVE_TRANSACTION(orgUuid);
  const body = { transaction_hash: hash, wallet_address: ownerAddress };
  const apiOptions = initializeAPIOptions(token, body);
  return await API.post(apiName, apiPath, apiOptions);
};

const saveTransaction = (orgUuid, hash, ownerAddress) => async dispatch => {
  try {
    dispatch(loaderActions.startAppLoader(LoaderContent.ORG_SETUP_SAVING_TRANSACTION));
    const { status, error } = await dispatch(saveTransactionAPI(orgUuid, hash, ownerAddress));
    if (status !== responseStatus.SUCCESS) {
      throw new APIError(error.message);
    }
  } catch (error) {
    dispatch(loaderActions.stopAppLoader());
    throw error;
  }
};

export const createAndSaveTransaction = (organization, ipfsHash) => async dispatch => {
  try {
    const sdk = await initSDK();
    const orgId = organization.id;
    const orgMetadataURI = ipfsHash;
    const members = [organization.ownerAddress];
    dispatch(loaderActions.startAppLoader(LoaderContent.METAMASK_TRANSACTION));
    return new Promise((resolve, reject) => {
      sdk._registryContract
        .createOrganization(orgId, orgMetadataURI, members)
        .on(blockChainEvents.TRANSACTION_HASH, async hash => {
          await dispatch(saveTransaction(organization.uuid, hash, organization.ownerAddress));
          dispatch(loaderActions.startAppLoader(LoaderContent.BLOCKHAIN_SUBMISSION));
          resolve(hash);
        })
        .on(blockChainEvents.RECEIPT, () => {
          dispatch(setOneBasicDetail("status", organizationSetupStatuses.PUBLISHED));
          dispatch(loaderActions.stopAppLoader());
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
