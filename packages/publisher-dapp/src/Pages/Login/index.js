import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import SNETLogin from "shared/dist/components/SNETLogin";
import { loginErrorMsg } from "./content";
import { GlobalRoutes } from "../../GlobalRouter/Routes";
import { loginActions } from "../../Services/Redux/actionCreators/userActions";

const Login = ({ history }) => {
  const [error, setError] = useState(undefined);
  const { isLoggedIn } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      history.push(GlobalRoutes.ONBOARDING.path);
    }
  }, [isLoggedIn, history]);

  const handleSubmit = async (email, password) => {
    try {
      await dispatch(loginActions.login(email, password));
      history.push(GlobalRoutes.ONBOARDING.path);
    } catch (error) {
      if (error.code === "UserNotFoundException") {
        return setError(error.message);
      }
      setError(loginErrorMsg);
    }
  };

  return (
    <Fragment>
      <SNETLogin
        title="Welcome Back"
        //   TODO : create a page for forgotPassword and pass the link here
        //   forgotPasswordLink={}
        loginError={error}
        onSubmit={handleSubmit}
      />
    </Fragment>
  );
};

export default Login;
