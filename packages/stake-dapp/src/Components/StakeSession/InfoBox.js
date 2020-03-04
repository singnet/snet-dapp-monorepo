import React from "react";

import Typography from "@material-ui/core/Typography";
import InfoIcon from "@material-ui/icons/Info";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

import moment from "moment";

import AlertBox, { alertTypes } from "shared/dist/components/AlertBox";

import { fromWei } from "../../Utils/GenHelperFunctions";

const InfoBox = ({ stakeDetails }) => {
  const currentTime = moment().unix();

  // Open Stake
  if (currentTime >= stakeDetails.startPeriod && currentTime <= stakeDetails.submissionEndPeriod) {
    return (
      <AlertBox type={alertTypes.INFO}>
        <InfoIcon />
        <div>
          <Typography>
            - Stake amount must be minimum {fromWei(stakeDetails.minStake)} AGI and maximum{" "}
            {fromWei(stakeDetails.maxStake)} AGI
          </Typography>
          <Typography>- SNET foundation will accept all or a partial amount of your stake.</Typography>
          <Typography>
            - Rejected stake portions not accepted will be returned to your wallet account automatically (no gas cost).
          </Typography>
        </div>
      </AlertBox>
    );
  }

  // Incubation
  if (currentTime > stakeDetails.submissionEndPeriod && currentTime < stakeDetails.requestWithdrawStartPeriod) {
    return (
      <AlertBox type={alertTypes.INFO}>
        <InfoIcon />
        <div>
          <Typography>
            - Auto Renewal options will be editable one week prior before the incubation period ends
          </Typography>
          <Typography>
            - Any partial amounts not accepted by SNET Foundation will be automatically refunded to your wallet account
          </Typography>
          <Typography>- You can review the Transaction History for full details of this stake session</Typography>
        </div>
      </AlertBox>
    );
  }
  // Incubation
  if (currentTime >= stakeDetails.requestWithdrawStartPeriod && currentTime <= stakeDetails.endPeriod) {
    return (
      <AlertBox type={alertTypes.SUCCESS}>
        <CheckCircleOutlineIcon />
        <div>
          <Typography>Auto Renewal options are available</Typography>
          <Typography>You can enable or disable these controls until the stake incubation period ends.</Typography>
        </div>
      </AlertBox>
    );
  }

  return null;
};

export default InfoBox;
