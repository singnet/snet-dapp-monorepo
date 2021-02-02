import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactGA from "react-ga";

import SNETLogin from "shared/dist/components/SNETLogin";
import { GlobalRoutes } from "../../GlobalRouter/Routes";
import { loginActions } from "../../Services/Redux/actionCreators/userActions";
import { GAEventsContent } from "../../Utils/GAEvents";

const Login = ({ history }) => {
  const [error, setError] = useState(undefined);
  const { isLoggedIn, publisherTnC } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const checkUserTnCAcceptance = useCallback(() => {
    return publisherTnC.ver && publisherTnC.accepted;
  }, [publisherTnC]);

  useEffect(() => {
    if (isLoggedIn) {
      if (checkUserTnCAcceptance()) {
        history.push(GlobalRoutes.ONBOARDING.path);
      } else {
        history.push(GlobalRoutes.OVERVIEW.path);
      }
    }
  }, [isLoggedIn, history, checkUserTnCAcceptance]);

  const handleUserNotConfirmed = () => {
    history.push(GlobalRoutes.SIGNUP_CONFIRM.path);
  };

  const handleSubmit = async (email, password) => {
    ReactGA.event(GAEventsContent.LOGIN);
    try {
      await dispatch(loginActions.login(email, password));
    } catch (error) {
      if (error.code === "PasswordResetRequiredException") {
        return history.push(GlobalRoutes.RESET_PASSWORD.path);
      }
      if (error.code === "UserNotFoundException") {
        return setError(error.message);
      }
      if (error.code === "UserNotConfirmedException") {
        return handleUserNotConfirmed();
      }
      setError(error.message);
    }
  };

  return (
    <Fragment>
      <SNETLogin
        title="Welcome Back"
        forgotPasswordLink={GlobalRoutes.FORGOT_PASSWORD.path}
        loginError={error}
        onSubmit={handleSubmit}
      />
    </Fragment>
  );
};

export default Login;
