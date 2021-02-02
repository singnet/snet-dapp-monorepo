import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BigNumber from "bignumber.js";

import Typography from "@material-ui/core/Typography";
import moment from "moment";

import AlertBox, { alertTypes } from "shared/dist/components/AlertBox";

import IncubationProgressDetails from "./IncubationProgressDetails";
import Agreement from "./Agreement";
import InfoBox from "./InfoBox";
import CardCollection from "./CardCollection";
import Button from "./Button";
import { useStyles } from "./styles";
import { LoaderContent } from "../../Utils/Loader";
import { loaderActions, stakeActions } from "../../Services/Redux/actionCreators";
import { updateAutoRenewalV2 } from "../../Utils/BlockchainHelper";

const StakeSession = ({
  incubationProgressDetails,
  agreementDetails,
  btnDetails,
  handleClick,
  stakeDetails,
  yourStakeDetails,
  sessionDetails,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const autoRenewal = stakeDetails.autoRenewal;

  const [alert, setAlert] = useState({ type: alertTypes.ERROR, message: undefined });

  const metamaskDetails = useSelector(state => state.metamaskReducer.metamaskDetails);

  const stakeStartDate = moment.unix(stakeDetails.startPeriod).format("MMM YYYY");
  const stakeMapIndex = stakeDetails.stakeMapIndex;

  const currentTimestamp = moment().unix();

  const disableAutoRenewal = () => {
    // Check for Metamask Connection
    if (!metamaskDetails.isTxnsAllowed) {
      return true;
    }

    // Wait till the Stake Window is Opened
    if (currentTimestamp < stakeDetails.startPeriod) {
      return true;
    }

    // Check if the Stake is in Submission Phase and Not Open For external
    if (
      currentTimestamp >= stakeDetails.startPeriod &&
      currentTimestamp <= stakeDetails.submissionEndPeriod &&
      stakeDetails.openForExternal === false
    ) {
      return true;
    }

    if (
      currentTimestamp >= stakeDetails.startPeriod &&
      currentTimestamp <= stakeDetails.submissionEndPeriod &&
      stakeDetails.openForExternal === true
    ) {
      // myStakeAutoRenewed only for Open Stake Details
      const myStakeAutoRenewed = new BigNumber(stakeDetails.myStakeAutoRenewed);
      if (myStakeAutoRenewed.gt(0)) {
        return true;
      }
    }

    // Check for Non Auto Renewal Period
    if (
      (currentTimestamp > stakeDetails.submissionEndPeriod &&
        currentTimestamp < stakeDetails.requestWithdrawStartPeriod) ||
      currentTimestamp > stakeDetails.endPeriod
    ) {
      return true;
    }

    return false;
  };

  const disableUserStakeActions = () => {
    // Check for Metamask Connection
    if (!metamaskDetails.isTxnsAllowed) {
      return true;
    }

    // Wait for the Stake Window to Open
    if (currentTimestamp < stakeDetails.startPeriod) {
      return true;
    }

    // Check if the Stake is in Submission Phase and Not Open For external
    if (
      currentTimestamp > stakeDetails.startPeriod &&
      currentTimestamp < stakeDetails.submissionEndPeriod &&
      stakeDetails.openForExternal === false
    ) {
      return true;
    }

    // Check for the Claim Actions
    const gracePeriod = stakeDetails.endPeriod + (stakeDetails.endPeriod - stakeDetails.requestWithdrawStartPeriod);

    if (currentTimestamp > stakeDetails.endPeriod && currentTimestamp < gracePeriod) {
      return true;
    }

    return false;
  };

  const setAutoRenewal = autoRenewalSelectedOption => {
    // Call appropriate redux state storage events
    if (currentTimestamp > stakeDetails.startPeriod && currentTimestamp <= stakeDetails.submissionEndPeriod) {
      dispatch(stakeActions.updateActiveStakeAutoRenewal({ autoRenewal: autoRenewalSelectedOption }));
    } else if (
      currentTimestamp >= stakeDetails.requestWithdrawStartPeriod &&
      currentTimestamp <= stakeDetails.endPeriod
    ) {
      dispatch(
        stakeActions.updateIncubatingStakeAutoRenewal({
          stakeMapIndex: stakeDetails.stakeMapIndex,
          autoRenewal: autoRenewalSelectedOption,
        })
      );
    }
  };

  const handleAutoRenewalChange = async event => {
    setAlert({ type: alertTypes.INFO, message: undefined });

    //Check in case of Open Stake or Incubating
    if (
      stakeDetails.myStake === "0" &&
      currentTimestamp > stakeDetails.startPeriod &&
      currentTimestamp < stakeDetails.submissionEndPeriod
    ) {
      setAutoRenewal(event.target.checked);
      return;
    }

    try {
      const selectedAutoRenewal = event.target.checked;

      dispatch(loaderActions.startAppLoader(LoaderContent.UPDATE_STAKE_AUTO_RENEWAL));

      setAlert({ type: alertTypes.INFO, message: "Transaction is in progress" });

      // Initiate the Auto Renewal Flag Update
      await updateAutoRenewalV2(metamaskDetails, stakeDetails.stakeMapIndex, selectedAutoRenewal);

      setAlert({ type: alertTypes.SUCCESS, message: "Transaction has been completed successfully" });

      dispatch(loaderActions.stopAppLoader());

      // set the checkbox only when the transaction is allowed otherwise revert it
      setAutoRenewal(selectedAutoRenewal);

      // TODO - Update the Auto Renewal flag in the Redux store accordingly...
    } catch (err) {
      setAlert({ type: alertTypes.ERROR, message: "Transaction has failed." });
      dispatch(loaderActions.stopAppLoader());
    }
  };

  return (
    <div className={classes.StakeSessionContainer}>
      <div className={classes.header}>
        <Typography variant="h6">
          Stake Session - {stakeStartDate} #{stakeMapIndex}
        </Typography>
      </div>
      <div className={classes.content}>
        <IncubationProgressDetails details={incubationProgressDetails} />
        <CardCollection yourStakeData={yourStakeDetails} sessionDetailsData={sessionDetails} />
      </div>
      <Agreement
        details={agreementDetails}
        autoRenewal={autoRenewal}
        handleChange={handleAutoRenewalChange}
        disableAutoRenewal={disableAutoRenewal()}
      />
      <div className={classes.infoBox}>
        <InfoBox stakeDetails={stakeDetails} />
      </div>
      <div className={classes.alertBoxContainer}>
        <AlertBox type={alert.type} message={alert.message} />
      </div>
      <Button
        details={btnDetails}
        handleClick={handleClick}
        autoRenewal={autoRenewal}
        disableUserStakeActions={disableUserStakeActions()}
      />
    </div>
  );
};

export default StakeSession;
