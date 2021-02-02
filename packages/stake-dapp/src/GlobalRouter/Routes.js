import { lazy } from "react";
import withLightHeaderAndFooter from "../HOC/withLightHeaderAndFooter";
import withRegistrationHeader from "../HOC/withRegistrationHeader";
import withTncHeader from "../HOC/withTncHeader";
import store from "../Services/Redux/Store";

const Login = lazy(() => import("../Pages/Login"));
const Signup = lazy(() => import("../Pages/Signup"));
const ForgotPassword = lazy(() => import("../Pages/ForgotPassword"));
const ForgotPasswordConfirm = lazy(() => import("../Pages/ForgotPasswordConfirm"));
const HowItWorks = lazy(() => import("../Pages/HowItWorks"));
const SignupConfirm = lazy(() => import("../Pages/SignupConfirm"));
const AcceptAgreement = lazy(() => import("../Pages/AcceptServiceAgreement"));
const UserProfile = lazy(() => import("../Pages/UserProfile"));

const Landing = lazy(() => import("../Pages/Landing"));
const FAQ = lazy(() => import("../Pages/FAQ"));

const SIGNUP_PATH = "/signup";
const LOGIN_PATH = "/login";
const FORGOT_PASSWORD_PATH = "/forgotpassword";
const FORGOT_PASSWORD_CONFIRM_PATH = "/forgotpasswordconfirm";
const RESET_PASSWORD_PATH = "/resetpassword";

const LoginComponent = withRegistrationHeader(Login, "New to SingularityNET?", "Sign up", SIGNUP_PATH);
const SignupComponent = withRegistrationHeader(Signup, "Already have an account?", "Login", LOGIN_PATH);
const SingupConfirmComponent = withRegistrationHeader(SignupConfirm, "Already have an account?", "Login", LOGIN_PATH);
const ForgotPasswordComponent = withRegistrationHeader(
  ForgotPassword,
  "Switch to another account?",
  "Login",
  LOGIN_PATH
);
const ForgotPasswordConfirmComponent = withRegistrationHeader(
  ForgotPasswordConfirm,
  "Switch to another account?",
  "Login",
  LOGIN_PATH
);
const HowItWorksComponent = withLightHeaderAndFooter(HowItWorks);
const AcceptAgreementComponent = withTncHeader(AcceptAgreement, null, "Logout", LOGIN_PATH);

const LandingComponent = withLightHeaderAndFooter(Landing);
const UserProfileComponent = withLightHeaderAndFooter(UserProfile);
const FAQComponent = withLightHeaderAndFooter(FAQ);

export const GlobalRoutes = {
  LOGIN: {
    name: "login",
    path: LOGIN_PATH,
    component: LoginComponent,
  },
  SIGNUP: {
    name: "signup",
    path: SIGNUP_PATH,
    component: SignupComponent,
  },
  SIGNUP_CONFIRM: {
    name: "signup confirm",
    path: "/signupconfirmation",
    component: SingupConfirmComponent,
  },
  FORGOT_PASSWORD: {
    name: "forgot password",
    path: FORGOT_PASSWORD_PATH,
    component: ForgotPasswordComponent,
  },
  FORGOT_PASSWORD_CONFIRM: {
    name: "forgot password",
    path: FORGOT_PASSWORD_CONFIRM_PATH,
    component: ForgotPasswordConfirmComponent,
  },
  RESET_PASSWORD: {
    name: "reset password",
    path: RESET_PASSWORD_PATH,
    component: ForgotPasswordComponent,
  },
  HOW_IT_WORKS: {
    name: "how it works",
    path: "/howitworks",
    component: HowItWorksComponent,
  },
  LANDING: {
    name: "landing",
    path: "/landing",
    component: LandingComponent,
  },
  ACCEPT_AGREEMENT: {
    name: "acceptagreement",
    path: "/acceptagreement",
    component: AcceptAgreementComponent,
  },
  USER_PROFILE: {
    name: "userprofile",
    path: "/userprofile",
    component: UserProfileComponent,
  },
  FAQ: {
    name: "faq",
    path: "/faq",
    component: FAQComponent,
  },
};

export const setupRouteAuthentications = () => {
  const state = store.getState();
  const { isLoggedIn, isEmailVerified } = state.user;

  const redirectPath = getRedirectPath(isLoggedIn, isEmailVerified);
  const isAllowed = isLoggedIn && isEmailVerified;

  return {
    ...GlobalRoutes,
    LANDING: {
      ...GlobalRoutes.LANDING,
      isAllowed,
      redirectTo: redirectPath,
    },
    ACCEPT_AGREEMENT: {
      ...GlobalRoutes.ACCEPT_AGREEMENT,
      isAllowed,
      redirectTo: redirectPath,
    },
    USER_PROFILE: {
      ...GlobalRoutes.USER_PROFILE,
      isAllowed,
      redirectTo: redirectPath,
    },
  };
};

const getRedirectPath = (isLoggedIn, isEmailVerified) => {
  if (!isLoggedIn) {
    return GlobalRoutes.LOGIN.path;
  } else if (!isEmailVerified) {
    return GlobalRoutes.SIGNUP_CONFIRM.path;
  } else {
    return GlobalRoutes.LOGIN.path;
  }
};
