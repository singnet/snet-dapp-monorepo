import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { OnboardingRoutes } from "../OnboardingRouter/Routes";
import { verificationStatuses } from "../constant";

const Default = ({ history }) => {
  const { verificationStatus } = useSelector(state => state.user);

  useEffect(() => {
    switch (verificationStatus) {
      case verificationStatuses.NOT_STARTED:
        return history.push(OnboardingRoutes.SINGULARITY_ACCOUNT.path);
      case verificationStatuses.SELECTED_ENTITY:
        return history.push(OnboardingRoutes.ACCEPT_SERVICE_AGREEMENT.path);
      case verificationStatuses.ACCEPTED_AGREEMENT:
        return history.push(OnboardingRoutes.AUTHENTICATE_ID.path);
      default:
        return history.push(OnboardingRoutes.SINGULARITY_ACCOUNT.path);
    }
  }, [history, verificationStatus]);

  return <div />;
};

export default Default;
