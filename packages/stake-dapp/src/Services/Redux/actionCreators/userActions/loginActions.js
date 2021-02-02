import { Auth } from "aws-amplify";
import { loaderActions } from "../";
import { userWalletActions } from "./";
import { LoaderContent } from "../../../../Utils/Loader";
import { getCurrentUTCEpoch } from "shared/dist/utils/Date";

export const SET_USER_LOGGED_IN = "SET_USER_LOGGED_IN";
export const SET_USER_EMAIL = "SET_USER_EMAIL";
export const SET_USER_NICKNAME = "SET_USER_NICKNAME";
//export const SET_USER_EMAIL_VERIFIED = "SET_USER_EMAIL_VERIFIED";
export const SET_APP_INITIALIZED = "SET_APP_INITIALIZED";
export const RESET_USER_ON_SIGNOUT = "RESET_USER_ON_SIGNOUT";
export const SET_JWT_EXP = "SET_JWT_EXP";

const setUserLoggedIn = isLoggedin => ({ type: SET_USER_LOGGED_IN, payload: isLoggedin });

export const setUserEmail = email => ({ type: SET_USER_EMAIL, payload: email });

export const setUserNickname = nickname => ({ type: SET_USER_NICKNAME, payload: nickname });

//const setUserEmailVerified = isEmailVerified => ({ type: SET_USER_EMAIL_VERIFIED, payload: isEmailVerified });

const setAppInitialized = isInitialized => ({ type: SET_APP_INITIALIZED, payload: isInitialized });

const resetUserOnSignout = () => ({ type: RESET_USER_ON_SIGNOUT });

const setJWTExp = exp => ({ type: SET_JWT_EXP, payload: exp });

export const SET_USER_ATTRIBUTES = "SET_USER_ATTRIBUTES";

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

  const _stakingTnC = currentUser.attributes["custom:staking_tnc"]
    ? JSON.parse(currentUser.attributes["custom:staking_tnc"])
    : undefined;

  return {
    nickname: currentUser.attributes.nickname,
    email: currentUser.attributes.email,
    isEmailVerified: currentUser.attributes.email_verified,
    token: currentUser.signInUserSession.idToken.jwtToken,
    stakingTnC: { ..._stakingTnC },
  };
};

const getCurrentAuthenticatedUser = () => async (dispatch, getState) => {
  let bypassCache = false;

  const { exp } = getState().user.jwt;
  const currentEpochInUTC = getCurrentUTCEpoch();
  if (!exp || currentEpochInUTC >= Number(exp)) {
    bypassCache = true;
  }

  const currentUser = await Auth.currentAuthenticatedUser({ bypassCache });
  const newExp = currentUser.signInUserSession.idToken.payload.exp;
  dispatch(setJWTExp(newExp));
  return currentUser;
};

export const initializeApplication = async dispatch => {
  try {
    const userAttributes = await dispatch(fetchAuthenticatedUser());
    dispatch(setUserAttributes({ ...userAttributes, isLoggedIn: true }));
    await dispatch(userWalletActions.fetchWallet());
    dispatch(setAppInitialized(true));
  } catch (error) {
    dispatch(setAppInitialized(true));
  }
};

const loginSucess = loginResponse => async dispatch => {
  const _stakingTnC = loginResponse.attributes["custom:staking_tnc"]
    ? JSON.parse(loginResponse.attributes["custom:staking_tnc"])
    : undefined;
  const userAttributes = {
    isLoggedIn: true,
    email: loginResponse.attributes.email,
    nickname: loginResponse.attributes.nickname,
    isEmailVerified: loginResponse.attributes.email_verified,
    stakingTnC: { ..._stakingTnC },
  };

  return await Promise.all([dispatch(setUserAttributes(userAttributes)), dispatch(loaderActions.stopAppLoader())]);
};

const handleUserNotConfirmed = email => async dispatch => {
  return await Promise.all([dispatch(setUserLoggedIn(true)), dispatch(setUserEmail(email))]);
};

export const login = (email, password) => async dispatch => {
  try {
    dispatch(loaderActions.startAppLoader(LoaderContent.LOGIN));
    const loginResponse = await Auth.signIn(email, password);
    await dispatch(userWalletActions.fetchWallet());
    return await dispatch(loginSucess(loginResponse));
  } catch (error) {
    dispatch(loaderActions.stopAppLoader());
    if (error.code === "PasswordResetRequiredException") {
      dispatch(setUserEmail(email));
      throw error;
    }
    if (error.code === "UserNotConfirmedException") {
      await dispatch(handleUserNotConfirmed(email));
    }
    throw error;
  }
};

export const signout = async dispatch => {
  dispatch(loaderActions.startAppLoader(LoaderContent.SIGN_OUT));
  await Auth.signOut();
  await dispatch(resetUserOnSignout());
  dispatch(loaderActions.stopAppLoader());
};

export const forgotPassword = email => async dispatch => {
  try {
    dispatch(loaderActions.startAppLoader(LoaderContent.FORGOT_PASSWORD));
    await Auth.forgotPassword(email);
    dispatch(setUserLoggedIn(false));
    dispatch(loaderActions.stopAppLoader());
  } catch (e) {
    dispatch(loaderActions.stopAppLoader());
    throw e;
  }
};

export const forgotPasswordSubmit = (email, code, password) => async dispatch => {
  try {
    dispatch(loaderActions.startAppLoader(LoaderContent.FORGOT_PASSWORD_SUBMIT));
    await Auth.forgotPasswordSubmit(email, code, password);
    dispatch(loaderActions.stopAppLoader());
  } catch (e) {
    dispatch(loaderActions.stopAppLoader());
    throw e;
  }
};

export const setUserAttributes = userAttributes => dispatch => {
  dispatch({ type: SET_USER_ATTRIBUTES, payload: userAttributes });
};

export const updateUserTnCAttribute = tncAgreementVesrion => async dispatch => {
  const user = await dispatch(getCurrentAuthenticatedUser());
  const tncValue = { ver: tncAgreementVesrion, accepted: true };
  await Auth.updateUserAttributes(user, { "custom:staking_tnc": JSON.stringify(tncValue) })
    .then(_res => {
      dispatch(
        setUserAttributes({
          stakingTnC: tncValue,
        })
      );
    })
    .catch(err => {
      throw err;
    });
};
