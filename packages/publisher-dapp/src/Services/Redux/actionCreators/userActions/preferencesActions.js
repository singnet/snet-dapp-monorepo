import { API } from "aws-amplify";

import { APIEndpoints, APIPaths } from "../../../AWS/APIEndpoints";
import { clientTypes } from "shared/dist/utils/clientTypes";
import { userPreferenceCommunicationTypes } from "../../../../Utils/user";
import { fetchAuthenticatedUser } from "./loginActions";
import { initializeAPIOptions } from "../../../../Utils/API";

const updatePreferencesAPI = payload => async dispatch => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.USER.name;
  const apiPath = APIPaths.USER_PREFERENCES;
  const apiOptions = initializeAPIOptions(token, payload);
  return await API.post(apiName, apiPath, apiOptions);
};

const generateEmailPreferencesPayload = emailPreferences => {
  const preferences = Object.entries(emailPreferences).map(([key, value]) => ({
    preference_type: key,
    communication_type: userPreferenceCommunicationTypes.EMAIL,
    source: clientTypes.PUBLISHER_DAPP,
    status: value,
    opt_out_reason: !value ? "" : undefined,
  }));
  return preferences;
};

export const updateEmailPreferences = emailPreferences => dispatch => {
  const payload = generateEmailPreferencesPayload(emailPreferences);
  dispatch(updatePreferencesAPI(payload));
};
