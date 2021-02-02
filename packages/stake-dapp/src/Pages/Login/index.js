import React, { useState, useEffect, Fragment, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import SNETLogin from "shared/dist/components/SNETLogin";
import { loginErrorMsg } from "./content";
import { GlobalRoutes } from "../../GlobalRouter/Routes";
import { loginActions } from "../../Services/Redux/actionCreators/userActions";
import { tncAgreementVesrion } from "../AcceptServiceAgreement/content";

const Login = ({ history }) => {
  const [error, setError] = useState(undefined);
  const { isLoggedIn, stakingTnC } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const checkUserTnCAcceptance = useCallback(() => {
    if (stakingTnC) {
      if (stakingTnC.ver === tncAgreementVesrion && stakingTnC.accepted === true) {
        return true;
      }
    }

    return false;
  }, [stakingTnC]);

  useEffect(() => {
    if (isLoggedIn) {
      if (checkUserTnCAcceptance()) history.push(GlobalRoutes.LANDING.path);
      else history.push(GlobalRoutes.ACCEPT_AGREEMENT.path);
    }
  }, [isLoggedIn, history, checkUserTnCAcceptance]);

  const handleSubmit = async (email, password) => {
    try {
      await dispatch(loginActions.login(email, password));
      //history.push(GlobalRoutes.ACCEPT_AGREEMENT.path);
    } catch (error) {
      if (error.code === "PasswordResetRequiredException") {
        return history.push(GlobalRoutes.RESET_PASSWORD.path);
      }
      if (error.code === "UserNotFoundException") {
        return setError(error.message);
      }
      if (error.code === "UserNotConfirmedException") {
        history.push(GlobalRoutes.SIGNUP_CONFIRM.path);
      }
      setError(loginErrorMsg);
    }
  };

  return (
    <Fragment>
      <SNETLogin
        title="Welcome Back to AGI Staking"
        forgotPasswordLink={GlobalRoutes.FORGOT_PASSWORD.path}
        loginError={error}
        onSubmit={handleSubmit}
      />
    </Fragment>
  );
};

export default Login;
