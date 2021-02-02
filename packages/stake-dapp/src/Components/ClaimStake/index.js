import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import moment from "moment";

import AlertBox, { alertTypes } from "shared/dist/components/AlertBox";
import SNETButton from "shared/dist/components/SNETButton";
import NoDataFoundImg from "shared/dist/assets/images/NoDataFound.png";

import { yourStakeDetails, sessionDetails, btnDetails } from "./content";
import { useStyles } from "./styles";
import AccountBalance from "../AccountBalance";
import CardCollection from "../StakeSession/CardCollection";
import InfoBox from "../StakeSession/InfoBox";
import { LoaderContent } from "../../Utils/Loader";
import { loaderActions, stakeActions, tokenActions } from "../../Services/Redux/actionCreators";
import { claimStakeV2, withdrawStakeV2 } from "../../Utils/BlockchainHelper";
import { toBigNumber } from "../../Utils/GenHelperFunctions";

import InlineLoader from "../InlineLoader";
import NoMetaMask from "../NoMetamask";

const stateSelector = state => ({
  claimStakes: state.stakeReducer.claimStakes,
  metamaskDetails: state.metamaskReducer.metamaskDetails,
  isLoading: state.loader.claimStakeList.isLoading,
  disableAction: state.stakeReducer.claimStakesActions,
});

const ClaimStake = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { claimStakes, metamaskDetails, isLoading, disableAction } = useSelector(state => stateSelector(state));
  const [alert, setAlert] = useState({ 0: { type: "Error", message: "Test Error Message" } });

  if (isLoading) {
    return <InlineLoader />;
  }

  if (!metamaskDetails.isTxnsAllowed) {
    return <NoMetaMask />;
  }

  if (claimStakes.length === 0) {
    return (
      <div className={classes.noDataFoundSection}>
        <img src={NoDataFoundImg} alt="No Data Found" />
        <Typography>You have no stakes to claim.</Typography>
      </div>
    );
  }

  const initiateClaimState = async stakeMapIndex => {
    try {
      setAlert({ [stakeMapIndex]: { type: alertTypes.INFO, message: "Transaction is in Progress" } });

      dispatch(loaderActions.startAppLoader(LoaderContent.CLAIM_STAKE));

      // Initiate the Withdraw Stake Operation
      await claimStakeV2(metamaskDetails, stakeMapIndex);

      setAlert({
        [stakeMapIndex]: {
          type: alertTypes.SUCCESS,
          message: "Congratulations! You have successfully claimed your stake and reward.",
        },
      });

      dispatch(
        stakeActions.updateClaimStakesActions({
          [stakeMapIndex]: {
            ...disableAction[stakeMapIndex],
            disableClaim: true,
          },
        })
      );

      // Update the AGI Token Balances
      dispatch(tokenActions.updateTokenBalance(metamaskDetails));
      dispatch(tokenActions.updateTokenAllowance(metamaskDetails));

      dispatch(loaderActions.stopAppLoader());
    } catch (err) {
      setAlert({ [stakeMapIndex]: { type: alertTypes.ERROR, message: "Transaction has failed." } });
      dispatch(loaderActions.stopAppLoader());
    }
  };

  const initiateWithdrawStake = async (stakeMapIndex, pendingForApprovalAmountBN) => {
    try {
      setAlert({ [stakeMapIndex]: { type: alertTypes.INFO, message: "Transaction is in Progress" } });

      dispatch(loaderActions.startAppLoader(LoaderContent.WITHDRAW_STAKE));

      // Initiate the Withdraw Stake Operation
      await withdrawStakeV2(metamaskDetails, stakeMapIndex, pendingForApprovalAmountBN);

      setAlert({
        [stakeMapIndex]: { type: alertTypes.SUCCESS, message: "Transaction has been completed successfully" },
      });

      dispatch(
        stakeActions.updateClaimStakesActions({
          [stakeMapIndex]: {
            ...disableAction[stakeMapIndex],
            disableWithdraw: true,
          },
        })
      );

      // Update the AGI Token Balances
      dispatch(tokenActions.updateTokenBalance(metamaskDetails));
      dispatch(tokenActions.updateTokenAllowance(metamaskDetails));

      dispatch(loaderActions.stopAppLoader());
    } catch (err) {
      setAlert({ [stakeMapIndex]: { type: alertTypes.ERROR, message: "Transaction has failed." } });
      dispatch(loaderActions.stopAppLoader());
    }
  };

  const handleClick = async (btnAction, stakeMapIndex, stakeDetails) => {
    if (btnAction === "reStake") {
      alert("reStake Coming Soon... Stay Tuned...");
    }

    if (btnAction === "withdrawStake") {
      await initiateWithdrawStake(stakeMapIndex, toBigNumber(stakeDetails.pendingForApprovalAmount));
    }

    if (btnAction === "claimStake") {
      await initiateClaimState(stakeMapIndex);
    }
  };

  const disableUserStakeActions = (btnAction, stakeDetails) => {
    const currentTimestamp = moment().unix();

    // Check for Metamask Connection
    if (!metamaskDetails.isTxnsAllowed) {
      return true;
    }

    if (btnAction === "reStake") {
      // Comming soon feature....
      return true;
    }

    // Check Withdraw Stake in case if there is no action from the operator
    if (btnAction === "withdrawStake") {
      if (disableAction[stakeDetails.stakeMapIndex] && disableAction[stakeDetails.stakeMapIndex].disableWithdraw) {
        return true;
      }

      if (currentTimestamp > stakeDetails.approvalEndPeriod && stakeDetails.pendingForApprovalAmount !== 0)
        return false;
      else return true;
    }

    // Check if the Stake is in Submission Phase and Not Open For external
    if (btnAction === "claimStake") {
      if (disableAction[stakeDetails.stakeMapIndex] && disableAction[stakeDetails.stakeMapIndex].disableClaim) {
        return true;
      }

      // Check for the Claim Actions
      const gracePeriod =
        parseInt(stakeDetails.endPeriod) + parseInt(stakeDetails.endPeriod - stakeDetails.requestWithdrawStartPeriod);

      if (
        stakeDetails.autoRenewal === false &&
        currentTimestamp > stakeDetails.endPeriod &&
        stakeDetails.approvedAmount !== 0
      ) {
        return false;
      } else if (
        stakeDetails.autoRenewal === true &&
        currentTimestamp > gracePeriod &&
        stakeDetails.approvedAmount !== 0
      ) {
        return false;
      } else {
        return true;
      }
    }

    return false;
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <AccountBalance />
      </Grid>
      <Grid item xs={12} sm={12} md={8} lg={8} className={classes.stakeSessionBoxContainer}>
        {claimStakes.map(stake => (
          <div key={stake.stakeMapIndex} className={classes.box}>
            <div className={classes.header}>
              <Typography variant="h6">
                Stake Session - {moment.unix(stake.startPeriod).format("MMM YYYY")} #{stake.stakeMapIndex}
              </Typography>
            </div>
            <CardCollection yourStakeData={yourStakeDetails(stake)} sessionDetailsData={sessionDetails(stake)} />
            <div className={classes.infoBox}>
              <InfoBox stakeDetails={stake} />
            </div>
            <div className={classes.alertBoxContainer}>
              <AlertBox
                type={alert[stake.stakeMapIndex] ? alert[stake.stakeMapIndex].type : undefined}
                message={alert[stake.stakeMapIndex] ? alert[stake.stakeMapIndex].message : undefined}
              />
            </div>
            <div className={classes.btnContainer}>
              {btnDetails.map(button => (
                <SNETButton
                  key={button.text}
                  children={button.text}
                  color={button.color}
                  variant={button.variant}
                  onClick={_e => handleClick(button.action, stake.stakeMapIndex, stake)}
                  disabled={disableUserStakeActions(button.action, stake)}
                />
              ))}
            </div>
          </div>
        ))}
      </Grid>
    </Grid>
  );
};

export default ClaimStake;
