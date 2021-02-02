import { API } from "aws-amplify";
import { fetchAuthenticatedUser } from "./loginActions";
import { APIEndpoints, APIPaths } from "../../../AWS/APIEndpoints";
import { initializeAPIOptions } from "../../../../Utils/API";
import { APIError } from "shared/dist/utils/API";
import { loaderActions } from "../index";
import { LoaderContent } from "../../../../Utils/Loader";
import { startAppLoader, stopAppLoader } from "../loaderActions";
import { verificationProviderType } from "../../../../Pages/Onboarding/Authenticate/Individual/content";
import { verificationTypes } from "../../../../Utils/verification";

export const SET_INDIVIDUAL_VERIFICATION_STATUS = "SET_INDIVIDUAL_VERIFICATION_STATUS";
export const SET_INDIVIDUAL_VERIFICATION_REJECT_REASON = "SET_INDIVIDUAL_VERIFICATION_REJECT_REASON";

export const setIndividualVerificationStatus = status => ({
  type: SET_INDIVIDUAL_VERIFICATION_STATUS,
  payload: status,
});

export const setIndividualVerificationRejectReason = reason => ({
  type: SET_INDIVIDUAL_VERIFICATION_REJECT_REASON,
  payload: reason,
});

export const initiateVerificationAPI = () => async dispatch => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.VERIFICATION.name;
  const apiPath = APIPaths.USER_VERIFICATION_INITIATE;
  const body = { type: verificationProviderType.INDIVIDUAL };
  const apiOptions = initializeAPIOptions(token, body);
  return await API.post(apiName, apiPath, apiOptions);
};

export const initiateVerification = () => async dispatch => {
  try {
    dispatch(loaderActions.startAppLoader(LoaderContent.USER_VERIFICATION_INITIATE));
    const { error, data } = await dispatch(initiateVerificationAPI());
    if (error.code) {
      throw new APIError(error.message);
    }
    dispatch(loaderActions.stopAppLoader());
    dispatch(setIndividualVerificationStatus(data.status));
    return data;
  } catch (e) {
    dispatch(loaderActions.stopAppLoader());
    throw e;
  }
  // TODO initate the verification process for jumio and redirect to jumio screen
};

const getVerificationStatusAPI = () => async dispatch => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.VERIFICATION.name;
  const apiPath = APIPaths.USER_VERIFICATION_STATUS;
  const queryParams = { type: verificationTypes.INDIVIDUAL };
  const apiOptions = initializeAPIOptions(token, null, queryParams);
  return await API.get(apiName, apiPath, apiOptions);
};

export const getVerificationStatus = (currentStatus = "") => async dispatch => {
  try {
    dispatch(startAppLoader(LoaderContent.USER_VERIFICATION_STATUS));
    const { error, data } = await dispatch(getVerificationStatusAPI());
    if (error.code) {
      throw new APIError(error.message);
    }
    if (currentStatus !== data.status) {
      dispatch(setIndividualVerificationStatus(data.status));
      dispatch(setIndividualVerificationRejectReason(data.reject_reason));
    }
    dispatch(stopAppLoader());
    return data;
  } catch (e) {
    dispatch(stopAppLoader());
    throw e;
  }
};
