import { userActions } from "../actionCreators";
import { individualVerificationStatusList } from "../../../Pages/Onboarding/constant";

const initialState = {
  entity: "",
  isInitialized: false,
  isLoggedIn: false,
  publisherTnC: { ver: "", accepted: "" },
  email: "",
  nickname: undefined,
  isEmailVerified: false,
  individualVerificationStatus: individualVerificationStatusList.NOT_STARTED,
  individualVerificationRejectReason: "",
  jwt: {
    exp: "",
  },
  inviteeStatus: "",
  inviteCode: "",
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
    case userActions.loginActions.SET_APP_INITIALIZED: {
      return { ...state, isInitialized: action.payload };
    }
    case userActions.onboardingActions.SET_USER_ENTITY: {
      return { ...state, entity: action.payload };
    }
    case userActions.loginActions.SIGNOUT: {
      return { ...initialState, isInitialized: true };
    }
    case userActions.loginActions.SET_JWT_EXP: {
      return { ...state, jwt: { ...state.jwt, exp: action.payload } };
    }
    case userActions.onboardingActions.SET_USER_INVITEE_STATUS: {
      return { ...state, inviteeStatus: action.payload };
    }
    case userActions.onboardingActions.SET_USER_INVITE_CODE:
      return { ...state, inviteCode: action.payload };
    case userActions.individualVerificationActions.SET_INDIVIDUAL_VERIFICATION_STATUS:
      return { ...state, individualVerificationStatus: action.payload };
    case userActions.individualVerificationActions.SET_INDIVIDUAL_VERIFICATION_REJECT_REASON:
      return { ...state, individualVerificationRejectReason: action.payload };
    case userActions.loginActions.SET_USER_ATTRIBUTES: {
      return { ...state, ...action.payload };
    }
    case userActions.loginActions.SET_IS_MM_CONNECTED: {
      return { ...state, isMMConnected: action.payload };
    }
    default:
      return state;
  }
};

export default userReducer;
