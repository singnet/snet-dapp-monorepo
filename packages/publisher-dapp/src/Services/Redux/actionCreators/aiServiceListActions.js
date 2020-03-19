import { API } from "aws-amplify";
import isEmpty from "lodash/isEmpty";

import { fetchAuthenticatedUser } from "./userActions/loginActions";
import { APIEndpoints, APIPaths } from "../../AWS/APIEndpoints";
import { initializeAPIOptions } from "../../../Utils/API";
import { APIError } from "shared/dist/utils/API";
import { loaderActions } from "./";
import { defaultPagination } from "../reducers/aiServiceListReducer";

export const SET_AI_SERVICE_LIST = "SET_AI_SERVICE_LIST";
export const SET_AI_SERVICE_LIST_PAGINATION = "SET_AI_SERVICE_LIST_PAGINATION";
export const SET_AI_SERVICE_LIST_TOTAL_COUNT = "SET_AI_SERVICE_LIST_TOTAL_COUNT";

const setAiServiceList = aiServiceList => ({
  type: SET_AI_SERVICE_LIST,
  payload: aiServiceList,
});

export const setAiServiceListPagination = pagination => ({
  type: SET_AI_SERVICE_LIST_PAGINATION,
  payload: pagination,
});

export const setAiServiceListTotalCount = totalCount => ({
  type: SET_AI_SERVICE_LIST_TOTAL_COUNT,
  payload: totalCount,
});

const getAiServiceListAPI = (orgUuid, pagination) => async dispatch => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.REGISTRY.name;
  const apiPath = APIPaths.AI_SERVICE_LIST(orgUuid);
  const apiOptions = initializeAPIOptions(token, pagination);
  return await API.post(apiName, apiPath, apiOptions);
};

const parseGroups = groups => {
  const parsePricing = pricing =>
    pricing.map(price => ({ default: price.default, priceModel: price.price_model, priceInCogs: price.price_in_cogs }));

  const parseEndpoints = endpoints =>
    endpoints.map(endpointValue => ({ endpoint: endpointValue.endpoint, isAvailable: endpointValue.is_available }));

  return groups.map(group => ({
    id: group.group_id,
    pricing: parsePricing(group.pricing),
    endpoints: parseEndpoints(group.endpoints),
    freeCallsAllowed: group.freecalls_allowed,
  }));
};

const parseAiServiceData = service => ({
  orgUuid: service.org_uuid,
  uuid: service.service_uuid,
  id: service.service_id,
  state: service.service_state,
  displayName: service.display_name,
  shortDescription: service.short_description,
  description: service.description,
  projectUrl: service.project_url,
  assets: {
    heroImage: isEmpty(service.assets.hero_image)
      ? {}
      : { url: service.assets.hero_image.url, ipfsHash: service.assets.hero_image.ipfs_hash },
    protoFiles: isEmpty(service.assets.proto)
      ? {}
      : { url: service.assets.proto.url, ipfsHash: service.assets.proto.ipfs_hash },
    demoFiles: isEmpty(service.assets.demo_files)
      ? {}
      : { url: service.assets.demo_files.url, ipfsHash: service.assets.demo_files.ipfs_hash },
  },
  rating: isEmpty(service.rating)
    ? {}
    : { rating: service.rating.rating, totalUsersRated: service.rating.total_users_rated },
  ranking: service.ranking,
  contributors: isEmpty(service.contributors) ? [] : service.contributors.map(c => c.name).join(","),
  groups: isEmpty(service.groups) ? [] : parseGroups(service.groups),
  tags: service.tags,
  comments: isEmpty(service.comments)
    ? { serviceProvider: [] }
    : { serviceProvider: service.comments.service_provider },
});

const parseAiServiceListResponse = response => response.map(parseAiServiceData);

export const getAiServiceList = (orgUuid, pagination = defaultPagination) => async dispatch => {
  try {
    dispatch(loaderActions.startAiServiceListLoader());
    const { data, error } = await dispatch(getAiServiceListAPI(orgUuid, pagination));
    if (error.code) {
      throw new APIError(error.message);
    }
    const { result, total_count: totalCount } = data;
    dispatch(setAiServiceListTotalCount(totalCount));
    const aiServiceList = parseAiServiceListResponse(result);
    dispatch(setAiServiceList(aiServiceList));
    dispatch(loaderActions.stopAiServiceListLoader());
  } catch (error) {
    dispatch(loaderActions.stopAiServiceListLoader());
    throw error;
  }
};
