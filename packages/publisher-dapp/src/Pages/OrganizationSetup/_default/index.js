import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { OrganizationSetupRoutes } from "../OrganizationSetupRouter/Routes";

const Default = ({ history }) => {
  const { verificationStatus } = useSelector(state => state.user);

  useEffect(() => {
    return history.push(OrganizationSetupRoutes.ORGANIZATION_PROFILE.path);
  }, [history, verificationStatus]);

  return <div />;
};

export default Default;
