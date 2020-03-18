import { API } from "aws-amplify";
import { APIError } from "shared/dist/utils/API";
import { APIEndpoints, APIPaths } from "../../../AWS/APIEndpoints";
import { clientTypes } from "shared/dist/utils/clientTypes";
import { userPreferenceCommunicationTypes } from "../../../../Utils/user";
import { fetchAuthenticatedUser } from "./loginActions";
import { initializeAPIOptions } from "../../../../Utils/API";

export const SET_USER_PREFERENCE = "SET_USER_PREFERENCE";

export const setUserPreferences = userPreferences => ({
  type: SET_USER_PREFERENCE,
  payload: userPreferences,
});

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
    source: clientTypes.STAKE_DAPP,
    status: value,
    opt_out_reason: !value ? "" : undefined,
  }));
  return preferences;
};

export const updateEmailPreferences = emailPreferences => async dispatch => {
  const payload = generateEmailPreferencesPayload(emailPreferences);
  try {
    const { error } = await dispatch(updatePreferencesAPI(payload));
    if (error.code) {
      throw new APIError(error.message);
    }
    dispatch(setUserPreferences(payload[0]));
  } catch (_error) {
    // Do Nothing
  }
};

// *************************************
// Get User Preferences
// *************************************

const getUserPreferencesAPI = () => async dispatch => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.USER.name;
  const apiPath = APIPaths.USER_PREFERENCES;
  const apiOptions = initializeAPIOptions(token);
  return await API.get(apiName, apiPath, apiOptions);
};

export const getUserPreferences = () => async dispatch => {
  try {
    const { data, error } = await dispatch(getUserPreferencesAPI());
    if (error.code) {
      throw new APIError(error.message);
    }
    if (data.length > 0) {
      const stakeNotification = data.filter(p => p.source === clientTypes.STAKE_DAPP);

      if (stakeNotification.length > 0) {
        const userPreferences = {
          preferenceType: stakeNotification[0].preference_type,
          communicationType: stakeNotification[0].communication_type,
          source: stakeNotification[0].source,
          status: stakeNotification[0].status === 1 ? true : false,
        };
        dispatch(setUserPreferences(userPreferences));
      }
    }
  } catch (_error) {
    // Leave it to No Notification In Case of Error
  }
};
