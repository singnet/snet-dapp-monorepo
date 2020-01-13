import React, { useEffect } from "react";
import AuthenticateIdRouter from "./Router";
import { AuthenticateIdRoutes } from "./Router/Router";

const Authenticate = ({ history, classes }) => {
  useEffect(() => {
    history.push(AuthenticateIdRoutes.ORGANIZATION.path);
  }, [history]);

  return <AuthenticateIdRouter />;
};

export default Authenticate;
