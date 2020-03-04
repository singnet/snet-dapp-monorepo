import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import NoDataFoundImg from "shared/dist/assets/images/NoDataFound.png";

import { useStyles } from "./styles";
import SessionTime from "./SessionTime";
import AccountBalance from "../AccountBalance";
import StakeSession from "../StakeSession";
import {
  cardDetails,
  btnDetails,
  agreementDetails,
  withdrawStakeAmountDetails,
  addStakeAmountDetails,
} from "./content";
import WithdrawStake from "./WithdrawStake";
import AddStake from "./AddStake";
import { stakeActions } from "../../Services/Redux/actionCreators";

const stateSelector = state => ({
  activeStake: state.stakeReducer.activeStake,
  metamaskDetails: state.metamaskReducer.metamaskDetails,
});

const CreateStake = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [showWithdrawPopup, setShowWithdrawPopup] = useState(false);
  const [showAddStakePopup, setShowAddStakePopup] = useState(false);
  const [autoRenewal, setAutoRenewal] = useState(true);

  const { activeStake, metamaskDetails } = useSelector(state => stateSelector(state));

  useEffect(() => {
    try {
      // TODO: Convert the same to async Constant based on the need...
      //dispatch(stakeActions.fetchCurrentActiveStakeWindow(metamaskDetails));

      const loadData = async () => {
        await dispatch(stakeActions.fetchCurrentActiveStakeWindow(metamaskDetails));
      };

      loadData();
    } catch (_error) {
      //console.log("error - ", error); // TODO - Take them to the error page
    }
  }, [dispatch, metamaskDetails]);

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
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <SessionTime />
        <AccountBalance />
      </Grid>
      <Grid item xs={12} sm={12} md={8} lg={8} className={classes.rightSideSection}>
        <StakeSession
          cardDetails={cardDetails(activeStake)}
          btnDetails={btnDetails}
          agreementDetails={agreementDetails}
          handleClick={handleClick}
          stakeDetails={activeStake}
        />
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
