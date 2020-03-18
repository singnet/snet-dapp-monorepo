import React from "react";
import moment from "moment";
import BigNumber from "bignumber.js";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import { useStyles } from "./styles";
import { fromWei } from "../../Utils/GenHelperFunctions";

const TableRow = ({ handleExpandeTable, expandTable, stakeWindow }) => {
  const classes = useStyles();

  const startPeriod = moment.unix(stakeWindow.startPeriod).format("MMM YYYY");

  const getStakeAmount = () => {
    let stakeAmount = new BigNumber(0);
    let autoRenewApprovedAmount = new BigNumber(0);

    // Check if the approved Amount exists
    const autoRenewStakeEvent = stakeWindow.transactionList.filter(
      t => t.eventName === "AutoRenewStake" && t.eventData.newStakeIndex === stakeWindow.stakeMapIndex
    );
    const approvedStakeEvent = stakeWindow.transactionList.filter(t => t.eventName === "ApproveStake");
    const submitStakeEvent = stakeWindow.transactionList.filter(t => t.eventName === "SubmitStake");

    // Check for Auto Renewal Event
    if (autoRenewStakeEvent.length > 0) {
      const transaction = autoRenewStakeEvent[0];
      autoRenewApprovedAmount = new BigNumber(transaction.eventData.approvedAmount);
    }

    if (approvedStakeEvent.length > 0) {
      const transaction = approvedStakeEvent[0];
      stakeAmount = new BigNumber(transaction.eventData.approvedStakeAmount);
    } else if (submitStakeEvent.length > 0) {
      stakeAmount = new BigNumber(
        submitStakeEvent.map(s => parseInt(s.eventData.stakeAmount)).reduce((a, b) => a + b, 0)
      );
    }

    return stakeAmount.plus(autoRenewApprovedAmount);
  };

  const calculateReward = () => {
    const windowRewardAmount = new BigNumber(stakeWindow.rewardAmount);
    const windowTotalStake = new BigNumber(stakeWindow.windowTotalStake !== 0 ? stakeWindow.windowTotalStake : 1);
    const windowMaxCap = new BigNumber(stakeWindow.windowMaxCap);

    let rewardAmount = new BigNumber(0);
    let rewardAmountFromAutoRenewal = new BigNumber(0);
    let stakeAmount = new BigNumber(0);
    let autoRenewApprovedAmount = new BigNumber(0);

    // Check if Claim Event exists to get the Reward Amount
    const claimStakeEvent = stakeWindow.transactionList.filter(t => t.eventName === "ClaimStake");
    if (claimStakeEvent.length > 0) {
      return new BigNumber(claimStakeEvent[0].eventData.rewardAmount);
    }

    // Check if the approved Amount exists
    const autoRenewStakeEvent = stakeWindow.transactionList.filter(
      t => t.eventName === "AutoRenewStake" && t.eventData.newStakeIndex === stakeWindow.stakeMapIndex
    );
    const approvedStakeEvent = stakeWindow.transactionList.filter(t => t.eventName === "ApproveStake");
    const submitStakeEvent = stakeWindow.transactionList.filter(t => t.eventName === "SubmitStake");

    // Check for Auto Renewal Event
    if (autoRenewStakeEvent.length > 0) {
      const transaction = autoRenewStakeEvent[0];
      autoRenewApprovedAmount = new BigNumber(transaction.eventData.approvedAmount);

      rewardAmountFromAutoRenewal = autoRenewApprovedAmount
        .times(windowRewardAmount)
        .div(windowTotalStake.lt(windowMaxCap) ? windowTotalStake : windowMaxCap);
    }

    // Check for Either Approved Stake or Submit Stake. If Approve Exists we can ignore Submit
    if (approvedStakeEvent.length > 0) {
      const transaction = approvedStakeEvent[0];
      stakeAmount = new BigNumber(transaction.eventData.approvedStakeAmount);

      rewardAmount = stakeAmount
        .times(windowRewardAmount)
        .div(windowTotalStake.lt(windowMaxCap) ? windowTotalStake : windowMaxCap);
    } else if (submitStakeEvent.length > 0) {
      // Check if the stake crossed Approval Period - No Reward
      const currentTime = moment().unix();
      if (currentTime < stakeWindow.approvalEndPeriod) {
        stakeAmount = submitStakeEvent.map(s => new BigNumber(s.eventData.stakeAmount)).reduce((a, b) => a.plus(b), 0);
        rewardAmount = stakeAmount
          .times(windowRewardAmount)
          .div(windowTotalStake.lt(windowMaxCap) ? windowTotalStake : windowMaxCap);
      }
    }

    return rewardAmount.plus(rewardAmountFromAutoRenewal);
  };

  return (
    <Grid containerer className={classes.tableRow} onClick={_e => handleExpandeTable(stakeWindow.stakeMapIndex)}>
      <Grid item xs={12} sm={12} md={2} lg={2} className={classes.tableData}>
        <Typography className={classes.dateId}>{startPeriod}</Typography>
        <Typography className={classes.dateId}>ID-{stakeWindow.stakeMapIndex}</Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={2} lg={2} className={classes.tableData}>
        <Typography className={classes.value}>{fromWei(getStakeAmount())}</Typography>
        <Typography className={classes.unit}>AGI</Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={3} lg={3} className={classes.tableData}>
        <Typography className={classes.value}>{fromWei(calculateReward())}</Typography>
        <Typography className={classes.unit}>AGI</Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={2} lg={2} className={classes.tableData}>
        <Typography className={classes.value}>{fromWei(stakeWindow.windowTotalStake)}</Typography>
        <Typography className={classes.unit}>AGI</Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={2} lg={2} className={classes.tableData}>
        <Typography className={classes.value}>{fromWei(stakeWindow.rewardAmount)}</Typography>
        <Typography className={classes.unit}>AGI</Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={1} lg={1} className={classes.tableData}>
        {expandTable ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </Grid>
    </Grid>
  );
};

export default TableRow;
