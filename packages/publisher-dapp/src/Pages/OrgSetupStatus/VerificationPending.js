import React from "react";
import StatusBanner from "./StatusBanner";
import { useHistory } from "react-router-dom";
import { GlobalRoutes } from "../../GlobalRouter/Routes";

import orgSetupPendingImg from "shared/dist/assets/images/orgSetupPending.png";

const VerificationPending = () => {
  const history = useHistory();

  const handleOrgSetup = () => {
    history.push(GlobalRoutes.ORGANIZATION_SETUP.path);
  };

  return (
    <StatusBanner
      title="Your Organization entity review is in progress…"
      img={orgSetupPendingImg}
      description="This review may take a day or two.  In the meantime you can add team memebers to your organization to help you setup and manage your AI services more efficiently.   You can also view our guides and tutorials."
      actions={[
        { children: "Invite Team members", variant: "outlined", color: "primary", onClick: handleOrgSetup },
        { children: "contact support", variant: "text", color: "primary" },
      ]}
      pending
    />
  );
};

export default VerificationPending;
