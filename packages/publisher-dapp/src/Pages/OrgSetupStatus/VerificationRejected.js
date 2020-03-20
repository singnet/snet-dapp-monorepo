import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { GlobalRoutes } from "../../GlobalRouter/Routes";
import { AuthenticateRoutes } from "../Onboarding/Authenticate/AuthenitcateRouter/Routes";
import { organizationSetupStatuses } from "../../Utils/organizationSetup";
import VerificationFailed from "shared/dist/assets/images/VerificationFailed.png";
import SNETStatusBanner, { statusTitleType } from "shared/dist/components/SNETStatusBanner";

const VerificationRejected = () => {
  const status = useSelector(state => state.organization.state.state);
  const history = useHistory();
  const { orgUuid } = useParams();

  const handleEditOrgDetails = () => {
    if (status === organizationSetupStatuses.ONBOARDING_REJECTED) {
      return history.push(AuthenticateRoutes.ORGANIZATION.path);
    }
    history.push(GlobalRoutes.ORGANIZATION_SETUP.path.replace(":orgUuid", orgUuid));
  };

  return (
    <SNETStatusBanner
      title="Your organization was rejected."
      img={VerificationFailed}
      description="Unfortunatetly your organization is rejected during the internal verification.
       Please check your inbox for mail from singularitynet team with detailed explanation for your rejection.
       You can reinitiate the organization creation once all criteria is met."
      actions={[
        {
          children: "access jumio verification",
          variant: "contained",
          color: "primary",
          onClick: handleEditOrgDetails,
        },
        { children: "contact support", variant: "outlined", color: "primary", disabled: true },
      ]}
      type={statusTitleType.REJECTED}
    />
  );
};

export default VerificationRejected;
