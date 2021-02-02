import React from "react";

import SNETStatusBanner, { statusTitleType } from "shared/dist/components/SNETStatusBanner";
import orgSetupApprovedImg from "shared/dist/assets/images/VerificationFailed.png";

const Denied = ({ handleVerify, rejectReason }) => {
  return (
    <SNETStatusBanner
      title="Your ID verification was unsuccessfull."
      img={orgSetupApprovedImg}
      description={`Reason for rejection: ${rejectReason}. If you believe there was error in the approval process, please contact our support staff to assist you. `}
      actions={[
        { children: "retry", variant: "contained", color: "primary", onClick: handleVerify },
        { children: "contact support", variant: "outlined", color: "primary" },
      ]}
      type={statusTitleType.REJECTED}
    />
  );
};

export default Denied;
