import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import VerificationApprovedImg from "shared/dist/assets/images/VerificationApproved.png";
import SNETStatusBanner from "shared/dist/components/SNETStatusBanner";

import { GlobalRoutes } from "../../GlobalRouter/Routes";

const VerificationApproved = () => {
  const { email, ownerEmail, orgUuid } = useSelector(state => ({
    email: state.user.email,
    ownerEmail: state.organization.owner,
    orgUuid: state.organization.uuid,
  }));
  const history = useHistory();

  const handleOrgSetup = () => {
    history.push(GlobalRoutes.ORGANIZATION_SETUP.path.replace(":orgUuid", orgUuid));
  };

  const handleInviteSetup = () => {
    history.push(GlobalRoutes.INVITE_MEMBERS.path.replace(":orgUuid", orgUuid));
  };

  const shouldInviteMembersBeEnabled = () => email === ownerEmail;

  return (
    <SNETStatusBanner
      title="Your organization entity is approved!"
      img={VerificationApprovedImg}
      description="Set up your company details and publish your organization entity to the blockchain.
      After that, you will be ready to create and publish your new services to the AI Marketplace, congratulations!
      You can also invite team members to help set up and manage your AI services more efficiently."
      actions={[
        { children: "organization setup", variant: "contained", color: "primary", onClick: handleOrgSetup },
        {
          children: "Invite Team",
          variant: "outlined",
          color: "primary",
          onClick: handleInviteSetup,
          disabled: !shouldInviteMembersBeEnabled(),
        },
      ]}
    />
  );
};

export default VerificationApproved;
