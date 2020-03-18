import React from "react";
import VerificationFailed from "shared/dist/assets/images/VerificationFailed.png";
import SNETStatusBanner, { statusTitleType } from "shared/dist/components/SNETStatusBanner";
import { useHistory, useParams } from "react-router-dom";
import { GlobalRoutes } from "../../GlobalRouter/Routes";
import { AuthenticateRoutes } from "../Onboarding/Authenticate/AuthenitcateRouter/Routes";
import { useSelector } from "react-redux";
import { organizationSetupStatuses } from "../../Utils/organizationSetup";

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
      title="Your Jumio ID verification was unsuccesful."
      img={VerificationFailed}
      description="Please check and re-prepare the required documents, then retry the Jumio ID verification process. If you believe there was an error by Jumio or by SingularityNET, please contact our support staff who will assist you."
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
