import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SNETSignupConfirm from "shared/dist/components/SNETSignupConfirm";
import { info, alertMsg } from "./content";
import { signupActions } from "../../Services/Redux/actionCreators/userActions";
import { alertTypes } from "shared/dist/components/AlertBox";
import { GlobalRoutes } from "../../GlobalRouter/Routes";

const SignupConfirm = props => {
  const { history } = props;
  const [signupAlert, setSignupAlert] = useState({});
  const { email } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleResendOTP = async () => {
    try {
      await dispatch(signupActions.resendOTP(email));
      setSignupAlert({ type: alertTypes.SUCCESS, message: alertMsg.resendSuccess });
    } catch (error) {
      setSignupAlert({ type: alertTypes.ERROR, message: alertMsg.resendError });
    }
  };

  const handleSubmit = async otp => {
    try {
      await dispatch(signupActions.signupConfirm(email, otp));
      history.push(GlobalRoutes.LOGIN.path);
    } catch (error) {
      setSignupAlert({ type: alertTypes.ERROR, message: alertMsg.confirmError });
    }
  };

  return (
    <SNETSignupConfirm info={info} onResendOtp={handleResendOTP} onSubmit={handleSubmit} signupAlert={signupAlert} />
  );
};

export default SignupConfirm;
