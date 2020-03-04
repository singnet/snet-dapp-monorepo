import React, { useEffect } from "react";
import AuthenticateRouter from "./AuthenitcateRouter";
import { GlobalRoutes } from "../../../GlobalRouter/Routes";
import { useSelector } from "react-redux";

const Authenticate = ({ history }) => {
  const { isInitialized, isLoggedIn } = useSelector(state => state.user);

  useEffect(() => {
    if (isInitialized && !isLoggedIn) {
      history.push(GlobalRoutes.LOGIN.path);
    }
  }, [history, isInitialized, isLoggedIn]);

  return <AuthenticateRouter />;
};

export default Authenticate;
