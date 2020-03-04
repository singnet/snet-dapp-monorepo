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
import { clientTypes } from "shared/dist/utils/clientTypes";
import { GlobalRoutes } from "../../../GlobalRouter/Routes";

export const SET_ALL_ORG_ATTRIBUTES = "SET_ALL_ORG_ATTRIBUTES";
export const SET_ONE_BASIC_DETAIL = "SET_ONE_BASIC_DETAIL";
export const RESET_ORGANIZATION_DATA = "RESET_ORGANIZATION_DATA";
export const SET_CONTACTS = "SET_CONTACTS";
export const SET_HERO_IMAGE = "SET_HERO_IMAGE";
export const SET_GROUPS = "SET_GROUPS";
export const SET_ORGANIZATION_STATUS = "SET_ORGANIZATION_STATUS";
export const SET_ORG_SAME_MAILING_ADDRESS = "SET_ORG_SAME_MAILING_ADDRESS";
export const SET_ORG_HQ_ADDRESS_DETAIL = "SET_HQ_ADDRES_DETAIL";
export const SET_ORG_MAILING_ADDRESS_DETAIL = "SET_MAILING_ADDRESS_DETAIL";
export const SET_ORG_OWNER = "SET_ORG_OWNER";
export const SET_ORG_STATE_ALL = "SET_ORG_STATE_ALL";
export const SET_ORG_STATE_STATE = "SET_ORG_STATE_STATE";
export const SET_ORG_STATE_UPDATED_ON = "SET_ORG_STATE_UPDATED_ON";
export const SET_ORG_STATE_UPDATED_BY = "SET_ORG_STATE_UPDATED_BY";
export const SET_ORG_STATE_REVIEWED_BY = "SET_ORG_STATE_REVIEWED_BY";
export const SET_ORG_STATE_REVIEWED_ON = "SET_ORG_STATE_REVIEWED_ON";
export const SET_ORG_HERO_IMAGE_URL = "SET_ORG_HERO_IMAGE_URL";

export const setAllAttributes = value => ({ type: SET_ALL_ORG_ATTRIBUTES, payload: value });

export const setOneBasicDetail = (name, value) => ({ type: SET_ONE_BASIC_DETAIL, payload: { [name]: value } });

export const resetOrganizationData = () => ({ type: RESET_ORGANIZATION_DATA });

export const setContacts = contacts => ({ type: SET_CONTACTS, payload: contacts });

export const setHeroImage = (raw, fileType) => ({ type: SET_HERO_IMAGE, payload: { raw, fileType } });

export const setGroups = groups => ({ type: SET_GROUPS, payload: groups });

export const setOrganizationStatus = status => ({ type: SET_ORGANIZATION_STATUS, payload: status });

export const setOrgHqAddressDetail = (name, value) => ({ type: SET_ORG_HQ_ADDRESS_DETAIL, payload: { [name]: value } });

export const setOrgMailingAddressDetail = (name, value) => ({
  type: SET_ORG_MAILING_ADDRESS_DETAIL,
  payload: { [name]: value },
});

export const setOrgOwner = owner => ({ type: SET_ORG_OWNER, payload: owner });

export const setOrgStateAll = state => ({ type: SET_ORG_STATE_ALL, payload: state });

export const setOrgStateState = state => ({ type: SET_ORG_STATE_STATE, payload: state });

export const setOrgSameMailingAddress = value => ({ type: SET_ORG_SAME_MAILING_ADDRESS, payload: value });
export const setOrgHeroImageUrl = url => ({ type: SET_ORG_HERO_IMAGE_URL, payload: url });

const uploadFileAPI = (assetType, fileBlob, orgUuid) => async dispatch => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  let url = `${APIEndpoints.UTILITY.endpoint}${APIPaths.UPLOAD_FILE}?type=${assetType}&org_uuid=${orgUuid}`;
  const res = await fetch(url, { method: "POST", headers: { authorization: token }, body: fileBlob });
  return await res.json();
};

export const uploadFile = (assetType, fileBlob, orgUuid) => async dispatch => {
  try {
    dispatch(loaderActions.startAppLoader(LoaderContent.UPLOAD_FILE));
    const { data, error } = await dispatch(uploadFileAPI(assetType, fileBlob, orgUuid));
    if (error.code) {
      throw new APIError(error.message);
    }
    dispatch(loaderActions.stopAppLoader());
    return data;
  } catch (error) {
    dispatch(loaderActions.stopAppLoader());
    throw error;
  }
};

const payloadForSubmit = organization => {
  // prettier-ignore
  const { id, uuid, duns, name, type, website, shortDescription, longDescription, metadataIpfsUri,
    contacts, assets, ownerFullName, orgAddress } = organization;
  const { hqAddress, mailingAddress, sameMailingAddress } = orgAddress;

  const payload = {
    origin: clientTypes.PUBLISHER_DAPP,
    org_id: id,
    org_uuid: uuid,
    org_name: name,
    duns_no: duns,
    org_type: type,
    owner_name: ownerFullName,
    metadata_ipfs_uri: metadataIpfsUri,
    description: longDescription,
    short_description: shortDescription,
    url: website,
    contacts,
    org_address: {
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
    },
    assets: {
      hero_image: {
        url: organization.assets.heroImage.url,
        ipfs_uri: organization.assets.heroImage.ipfsUri || "",
      },
    },
    ownerAddress: organization.ownerAddress,
  };

  const groupsToBeSubmitted = organization.groups.map(group => ({
    name: group.name,
    id: group.id,
    payment_address: group.paymentAddress,
    payment_config: {
      payment_expiration_threshold: Number(group.paymentConfig.paymentExpirationThreshold),
      payment_channel_storage_type: group.paymentConfig.paymentChannelStorageType,
      payment_channel_storage_client: {
        connection_timeout: `${group.paymentConfig.paymentChannelStorageClient.connectionTimeout}s`,
        request_timeout: `${group.paymentConfig.paymentChannelStorageClient.requestTimeout}s`,
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
    return data;
  }

  const selectedOrg = data[0];

  const parseOrgAddress = () => {
    const { mail_address_same_hq_address, addresses } = selectedOrg.org_address;
    const mailingAddressData = addresses.find(el => el.address_type === addressTypes.MAILING);
    const hqAddressData = addresses.find(el => el.address_type === addressTypes.HEAD_QUARTERS);
    const orgAddress = {
      sameMailingAddress: mail_address_same_hq_address,
      hqAddress: !hqAddressData
        ? {}
        : {
            street_address: hqAddressData.street_address,
            apartment: hqAddressData.apartment,
            city: hqAddressData.city,
            zip: hqAddressData.pincode,
            country: hqAddressData.country,
          },
      mailingAddress: !mailingAddressData
        ? {}
        : {
            apartment: mailingAddressData.apartment,
            city: mailingAddressData.city,
            zip: mailingAddressData.pincode,
            country: mailingAddressData.country,
          },
    };
    return orgAddress;
  };

  const organization = {
    state: selectedOrg.state,
    id: selectedOrg.org_id,
    uuid: selectedOrg.org_uuid,
    ownerFullName: selectedOrg.owner_name,
    name: selectedOrg.org_name,
    type: selectedOrg.org_type,
    longDescription: selectedOrg.description,
    shortDescription: selectedOrg.short_description,
    website: selectedOrg.url,
    duns: selectedOrg.duns_no,
    contacts: selectedOrg.contacts,
    orgAddress: parseOrgAddress(),
    assets: {
      heroImage: {
        url: selectedOrg.assets.hero_image.url,
        ipfsUri: selectedOrg.assets.hero_image.ipfs_uri,
      },
    },
  };

  if (selectedOrg.assets && selectedOrg.assets.hero_image && selectedOrg.assets.hero_image.url) {
    organization.assets = {};
    organization.assets.heroImage = { url: selectedOrg.assets.hero_image.url };
  }

  if (!isEmpty(selectedOrg.groups)) {
    const parsedGroups = selectedOrg.groups.map(group => ({
      name: group.name,
      id: group.id,
      paymentAddress: group.payment_address,
      paymentConfig: {
        paymentExpirationThreshold: group.payment_config.payment_expiration_threshold,
        paymentChannelStorageType: group.payment_config.payment_channel_storage_type,
        paymentChannelStorageClient: {
          connectionTimeout: group.payment_config.payment_channel_storage_client.connection_timeout.replace("s", ""),
          requestTimeout: group.payment_config.payment_channel_storage_client.connection_timeout.replace("s", ""),
          endpoints: group.payment_config.payment_channel_storage_client.endpoints,
        },
      },
    }));
    organization.groups = parsedGroups;
  }
  dispatch(setAllAttributes(organization));
  return data;
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

const submitForApprovalAPI = payload => async dispatch => {
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

const createOrganizationAPI = payload => async dispatch => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.REGISTRY.name;
  const apiPath = APIPaths.CREATE_ORG;
  const apiOptions = initializeAPIOptions(token, payload);
  return await API.post(apiName, apiPath, apiOptions);
};

export const createOrganization = organization => async dispatch => {
  try {
    dispatch(loaderActions.startAppLoader(LoaderContent.ORG_SETUP_CREATE));
    const payload = payloadForSubmit(organization);
    payload.groups = [];
    const { status, data, error } = await dispatch(createOrganizationAPI(payload));
    if (status !== responseStatus.SUCCESS) {
      throw new APIError(error.message);
    }
    dispatch(loaderActions.stopAppLoader());
    return data;
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
    dispatch(setOneBasicDetail("metadataIpfsUri", data.metadata_ipfs_uri));
    if (status !== responseStatus.SUCCESS) {
      dispatch(loaderActions.stopAppLoader());
      throw new APIError(error.message);
    }
    dispatch(loaderActions.stopAppLoader());
    return data.metadata_ipfs_uri;
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
const registerOrganizationInBlockChain = (organization, metadataIpfsUri, history) => async dispatch => {
  const sdk = await initSDK();
  const orgId = organization.id;
  const orgMetadataURI = metadataIpfsUri;
  const members = [organization.ownerAddress];
  dispatch(loaderActions.startAppLoader(LoaderContent.METAMASK_TRANSACTION));
  return new Promise((resolve, reject) => {
    const method = sdk._registryContract
      .createOrganization(orgId, orgMetadataURI, members)
      .send()
      .on(blockChainEvents.TRANSACTION_HASH, async hash => {
        await dispatch(saveTransaction(organization.uuid, hash, organization.ownerAddress));
        dispatch(loaderActions.startAppLoader(LoaderContent.BLOCKHAIN_SUBMISSION));
        resolve(hash);
      })
      .once(blockChainEvents.CONFIRMATION, async () => {
        dispatch(setOrgStateState(organizationSetupStatuses.PUBLISHED));
        await history.push(GlobalRoutes.SERVICES.path.replace(":orgUuid", organization.uuid));
        dispatch(loaderActions.stopAppLoader());
        await method.off();
      })
      .on(blockChainEvents.ERROR, error => {
        dispatch(loaderActions.stopAppLoader());
        reject(error);
      });
  });
};
const updateOrganizationInBlockChain = (organization, metadataIpfsUri, history) => async dispatch => {
  const sdk = await initSDK();
  const orgId = organization.id;
  const orgMetadataURI = metadataIpfsUri;
  return new Promise((resolve, reject) => {
    const method = sdk._registryContract
      .changeOrganizationMetadataURI(orgId, orgMetadataURI)
      .send()
      .on(blockChainEvents.TRANSACTION_HASH, async hash => {
        await dispatch(saveTransaction(organization.uuid, hash, organization.ownerAddress));
        dispatch(loaderActions.startAppLoader(LoaderContent.BLOCKHAIN_SUBMISSION));
        resolve(hash);
      })
      .once(blockChainEvents.CONFIRMATION, async () => {
        dispatch(setOrgStateState(organizationSetupStatuses.PUBLISHED));
        await history.push(GlobalRoutes.SERVICES.path.replace(":orgUuid", organization.uuid));
        dispatch(loaderActions.stopAppLoader());
        await method.off();
      })
      .on(blockChainEvents.ERROR, error => {
        dispatch(loaderActions.stopAppLoader());
        reject(error);
      });
  });
};

export const publishOrganizationInBlockchain = (organization, metadataIpfsUri, history) => async dispatch => {
  try {
    const sdk = await initSDK();
    const orgId = organization.id;
    const orgMetadataURI = metadataIpfsUri;
    const OrganizationDetailsFromBlockChain = await sdk._registryContract.getOrganizationById(orgId).call();
    if (!OrganizationDetailsFromBlockChain.found) {
      return await dispatch(registerOrganizationInBlockChain(organization, orgMetadataURI, history));
    }
    return await dispatch(updateOrganizationInBlockChain(organization, orgMetadataURI, history));
  } catch (error) {
    dispatch(loaderActions.stopAppLoader());
    throw error;
  }
};

const getOwnerAPI = uuid => async dispatch => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.REGISTRY.name;
  const apiPath = APIPaths.GET_MEMBERS(uuid);
  const queryStringParameters = { role: "owner" };
  const apiOptions = initializeAPIOptions(token, null, queryStringParameters);
  return await API.get(apiName, apiPath, apiOptions);
};

export const getOwner = uuid => async dispatch => {
  const { data } = await dispatch(getOwnerAPI(uuid));
  await dispatch(setOrgOwner(data[0].username));
  return data;
};

export const initializeOrg = async dispatch => {
  try {
    const data = await dispatch(getStatus);
    if (data && data[0]) {
      await dispatch(getOwner(data[0].org_uuid));
    }
  } catch (error) {
    // ! do not remove this catch. It stops the error bubbling and allows
    // ! the login to work seamlessly even if the initializeOrg fails
    return undefined;
  }
};
