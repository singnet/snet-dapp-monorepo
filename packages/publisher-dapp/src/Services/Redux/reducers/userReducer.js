import { userActions } from "../actionCreators";
import { verificationStatuses } from "../../../Pages/Onboarding/constant";

const initialState = {
  entity: "",
  isInitialized: false,
  isLoggedIn: false,
  email: undefined,
  nickname: undefined,
  isEmailVerified: false,
  verificationStatus: verificationStatuses.NOT_STARTED,
  jwt: {
    exp: "",
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
    case userActions.onboardingActions.SET_USER_ENTITY: {
      return { ...state, entity: action.payload };
    }
    case userActions.loginActions.RESET_USER_ON_SIGNOUT: {
      return { ...initialState, isInitialized: true };
    }
    case userActions.loginActions.SET_JWT_EXP: {
      return { ...state, jwt: { ...state.jwt, exp: action.payload } };
    }
    default:
      return state;
  }
};

export default userReducer;
