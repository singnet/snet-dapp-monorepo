import { userActions } from "../actionCreators";

const initialState = {
  entity: "",
  isInitialized: false,
  isLoggedIn: false,
  email: undefined,
  nickname: undefined,
  isEmailVerified: false,
  jwt: {
    exp: "",
  },
  inviteeStatus: "",
  inviteCode: "",
  walletList: [],
  userPreferences: {
    preferenceType: "TOKEN_STAKE_NOTIFICATION",
    communicationType: "EMAIL",
    source: "STAKE_DAPP",
    status: 0,
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActions.loginActions.SET_USER_LOGGED_IN: {
      return { ...state, isLoggedIn: action.payload };
    }
    case userActions.loginActions.SET_USER_EMAIL: {
      return { ...state, email: action.payload };
    }
    case userActions.loginActions.SET_USER_NICKNAME: {
      return { ...state, nickname: action.payload };
    }
    case userActions.loginActions.SET_USER_EMAIL_VERIFIED: {
      return { ...state, isEmailVerified: action.payload };
    }
    case userActions.loginActions.SET_APP_INITIALIZED: {
      return { ...state, isInitialized: action.payload };
    }
    case userActions.loginActions.RESET_USER_ON_SIGNOUT: {
      return { ...initialState, isInitialized: true };
    }
    case userActions.loginActions.SET_JWT_EXP: {
      return { ...state, jwt: { ...state.jwt, exp: action.payload } };
    }
    case userActions.userWalletActions.SET_WALLET_LIST:
      return { ...state, walletList: action.payload };
    case userActions.preferenceActions.SET_USER_PREFERENCE: {
      return { ...state, userPreferences: action.payload };
    }
    default:
      return state;
  }
};

export default userReducer;
