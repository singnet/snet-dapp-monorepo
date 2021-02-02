import { API } from "aws-amplify";

import { fetchAuthenticatedUser } from "./loginActions";
import { APIEndpoints, APIPaths } from "../../../AWS/APIEndpoints";
import { initializeAPIOptions } from "../../../../Utils/API";
import { verificationTypes } from "../../../../Utils/verification";
import { LoaderContent } from "../../../../Utils/Loader";
import { loaderActions } from "../index";
import { orgVerificationStatus } from "../../../../Pages/Onboarding/constant";
import { APIError } from "shared/dist/utils/API";

export const SET_ORG_REJECT_REASON = "SET_ORG_REJECT_REASON";

const setOrgRejectReason = reason => ({ type: SET_ORG_REJECT_REASON, payload: reason });

const getVerificationStatusAPI = orgUuid => async dispatch => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.VERIFICATION.name;
  const apiPath = APIPaths.USER_VERIFICATION_STATUS;
  const queryParams = { type: verificationTypes.DUNS, entity_id: orgUuid };
  const apiOptions = initializeAPIOptions(token, null, queryParams);
  return await API.get(apiName, apiPath, apiOptions);
};

export const getVerificationStatus = orgUuid => async dispatch => {
  try {
    dispatch(loaderActions.startAppLoader(LoaderContent.USER_VERIFICATION_STATUS));

    const { data, error } = await dispatch(getVerificationStatusAPI(orgUuid));
    if (error.code) {
      throw new APIError(error.message);
    }
    if (data.status === orgVerificationStatus.REJECTED || data.status === orgVerificationStatus.CHANGE_REQUESTED) {
      dispatch(setOrgRejectReason(data.reject_reason));
    }
    dispatch(loaderActions.stopAppLoader());
  } catch (e) {
    dispatch(loaderActions.stopAppLoader());
    throw e;
  }
};
