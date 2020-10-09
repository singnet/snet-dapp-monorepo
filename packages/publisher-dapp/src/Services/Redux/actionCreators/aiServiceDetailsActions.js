import { API } from "aws-amplify";
import isEmpty from "lodash/isEmpty";
import MPENetworks from "singularitynet-platform-contracts/networks/MultiPartyEscrow";

import { fetchAuthenticatedUser } from "./userActions/loginActions";
import { APIEndpoints, APIPaths } from "../../AWS/APIEndpoints";
import { initializeAPIOptions } from "../../../Utils/API";
import { APIError } from "shared/dist/utils/API";
import { aiServiceListActions, loaderActions } from "./";
import { LoaderContent } from "../../../Utils/Loader";
import { initSDK } from "shared/dist/utils/snetSdk";
import { blockChainEvents } from "../../../Utils/Blockchain";
import { defaultGroups } from "../reducers/aiServiceDetailsReducer";
import { serviceCreationStatus } from "../../../Pages/AiServiceCreation/constant";
import { GlobalRoutes } from "../../../GlobalRouter/Routes";
import ValidationError from "shared/dist/utils/validationError";
import RegistryContract from "../../../Utils/PlatformContracts/RegistryContract";
import { MetamaskError } from "shared/dist/utils/error";

export const SET_ALL_SERVICE_DETAILS_ATTRIBUTES = "SET_ALL_SERVICE_DETAILS_ATTRIBUTES";
export const SET_AI_SERVICE_ID = "SET_AI_SERVICE_ID";
export const SET_AI_SERVICE_ID_AVAILABILITY = "SET_AI_SERVICE_ID_AVAILABILITY";
export const SET_AI_SERVICE_NAME = "SET_AI_SERVICE_NAME";
export const SET_AI_SERVICE_UUID = "SET_AI_SERVICE_UUID";
export const SET_AI_SERVICE_TOUCHED_FLAG = "SET_AI_SERVICE_TOUCHED_FLAG";
export const SET_AI_SERVICE_GROUPS = "SET_AI_SERVICE_ENDPOINTS";
export const SET_AI_SERVICE_FREE_CALL_SIGNER_ADDRESS = "SET_AI_SERVICE_FREE_CALL_SIGNER_ADDRESS";
export const SET_AI_SERVICE_DETAIL_LEAF = "SET_AI_SERVICE_DETAIL_LEAF";
export const SET_AI_SERVICE_MULTIPLE_DETAILS = "SET_AI_SERVICE_MULTIPLE_DETAILS";
export const SET_SERVICE_PROVIDER_COMMENT = "SET_SERVICE_PROVIDER_COMMENT";
export const SET_AI_SERVICE_STATE_STATE = "SET_AI_SERVICE_STATE_STATE";
export const SET_SERVICE_DETAILS_PROTO_URL = "SET_SERVICE_DETAILS_PROTO_URL";
export const SET_SERVICE_HERO_IMAGE_URL = "SET_SERVICE_HERO_IMAGE_URL";
export const SET_SERVICE_DEMO_FILES_URL = "SET_SERVICE_DEMO_FILES_URL";
export const SET_SERVICE_DETAILS_FOUND_IN_BLOCKCHAIN = "SET_SERVICE_DETAILS_FOUND_IN_BLOCKCHAIN";

export const setAllAttributes = value => ({ type: SET_ALL_SERVICE_DETAILS_ATTRIBUTES, payload: value });

export const setServiceTouchedFlag = touchFlag => ({
  type: SET_AI_SERVICE_TOUCHED_FLAG,
  payload: touchFlag,
});

export const setServiceId = serviceId => ({
  type: SET_AI_SERVICE_ID,
  payload: serviceId,
});

export const setServiceAvailability = serviceAvailability => ({
  type: SET_AI_SERVICE_ID_AVAILABILITY,
  payload: serviceAvailability,
});

const setServiceName = serviceName => ({
  type: SET_AI_SERVICE_NAME,
  payload: serviceName,
});

export const setServiceUuid = serviceUuid => ({
  type: SET_AI_SERVICE_UUID,
  payload: serviceUuid,
});

export const setAiServiceDetailLeaf = (name, value) => ({
  type: SET_AI_SERVICE_DETAIL_LEAF,
  payload: { name, value },
});

export const setAiServiceGroups = groups => ({ type: SET_AI_SERVICE_GROUPS, payload: groups });

export const setAiServiceMultipleDetails = entries => ({ type: SET_AI_SERVICE_MULTIPLE_DETAILS, payload: entries });

const setAiServiceFreeCallSignerAddress = address => ({
  type: SET_AI_SERVICE_FREE_CALL_SIGNER_ADDRESS,
  payload: address,
});

export const setServiceProviderComment = comment => ({ type: SET_SERVICE_PROVIDER_COMMENT, payload: comment });

const setAiServiceStateState = state => ({ type: SET_AI_SERVICE_STATE_STATE, payload: state });

export const setServiceDetailsProtoUrl = url => ({ type: SET_SERVICE_DETAILS_PROTO_URL, payload: url });

export const setServiceHeroImageUrl = url => ({ type: SET_SERVICE_HERO_IMAGE_URL, payload: url });

export const setServiceDemoFilesUrl = url => ({ type: SET_SERVICE_DEMO_FILES_URL, payload: url });

export const setServiceDetailsFoundInBlockchain = found => ({
  type: SET_SERVICE_DETAILS_FOUND_IN_BLOCKCHAIN,
  payload: found,
});

const createServiceAPI = (orgUuid, serviceName) => async dispatch => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.REGISTRY.name;
  const apiPath = APIPaths.AI_CREATE_SERVICE(orgUuid);
  const body = { display_name: serviceName };
  const apiOptions = initializeAPIOptions(token, body);
  return await API.post(apiName, apiPath, apiOptions);
};

export const createService = (orgUuid, serviceName) => async dispatch => {
  try {
    dispatch(loaderActions.startAppLoader(LoaderContent.CREATE_SERVICE));
    const { data, error } = await dispatch(createServiceAPI(orgUuid, serviceName));
    if (error.code) {
      throw new APIError(error.message);
    }
    dispatch(setServiceName(serviceName));
    dispatch(setServiceUuid(data.service_uuid));
    dispatch(loaderActions.stopAppLoader());
    return data;
  } catch (error) {
    dispatch(loaderActions.stopAppLoader());
    throw error;
  }
};

const validateServiceIdAPI = (orgUuid, serviceId) => async dispatch => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.REGISTRY.name;
  const apiPath = APIPaths.AI_SERVICE_ID_VALIDATE(orgUuid, serviceId);
  const apiOptions = initializeAPIOptions(token);
  return await API.get(apiName, apiPath, apiOptions);
};

export const validateServiceId = (orgUuid, serviceId) => async dispatch => {
  try {
    dispatch(loaderActions.startValidateServiceIdLoader());
    const { data, error } = await dispatch(validateServiceIdAPI(orgUuid, serviceId));
    if (error.code) {
      throw new APIError(error.message);
    }
    dispatch(loaderActions.stopValidateServiceIdLoader());
    return data;
  } catch (error) {
    dispatch(loaderActions.stopValidateServiceIdLoader());
    throw error;
  }
};

const generatePricingpayload = pricing =>
  pricing.map(price => ({
    default: price.default,
    price_model: price.priceModel,
    price_in_cogs: Number(price.priceInCogs),
  }));

export const generateGroupsPayload = (groups, freeCallSignerAddress) =>
  groups
    .map(group => {
      if (!group.id) {
        return undefined;
      }
      return {
        group_name: group.name,
        group_id: group.id,
        free_calls: Number(group.freeCallsAllowed),
        free_call_signer_address: freeCallSignerAddress,
        pricing: generatePricingpayload(group.pricing),
        endpoints: group.endpoints,
        test_endpoints: group.testEndpoints,
        daemon_addresses: group.daemonAddresses,
      };
    })
    .filter(el => el !== undefined);

// TODO remove orgId. MPS has to figure out orgId from orgUuid
const generateSaveServicePayload = serviceDetails => {
  const parseContributors = () => {
    return serviceDetails.contributors
      .split(",")
      .map(el => el.trim())
      .filter((el, index, data) => data.indexOf(el) === index && !isEmpty(el))
      .map(c => ({ name: c, email_id: "" }));
  };

  const payloadForSubmit = {
    service_id: serviceDetails.newId ? serviceDetails.newId : serviceDetails.id,
    display_name: serviceDetails.name,
    short_description: serviceDetails.shortDescription,
    description: serviceDetails.longDescription,
    project_url: serviceDetails.projectURL,
    proto: {},
    assets: {
      proto_files: {
        url: serviceDetails.assets.protoFiles.url,
        ipfs_hash: serviceDetails.assets.protoFiles.ipfsHash,
      },
      hero_image: {
        url: serviceDetails.assets.heroImage.url,
        ipfs_hash: serviceDetails.assets.heroImage.ipfsHash,
      },
      demo_files: {
        url: serviceDetails.assets.demoFiles.url,
        ipfs_hash: serviceDetails.assets.demoFiles.ipfsHash,
      },
    },
    contributors: parseContributors(),
    groups: generateGroupsPayload(serviceDetails.groups, serviceDetails.freeCallSignerAddress),
    tags: serviceDetails.tags,
    price: serviceDetails.price,
    priceModel: serviceDetails.priceModel,
    comments: {
      SERVICE_PROVIDER: serviceDetails.comments.SERVICE_PROVIDER,
      SERVICE_APPROVER: serviceDetails.comments.SERVICE_APPROVER,
    },
    mpe_address: MPENetworks[process.env.REACT_APP_ETH_NETWORK].address,
  };

  return payloadForSubmit;
};

const saveServiceDetailsAPI = (orgUuid, serviceUuid, serviceDetailsPayload) => async dispatch => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.REGISTRY.name;
  const apiPath = APIPaths.SAVE_AI_SERVICE(orgUuid, serviceUuid);
  const body = serviceDetailsPayload;
  const apiOptions = initializeAPIOptions(token, body);
  return await API.put(apiName, apiPath, apiOptions);
};

export const saveServiceDetails = (orgUuid, serviceUuid, serviceDetails) => async dispatch => {
  try {
    if (serviceDetails.serviceState.state === serviceCreationStatus.REJECTED) {
      throw new ValidationError(
        "Hi your service is rejected for any change/approval. Please contact support to proceed"
      );
    }
    dispatch(loaderActions.startAppLoader(LoaderContent.SAVE_SERVICE_DETAILS));
    const serviceDetailsPayload = generateSaveServicePayload(serviceDetails);
    const { error } = await dispatch(saveServiceDetailsAPI(orgUuid, serviceUuid, serviceDetailsPayload));
    if (error.code) {
      dispatch(loaderActions.stopAppLoader());
      throw new APIError(error.message);
    }
    dispatch(setAiServiceStateState(serviceCreationStatus.DRAFT));
    dispatch(loaderActions.stopAppLoader());
  } catch (error) {
    dispatch(loaderActions.stopAppLoader());
    throw error;
  }
};

const patchServiceDetailsAPI = (orgUuid, serviceUuid, serviceDetailsPayload) => async dispatch => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.REGISTRY.name;
  const apiPath = APIPaths.SAVE_AI_SERVICE(orgUuid, serviceUuid);
  const body = serviceDetailsPayload;
  const apiOptions = initializeAPIOptions(token, body);
  return await API.patch(apiName, apiPath, apiOptions);
};

export const patchServiceDetails = (orgUuid, serviceUuid, patchDetailsPayload) => async dispatch => {
  const { error } = await dispatch(patchServiceDetailsAPI(orgUuid, serviceUuid, patchDetailsPayload));
  if (error.code) {
    throw new APIError(error.message);
  }
};

const getServiceDetailsAPI = (orgUuid, serviceUuid) => async dispatch => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.REGISTRY.name;
  const apiPath = APIPaths.FETCH_AI_SERVICE(orgUuid, serviceUuid);
  const apiOptions = initializeAPIOptions(token);
  return await API.get(apiName, apiPath, apiOptions);
};

export const getServiceDetails = (orgUuid, serviceUuid, orgId) => async dispatch => {
  try {
    const { data, error } = await dispatch(getServiceDetailsAPI(orgUuid, serviceUuid));
    const serviceDetailsFromBlockchain = await getServiceDetailsFromBlockchain(orgId, data.service_id);
    if (serviceDetailsFromBlockchain.found) {
      dispatch(setServiceDetailsFoundInBlockchain(true));
    }
    if (error.code) {
      throw new APIError(error.message);
    }
    const service = parseServiceDetails(data, serviceUuid);
    dispatch(setAllAttributes(service));
    return service;
  } catch (error) {
    throw error;
  }
};

const parseServiceDetails = (data, serviceUuid) => {
  const parsePricing = pricing =>
    pricing.map(price => ({
      default: price.default,
      priceModel: price.price_model,
      priceInCogs: price.price_in_cogs,
    }));
  const parseGroups = groups => {
    const retrieveTestEndpointFromGroup = group => {
      if (!isEmpty(group.test_endpoints)) {
        return group.test_endpoints;
      }
      if (!isEmpty(group.endpoints)) {
        const endpoints = Object.keys(group.endpoints);
        return [endpoints[0]];
      }
      return [];
    };

    if (isEmpty(groups)) {
      return defaultGroups;
    }
    return groups.map(group => ({
      name: group.group_name,
      id: group.group_id,
      pricing: parsePricing(group.pricing),
      endpoints: group.endpoints || [],
      daemonAddresses: group.daemon_addresses || [],
      testEndpoints: retrieveTestEndpointFromGroup(group),
      freeCallsAllowed: group.free_calls,
      freeCallSignerAddress: group.free_call_signer_address,
    }));
  };
  // TODO: Certain elements are hard coded need to update after all forms integration
  const service = {
    serviceState: {
      state: data.service_state.state,
    },
    uuid: serviceUuid,
    name: data.display_name,
    id: data.service_id,
    newId: data.service_id,
    shortDescription: data.short_description,
    longDescription: data.description,
    projectURL: data.project_url,
    proto: {
      ipfsHash: "",
      encoding: "",
      type: "",
    },
    assets: {
      heroImage: data.assets.hero_image
        ? {
            url: data.assets.hero_image.url,
            ipfsHash: "",
          }
        : {},
      demoFiles: data.assets.demo_files
        ? {
            url: data.assets.demo_files.url,
            ipfsHash: data.assets.demo_files.ipfs_hash,
          }
        : {},
      protoFiles: data.assets.proto_files
        ? {
            url: data.assets.proto_files.url,
            ipfsHash: data.assets.proto_files.ipfs_hash,
          }
        : {},
    },
    contributors: data.contributors.map(c => c.name).join(","),
    ipfsHash: data.metadata_ipfs_hash,
    groups: parseGroups(data.groups),
    tags: data.tags,
    freecallsAllowed: data.freecalls_allowed,
    freeCallSignerAddress: isEmpty(data.groups) ? "" : data.groups[0].free_call_signer_address,
    comments: {
      SERVICE_APPROVER: data.comments.SERVICE_APPROVER ? data.comments.SERVICE_APPROVER : "",
      SERVICE_PROVIDER: data.comments.SERVICE_PROVIDER ? data.comments.SERVICE_PROVIDER : "",
    },
  };

  return service;
};

const getFreeCallSignerAddressAPI = (orgId, serviceId, groupId, username) => async dispatch => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.SIGNER.name;
  const apiPath = APIPaths.FREE_CALL_SIGNER_ADDRESS;
  const queryParams = { org_id: orgId, service_id: serviceId, group_id: groupId, username };
  const apiOptions = initializeAPIOptions(token, null, queryParams);
  return await API.get(apiName, apiPath, apiOptions);
};

export const getFreeCallSignerAddress = (orgId, serviceId, groupId, username) => async dispatch => {
  try {
    dispatch(loaderActions.startAppLoader(LoaderContent.FREE_CALL_SIGNER_ADDRESS));
    const { data, error } = await dispatch(getFreeCallSignerAddressAPI(orgId, serviceId, groupId, username));
    if (error.code) {
      throw new APIError(error.message);
    }
    dispatch(setAiServiceFreeCallSignerAddress(data.free_call_signer_address));
    dispatch(loaderActions.stopAppLoader());
    return data.free_call_signer_address;
  } catch (error) {
    dispatch(loaderActions.stopAppLoader());
    throw error;
  }
};

const submitServiceDetailsForReviewAPI = (orgUuid, serviceUuid, serviceDetailsPayload) => async dispatch => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.REGISTRY.name;
  const apiPath = APIPaths.SUBMIT_AI_SERVICE(orgUuid, serviceUuid);
  const body = serviceDetailsPayload;
  const apiOptions = initializeAPIOptions(token, body);
  return await API.put(apiName, apiPath, apiOptions);
};

export const submitServiceDetailsForReview = (orgUuid, serviceUuid, serviceDetails) => async dispatch => {
  try {
    if (serviceDetails.serviceState.state === serviceCreationStatus.REJECTED) {
      throw new ValidationError(
        "Hi your service is rejected for any change/approval. Please contact support to proceed"
      );
    }
    dispatch(loaderActions.startAppLoader(LoaderContent.SUBMIT_SERVICE_FOR_REVIEW));
    // TODO remove orgId. MPS has to figure out orgId from orgUuid
    const serviceDetailsPayload = generateSaveServicePayload(serviceDetails);
    const { error } = await dispatch(submitServiceDetailsForReviewAPI(orgUuid, serviceUuid, serviceDetailsPayload));
    if (error.code) {
      throw new APIError(error.message);
    }
    await dispatch(setAiServiceStateState(serviceCreationStatus.APPROVAL_PENDING));
    dispatch(loaderActions.stopAppLoader());
  } catch (error) {
    dispatch(loaderActions.stopAppLoader());
    throw error;
  }
};

const publishToIPFSAPI = (orgUuid, serviceUuid) => async dispatch => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.REGISTRY.name;
  const apiPath = APIPaths.PUBLISH_TO_BLOCKCHAIN(orgUuid, serviceUuid);
  const apiOptions = initializeAPIOptions(token);
  return await API.post(apiName, apiPath, apiOptions);
};

export const publishToIPFS = (orgUuid, serviceUuid) => async dispatch => {
  try {
    dispatch(loaderActions.startAppLoader(LoaderContent.PUBLISH_SERVICE_TO_IPFS));
    const { data, error } = await dispatch(publishToIPFSAPI(orgUuid, serviceUuid));
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

const saveTransactionAPI = (orgUuid, serviceUuid, hash, publisherAddress) => async dispatch => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.REGISTRY.name;
  const apiPath = APIPaths.SAVE_SERVICE_TRANSACTION(orgUuid, serviceUuid);
  const body = { transaction_hash: hash, wallet_address: publisherAddress };
  const apiOptions = initializeAPIOptions(token, body);
  return await API.post(apiName, apiPath, apiOptions);
};

const saveTransaction = (orgUuid, serviceUuid, hash, ownerAddress) => async dispatch => {
  try {
    dispatch(loaderActions.startAppLoader(LoaderContent.SAVE_SERVICE_TRANSACTION));
    const { error } = await dispatch(saveTransactionAPI(orgUuid, serviceUuid, hash, ownerAddress));
    if (error.code) {
      throw new APIError(error.message);
    }
  } catch (error) {
    dispatch(loaderActions.stopAppLoader());
    throw error;
  }
};

const registerInBlockchain = (organization, serviceDetails, serviceMetadataURI, tags, history) => async dispatch => {
  const orgId = organization.id;
  const serviceId = serviceDetails.id;
  const sdk = await initSDK();
  const address = await sdk.account.getAddress();

  dispatch(loaderActions.startAppLoader(LoaderContent.METAMASK_TRANSACTION));
  return new Promise((resolve, reject) => {
    const method = sdk._registryContract
      .createServiceRegistration(orgId, serviceId, serviceMetadataURI, tags)
      .send()
      .on(blockChainEvents.TRANSACTION_HASH, async hash => {
        await dispatch(saveTransaction(organization.uuid, serviceDetails.uuid, hash, address));
        dispatch(loaderActions.startAppLoader(LoaderContent.PUBLISH_SERVICE_TO_BLOCKCHAIN));
      })
      .once(blockChainEvents.CONFIRMATION, async () => {
        await dispatch(aiServiceListActions.setRecentlyPublishedService(serviceDetails.name));
        await history.push(GlobalRoutes.SERVICES.path.replace(":orgUuid", organization.uuid));
        await dispatch(setServiceDetailsFoundInBlockchain(true));
        dispatch(loaderActions.stopAppLoader());
        resolve();
        await method.off();
      })
      .on(blockChainEvents.ERROR, error => {
        dispatch(loaderActions.stopAppLoader());
        reject(error);
      });
  });
};

const uploadFileAPI = (assetType, fileBlob, orgUuid, serviceUuid) => async dispatch => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  const url = `${APIEndpoints.UTILITY.endpoint}${APIPaths.UPLOAD_FILE}?type=${assetType}&org_uuid=${orgUuid}&service_uuid=${serviceUuid}`;
  const res = await fetch(url, { method: "POST", headers: { authorization: token }, body: fileBlob });
  return await res.json();
};

export const uploadFile = (assetType, fileBlob, orgUuid, serviceUuid) => async dispatch => {
  try {
    dispatch(loaderActions.startAppLoader(LoaderContent.UPLOAD_FILE));
    const { data, error } = await dispatch(uploadFileAPI(assetType, fileBlob, orgUuid, serviceUuid));
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

const updateInBlockchain = (organization, serviceDetails, serviceMetadataURI, history) => async dispatch => {
  const sdk = await initSDK();
  const address = await sdk.account.getAddress();
  return new Promise((resolve, reject) => {
    const method = sdk._registryContract
      .updateServiceRegistration(organization.id, serviceDetails.id, serviceMetadataURI)
      .send()
      .on(blockChainEvents.TRANSACTION_HASH, async hash => {
        await dispatch(saveTransaction(organization.uuid, serviceDetails.uuid, hash, address));
        dispatch(loaderActions.startAppLoader(LoaderContent.PUBLISH_SERVICE_TO_BLOCKCHAIN));
      })
      .once(blockChainEvents.CONFIRMATION, async hash => {
        await dispatch(aiServiceListActions.setRecentlyPublishedService(serviceDetails.name));
        await history.push(GlobalRoutes.SERVICES.path.replace(":orgUuid", organization.uuid));
        dispatch(loaderActions.stopAppLoader());
        resolve(hash);
        await method.off();
      })
      .on(blockChainEvents.ERROR, error => {
        dispatch(loaderActions.stopAppLoader());
        reject(new MetamaskError(error.message));
      });
  });
};

const getServiceDetailsFromBlockchain = async (orgId, serviceId) => {
  const registry = new RegistryContract();
  return await registry.getServiceRegistrationById(orgId, serviceId).call();
};

export const publishService = (organization, serviceDetails, serviceMetadataURI, tags, history) => async dispatch => {
  try {
    const serviceDetailsFromBlockchain = await getServiceDetailsFromBlockchain(organization.id, serviceDetails.id);
    if (!serviceDetailsFromBlockchain.found) {
      return await dispatch(registerInBlockchain(organization, serviceDetails, serviceMetadataURI, tags, history));
    }
    return await dispatch(updateInBlockchain(organization, serviceDetails, serviceMetadataURI, history));
  } catch (error) {
    dispatch(loaderActions.stopAppLoader());
    throw error;
  }
};

const getSampleDaemonConfigAPI = (orgUuid, serviceUuid, testDaemon = false) => async dispatch => {
  const daemonConfigNetwork = { TEST: "TEST", MAIN: "MAIN" };
  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.REGISTRY.name;
  const apiPath = APIPaths.SAMPLE_DAEMON_CONFIG(orgUuid, serviceUuid);
  const queryParams = testDaemon
    ? { network: daemonConfigNetwork.TEST }
    : { network_id: process.env.REACT_APP_ETH_NETWORK, network: daemonConfigNetwork.MAIN };
  const apiOptions = initializeAPIOptions(token, undefined, queryParams);
  return await API.get(apiName, apiPath, apiOptions);
};

export const getSampleDaemonConfig = (orgUuid, serviceUuid, testDaemon = false) => async dispatch => {
  try {
    dispatch(loaderActions.startAppLoader(LoaderContent.SAMPLE_DAEMON_CONFIG));
    const { data, error } = await dispatch(getSampleDaemonConfigAPI(orgUuid, serviceUuid, testDaemon));
    if (error.code) {
      dispatch(loaderActions.stopAppLoader());
      throw new APIError(error.message);
    }
    dispatch(loaderActions.stopAppLoader());
    return data;
  } catch (e) {
    dispatch(loaderActions.stopAppLoader());
    throw e;
  }
};
