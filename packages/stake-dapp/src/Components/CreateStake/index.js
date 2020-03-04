import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Grid from "@material-ui/core/Grid";
import moment from "moment";

// import SNETButton from "shared/dist/components/SNETButton";

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
import { fromWei } from "../../Utils/GenHelperFunctions";

const CreateStake = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [showWithdrawPopup, setShowWithdrawPopup] = useState(false);
  const [showAddStakePopup, setShowAddStakePopup] = useState(false);

  const { activeStake } = useSelector(state => state.stakeReducer);
  const { metamaskDetails } = useSelector(state => state.metamaskReducer);

  const stakeStartDate = moment.unix(activeStake.startPeriod).format("MMM YYYY");

  useEffect(() => {
    try {
      // TODO: Convert the same to async Constant based on the need...
      dispatch(stakeActions.fetchCurrentActiveStakeWindow(metamaskDetails));
    } catch (_error) {
      //console.log("error - ", error);
    }
  }, [dispatch, metamaskDetails]);

  // const openWithdrawPopup = () => {
  //   setShowWithdrawPopup(true);
  // };

  // const openAddStakePopup = () => {
  //   setShowAddStakePopup(true);
  // };

  const closeWithdrawPopup = () => {
    setShowWithdrawPopup(false);
  };

  const closeAddStakePopup = () => {
    setShowAddStakePopup(false);
  };

  const handleClick = btnAction => {
    if (btnAction === "withdraw") setShowWithdrawPopup(true);

    if (btnAction === "addStake") setShowAddStakePopup(true);
  };

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
          stakeStartDate={stakeStartDate}
          stakeMapIndex={activeStake.stakeMapIndex}
          minStake={fromWei(activeStake.minStake)}
          maxStake={fromWei(activeStake.maxStake)}
          agreementDetails={agreementDetails}
          handleClick={handleClick}
        />
      </Grid>
      {/* <SNETButton children="open popup" color="primary" onClick={openWithdrawPopup} /> */}
      <WithdrawStake
        open={showWithdrawPopup}
        handleClose={closeWithdrawPopup}
        withdrawStakeAmountDetails={withdrawStakeAmountDetails(activeStake)}
        stakeStartDate={stakeStartDate}
        stakeMapIndex={activeStake.stakeMapIndex}
        minStake={fromWei(activeStake.minStake)}
      />
      <AddStake
        open={showAddStakePopup}
        handleClose={closeAddStakePopup}
        addStakeAmountDetails={addStakeAmountDetails(activeStake)}
        stakeStartDate={stakeStartDate}
        stakeMapIndex={activeStake.stakeMapIndex}
        minStake={fromWei(activeStake.minStake)}
      />
    </Grid>
  );
};

export default CreateStake;
