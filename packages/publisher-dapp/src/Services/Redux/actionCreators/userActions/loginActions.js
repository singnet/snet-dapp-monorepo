import { Auth } from "aws-amplify";
import { organizationActions, loaderActions } from "../";
import { LoaderContent } from "../../../../Utils/Loader";
import { getCurrentUTCEpoch } from "shared/dist/utils/Date";

export const SET_USER_LOGGED_IN = "SET_USER_LOGGED_IN";
export const SET_USER_EMAIL = "SET_USER_EMAIL";
export const SET_USER_NICKNAME = "SET_USER_NICKNAME";
export const SET_USER_EMAIL_VERIFIED = "SET_USER_EMAIL_VERIFIED";
export const SET_APP_INITIALIZED = "SET_APP_INITIALIZED";
export const RESET_USER_ON_SIGNOUT = "RESET_USER_ON_SIGNOUT";
export const SET_JWT_EXP = "SET_JWT_EXP";

const setUserLoggedIn = isLoggedin => ({ type: SET_USER_LOGGED_IN, payload: isLoggedin });

export const setUserEmail = email => ({ type: SET_USER_EMAIL, payload: email });

export const setUserNickname = nickname => ({ type: SET_USER_NICKNAME, payload: nickname });

const setUserEmailVerified = isEmailVerified => ({ type: SET_USER_EMAIL_VERIFIED, payload: isEmailVerified });

const setAppInitialized = isInitialized => ({ type: SET_APP_INITIALIZED, payload: isInitialized });

const resetUserOnSignout = () => ({ type: RESET_USER_ON_SIGNOUT });

const setJWTExp = exp => ({ type: SET_JWT_EXP, payload: exp });

export const fetchAuthenticatedUser = () => async (dispatch, getState) => {
  let bypassCache = false;

  const { exp } = getState().user.jwt;
  const currentEpochInUTC = getCurrentUTCEpoch();
  if (!exp || currentEpochInUTC >= Number(exp)) {
    bypassCache = true;
  }

  const currentUser = await Auth.currentAuthenticatedUser({ bypassCache });
  const newExp = currentUser.signInUserSession.idToken.payload.exp;
  dispatch(setJWTExp(newExp));
  return {
    nickname: currentUser.attributes.nickname,
    email: currentUser.attributes.email,
    email_verified: currentUser.attributes.email_verified,
    token: currentUser.signInUserSession.idToken.jwtToken,
  };
};

export const initializeApplication = async dispatch => {
  try {
    const { nickname, email, email_verified } = await dispatch(fetchAuthenticatedUser());
    await dispatch(organizationActions.getStatus);
    dispatch(setUserLoggedIn(true));
    dispatch(setUserEmail(email));
    dispatch(setUserNickname(nickname));
    dispatch(setUserEmailVerified(email_verified));
    dispatch(setAppInitialized(true));
  } catch (error) {
    dispatch(setAppInitialized(true));
  }
};

const loginSucess = loginResponse => async dispatch => {
  const { email, nickname, email_verified: isEmailVerified } = loginResponse.attributes;
  return await Promise.all([
    dispatch(setUserLoggedIn(true)),
    dispatch(setUserEmail(email)),
    dispatch(setUserNickname(nickname)),
    dispatch(setUserEmailVerified(isEmailVerified)),
    dispatch(loaderActions.stopAppLoader()),
  ]);
};

const handleUserNotConfirmed = email => async dispatch => {
  return await Promise.all([dispatch(setUserLoggedIn(true)), dispatch(setUserEmail(email))]);
};

export const login = (email, password) => async dispatch => {
  try {
    dispatch(loaderActions.startAppLoader(LoaderContent.LOGIN));
    const loginResponse = await Auth.signIn(email, password);
    return await dispatch(loginSucess(loginResponse));
  } catch (error) {
    dispatch(loaderActions.stopAppLoader());
    if (error.code === "UserNotConfirmedException") {
      await dispatch(handleUserNotConfirmed(email));
    }
    throw error;
  }
};

export const signout = async dispatch => {
  await Auth.signOut();
  dispatch(resetUserOnSignout());
};
