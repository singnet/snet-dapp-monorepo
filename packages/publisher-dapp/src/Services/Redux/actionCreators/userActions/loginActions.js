import { Auth } from "aws-amplify";
import { organizationActions, loaderActions } from "../";
import { LoaderContent } from "../../../../Utils/Loader";
import { getCurrentUTCEpoch } from "shared/dist/utils/Date";

export const SET_USER_LOGGED_IN = "SET_USER_LOGGED_IN";
export const SET_USER_EMAIL = "SET_USER_EMAIL";
export const SET_USER_NICKNAME = "SET_USER_NICKNAME";
export const SET_APP_INITIALIZED = "SET_APP_INITIALIZED";
export const SIGNOUT = "SIGNOUT";
export const SET_JWT_EXP = "SET_JWT_EXP";
export const SET_USER_ATTRIBUTES = "SET_USER_ATTRIBUTES";
export const SET_IS_MM_CONNECTED = "SET_IS_MM_CONNECTED";

const setUserLoggedIn = isLoggedin => ({ type: SET_USER_LOGGED_IN, payload: isLoggedin });

export const setUserEmail = email => ({ type: SET_USER_EMAIL, payload: email });

export const setUserNickname = nickname => ({ type: SET_USER_NICKNAME, payload: nickname });

const setAppInitialized = isInitialized => ({ type: SET_APP_INITIALIZED, payload: isInitialized });

const resetReduxOnSignout = () => ({ type: SIGNOUT });

const setJWTExp = exp => ({ type: SET_JWT_EXP, payload: exp });

export const setIsMMConnected = isConnected => ({ type: SET_IS_MM_CONNECTED, payload: isConnected });

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

  const publisherTnC = currentUser.attributes["custom:publisher_tnc"]
    ? JSON.parse(currentUser.attributes["custom:publisher_tnc"])
    : {};

  return {
    nickname: currentUser.attributes.nickname,
    email: currentUser.attributes.email,
    email_verified: currentUser.attributes.email_verified,
    token: currentUser.signInUserSession.idToken.jwtToken,
    publisherTnC,
  };
};

export const initializeApplication = async dispatch => {
  try {
    const { nickname, email, email_verified, publisherTnC } = await dispatch(fetchAuthenticatedUser());
    await dispatch(organizationActions.initializeOrg(email));

    const userAttributes = {
      isLoggedIn: true,
      email,
      nickname,
      isEmailVerified: email_verified,
      isInitialized: true,
      publisherTnC,
    };

    dispatch(setUserAttributes(userAttributes));
  } catch (error) {
    dispatch(setAppInitialized(true));
  }
};

const loginSucess = loginResponse => async dispatch => {
  const publisherTnC = loginResponse.attributes["custom:publisher_tnc"]
    ? JSON.parse(loginResponse.attributes["custom:publisher_tnc"])
    : {};
  const userAttributes = {
    isLoggedIn: true,
    email: loginResponse.attributes.email,
    nickname: loginResponse.attributes.nickname,
    isEmailVerified: loginResponse.attributes.email_verified,
    publisherTnC: { ...publisherTnC },
  };

  return await Promise.all([dispatch(setUserAttributes(userAttributes)), dispatch(loaderActions.stopAppLoader())]);
};

const handleUserNotConfirmed = email => async dispatch => {
  return await Promise.all([dispatch(setUserLoggedIn(true)), dispatch(setUserEmail(email))]);
};

export const setUserAttributes = userAttributes => dispatch => {
  dispatch({ type: SET_USER_ATTRIBUTES, payload: userAttributes });
};

export const updateUserTnCAttribute = tncAgreementVesrion => async dispatch => {
  const user = await Auth.currentAuthenticatedUser();
  const tncValue = { ver: tncAgreementVesrion, accepted: true };
  try {
    await Auth.updateUserAttributes(user, { "custom:publisher_tnc": JSON.stringify(tncValue) });
    await dispatch(setUserAttributes({ publisherTnC: tncValue }));
  } catch (error) {
    throw error;
  }
};

export const login = (email, password) => async dispatch => {
  try {
    dispatch(loaderActions.startAppLoader(LoaderContent.LOGIN));
    const loginResponse = await Auth.signIn(email, password);
    await dispatch(organizationActions.initializeOrg(email));
    return await dispatch(loginSucess(loginResponse));
  } catch (error) {
    dispatch(loaderActions.stopAppLoader());
    if (error.code === "PasswordResetRequiredException") {
      dispatch(setUserEmail(email));
      throw error;
    }
    if (error.code === "UserNotConfirmedException") {
      await dispatch(handleUserNotConfirmed(email));
      throw error;
    }
    throw error;
  }
};

export const signout = async dispatch => {
  await dispatch(loaderActions.startAppLoader(LoaderContent.SIGN_OUT));
  await Auth.signOut();
  await dispatch(resetReduxOnSignout());
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
