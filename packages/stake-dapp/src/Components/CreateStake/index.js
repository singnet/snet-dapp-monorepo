import React, { useState } from "react";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import NoDataFoundImg from "shared/dist/assets/images/NoDataFound.png";

import { useStyles } from "./styles";
import SessionTime from "./SessionTime";
import AccountBalance from "../AccountBalance";
import StakeSession from "../StakeSession";
import StakeSummary from "../StakeSummary";
import {
  btnDetails,
  agreementDetails,
  withdrawStakeAmountDetails,
  addStakeAmountDetails,
  yourStakeDetails,
  sessionDetails,
} from "./content";
import WithdrawStake from "./WithdrawStake";
import AddStake from "./AddStake";
import InlineLoader from "../InlineLoader";

const stateSelector = state => ({
  activeStake: state.stakeReducer.activeStake,
  isLoading: state.loader.activeStakeWindow.isLoading,
});

const CreateStake = () => {
  const classes = useStyles();

  const [showWithdrawPopup, setShowWithdrawPopup] = useState(false);
  const [showAddStakePopup, setShowAddStakePopup] = useState(false);
  const [autoRenewal, setAutoRenewal] = useState(true);

  const { activeStake, isLoading } = useSelector(state => stateSelector(state));

  const closeWithdrawPopup = () => {
    setShowWithdrawPopup(false);
  };

  const closeAddStakePopup = () => {
    setShowAddStakePopup(false);
  };

  const handleClick = (btnAction, autoRenewalOption) => {
    if (btnAction === "withdraw") setShowWithdrawPopup(true);

    if (btnAction === "addStake") {
      setAutoRenewal(autoRenewalOption);
      setShowAddStakePopup(true);
    }
  };

  if (isLoading) {
    return <InlineLoader />;
  }

  // No Data Found Scenario
  if (!activeStake.stakeMapIndex) {
    return (
      <Grid container>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <AccountBalance />
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8} className={classes.rightSideSection}>
          <div className={classes.noDataFoundSection}>
            <img src={NoDataFoundImg} alt="No Data Found" />
            <Typography>There is no active stake window.</Typography>
            <Typography> Please wait for stake to open.</Typography>
          </div>
          <StakeSummary />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <SessionTime stakeDetails={activeStake} />
        <AccountBalance />
      </Grid>
      <Grid item xs={12} sm={12} md={8} lg={8} className={classes.rightSideSection}>
        <StakeSession
          yourStakeDetails={yourStakeDetails(activeStake)}
          sessionDetails={sessionDetails(activeStake)}
          btnDetails={btnDetails}
          agreementDetails={agreementDetails}
          handleClick={handleClick}
          stakeDetails={activeStake}
        />
        <StakeSummary />
      </Grid>
      <WithdrawStake
        open={showWithdrawPopup}
        handleClose={closeWithdrawPopup}
        withdrawStakeAmountDetails={withdrawStakeAmountDetails(activeStake)}
        stakeDetails={activeStake}
      />
      <AddStake
        open={showAddStakePopup}
        handleClose={closeAddStakePopup}
        addStakeAmountDetails={addStakeAmountDetails(activeStake)}
        stakeDetails={activeStake}
        autoRenewal={autoRenewal}
      />
    </Grid>
  );
};

export default CreateStake;
