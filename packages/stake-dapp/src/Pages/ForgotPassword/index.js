import React, { Fragment, useState } from "react";

import { GlobalRoutes } from "../../GlobalRouter/Routes";

import SNETForgotPassword from "shared/dist/components/SNETForgotPassword";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../Services/Redux/actionCreators/userActions";

const ForgotPassword = ({ history, location }) => {
  const [error, setError] = useState(undefined);
  const email = useSelector(state => state.user.email);
  const dispatch = useDispatch();
  const handleSubmit = async localEmail => {
    try {
      setError(undefined);
      await dispatch(loginActions.forgotPassword(localEmail));
      history.push(GlobalRoutes.FORGOT_PASSWORD_CONFIRM.path);
    } catch (e) {
      setError("Something went wrong. Please try later");
    }
  };

  const title =
    location.pathname === GlobalRoutes.RESET_PASSWORD.path ? "Reset your password to login" : "Forgot your Password?";

  const description =
    location.pathname === GlobalRoutes.RESET_PASSWORD.path
      ? "To ensure your account's safety we need you to reset your password. We will email instructions to your registered email."
      : "We'll email you instructions on how to reset it.";

  return (
    <Fragment>
      <SNETForgotPassword
        title={title}
        description={description}
        forgotPasswordError={error}
        onSubmit={handleSubmit}
        email={email}
      />
    </Fragment>
  );
};

export default ForgotPassword;
