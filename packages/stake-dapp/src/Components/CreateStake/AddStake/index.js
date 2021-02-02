import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import web3 from "web3";
import BigNumber from "bignumber.js";

import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";

import SNETButton from "shared/dist/components/SNETButton";
import SNETTextfield from "shared/dist/components/SNETTextfield";
import AlertBox, { alertTypes } from "shared/dist/components/AlertBox";
import ApproxSymbolImg from "shared/dist/assets/images/ApproxSymbol.png";

import { useStyles } from "./styles";
import { toWei, fromWei, isValidInputAmount } from "../../../Utils/GenHelperFunctions";
import { approveTokenV2, submitStakeV2 } from "../../../Utils/BlockchainHelper";
import { LoaderContent } from "../../../Utils/Loader";
import { tokenActions, stakeActions, loaderActions } from "../../../Services/Redux/actionCreators";

const BN = web3.utils.BN;
const stateSelector = state => ({
  tokenBalance: state.tokenReducer.tokenBalance,
  tokenAllowance: state.tokenReducer.tokenAllowance,
  metamaskDetails: state.metamaskReducer.metamaskDetails,
});

const AddStake = ({ handleClose, open, addStakeAmountDetails, stakeDetails, autoRenewal }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [stakeAmount, setStakeAmount] = useState(0);
  const [rewardAmount, setRewardAmount] = useState(0);

  const [disableAction, setDisableAction] = useState(false);
  const [alert, setAlert] = useState({ type: alertTypes.ERROR, message: undefined });

  const { tokenBalance, tokenAllowance, metamaskDetails } = useSelector(state => stateSelector(state));

  const stakeStartDate = moment.unix(stakeDetails.startPeriod).format("MMM YYYY");

  // TODO - Check for the Current Time to allow the Operation or Not

  const handleCancel = () => {
    // Reset the error state
    setDisableAction(false);
    setAlert({ type: alertTypes.ERROR, message: undefined });

    handleClose();
  };

  const handleSubmitFunds = async () => {
    // Reset the error state
    setAlert({ type: alertTypes.ERROR, message: undefined });

    const zeroBN = new BN(0);
    const stakeAmountBN = new BN(toWei(stakeAmount));
    const tokenBalanceBN = new BN(tokenBalance);
    const tokenAllowanceBN = new BN(tokenAllowance);

    const myStakeBN = new BN(stakeDetails.myStake);
    const finalStakeBN = myStakeBN.add(stakeAmountBN);

    const minStakeBN = new BN(stakeDetails.minStake);

    if (stakeAmountBN.gt(zeroBN) && stakeAmountBN.lte(tokenBalanceBN) && finalStakeBN.gte(minStakeBN)) {
      let bAllowanceCalled = false;

      try {
        // Need to have an Token Approval before Deposit
        if (tokenAllowanceBN.lt(stakeAmountBN)) {
          setAlert({ type: alertTypes.INFO, message: "Transaction is in Progress" });

          dispatch(loaderActions.startAppLoader(LoaderContent.SUBMIT_STAKE));

          await approveTokenV2(metamaskDetails, stakeAmountBN);

          bAllowanceCalled = true;
        }

        if (!bAllowanceCalled) {
          dispatch(loaderActions.startAppLoader(LoaderContent.SUBMIT_STAKE));
          setAlert({ type: alertTypes.INFO, message: "Transaction is in Progress" });
        }

        // Initiate the SubmitStake Operation
        await submitStakeV2(metamaskDetails, stakeAmountBN, autoRenewal);

        setAlert({
          type: alertTypes.SUCCESS,
          message: "Congratulations! You have successfully staked your tokens. You can safely close this window.",
        });

        dispatch(loaderActions.stopAppLoader());

        // Disable the submit operation
        setDisableAction(true);

        // Update the AGI Token Balances
        dispatch(tokenActions.updateTokenBalance(metamaskDetails));
        dispatch(tokenActions.updateTokenAllowance(metamaskDetails));
        dispatch(stakeActions.fetchUserStakeBalanceFromBlockchain(metamaskDetails));

        // To get the latest state from Blockchain
        dispatch(stakeActions.fetchUserStakeFromBlockchain(metamaskDetails, stakeDetails.stakeMapIndex));
      } catch (err) {
        setAlert({ type: alertTypes.ERROR, message: "Transaction has failed." });
        dispatch(loaderActions.stopAppLoader());
      }
    } else if (finalStakeBN.lt(minStakeBN)) {
      // Display the alert message
      setAlert({
        type: alertTypes.ERROR,
        message: `Oops! Needs to stake at least minimum amount.`,
      });
    } else {
      // Display the alert message
      setAlert({
        type: alertTypes.ERROR,
        message: `Oops! Insufficient AGI Balance in your wallet.`,
      });
    }
  };

  const handleAmountChange = event => {
    if (isValidInputAmount(event.target.value)) {
      setStakeAmount(event.target.value);
      setRewardAmount(computeReward(event.target.value));
    } else if (event.target.value === "") {
      setStakeAmount("");
    } else {
      // Just Ignore the value
    }
  };

  const computeReward = _stakeAmount => {
    const stakeAmount = new BigNumber(toWei(_stakeAmount));

    if (stakeAmount.lte(0)) return 0;

    const myStake = new BigNumber(stakeDetails.myStake);
    const myStakeProcessed = new BigNumber(stakeDetails.myStakeProcessed);

    const windowRewardAmount = new BigNumber(stakeDetails.rewardAmount);
    const windowMaxCap = new BigNumber(stakeDetails.windowMaxCap);

    let totalStakedAmount = new BigNumber(stakeDetails.totalStakedAmount);
    const windowTotalStake = new BigNumber(stakeDetails.windowTotalStake);
    const totalAutoRenewAmount = new BigNumber(stakeDetails.totalAutoRenewAmount);

    if (myStake.gt(myStakeProcessed)) {
      totalStakedAmount = totalStakedAmount.plus(myStake.minus(myStakeProcessed));
    }

    if (myStake.lt(myStakeProcessed)) {
      totalStakedAmount = totalStakedAmount.minus(myStakeProcessed.minus(myStake));
    }

    if (totalStakedAmount.lte(0)) {
      totalStakedAmount = new BigNumber(stakeDetails.myStake);
    }

    // Assuming that the new Stake will be part of total stake amount
    totalStakedAmount = totalStakedAmount.plus(stakeAmount);

    let _rewardAmount = new BigNumber(0);

    // Considering Auto Renewed Stake For calculation
    totalStakedAmount = totalStakedAmount.plus(windowTotalStake).plus(totalAutoRenewAmount);

    if (totalStakedAmount.lt(windowMaxCap)) {
      _rewardAmount = stakeAmount.times(windowRewardAmount).div(totalStakedAmount);
    } else {
      _rewardAmount = stakeAmount.times(windowRewardAmount).div(windowMaxCap);
    }

    return _rewardAmount;
  };

  return (
    <div>
      <Modal open={open} onClose={handleCancel} className={classes.Modal}>
        <Card className={classes.card}>
          <CardHeader
            className={classes.CardHeader}
            title="Add Stake Amount"
            action={
              <IconButton onClick={handleCancel}>
                <CloseIcon />
              </IconButton>
            }
          />
          <CardContent className={classes.CardContent}>
            <div className={classes.sessionDetails}>
              <Typography>Session : </Typography>
              <Typography>
                {stakeStartDate} #{stakeDetails.stakeMapIndex}
              </Typography>
            </div>
            <div className={classes.addStakeTextfieldSection}>
              <SNETTextfield
                name="stakeAmount"
                label="Input Stake Amount"
                extraInfo={"Avaialble Balance: " + fromWei(tokenBalance)}
                value={stakeAmount}
                onChange={handleAmountChange}
                InputProps={{
                  endAdornment: <InputAdornment position="start">agi</InputAdornment>,
                }}
              />
              <img src={ApproxSymbolImg} alt="Approximate Symbol" />
              <SNETTextfield
                label="Reward Amount"
                readOnly={true}
                extraInfo="Approximate based on the current pool size"
                value={fromWei(rewardAmount)}
                InputProps={{
                  endAdornment: <InputAdornment position="start">agi</InputAdornment>,
                }}
              />
            </div>
            <div className={classes.stakeAmtDetailsContainer}>
              <div className={classes.renewedAmtContainer}>
                <div className={classes.stakeAmtDetail}>
                  <div className={classes.label}>
                    <div className={classes.iconTooltipContainer}>
                      <InfoIcon />
                      <p>
                        This is the amount of AGI tokens that were auto renewed from a previous stake session. You will
                        not be able to withdraw these tokens until the incubation period complete and auto renewed is
                        turned off. See Transactions for session details.
                      </p>
                    </div>
                    <Typography className={classes.title}>Renewed Amount</Typography>
                  </div>
                  <div className={classes.value}>
                    <Typography>{fromWei(stakeDetails.myStakeAutoRenewed)}</Typography>
                    <Typography>AGI</Typography>
                  </div>
                </div>
              </div>
              {addStakeAmountDetails.map(item => (
                <div className={classes.stakeAmtDetail} key={item.title}>
                  <div className={classes.label}>
                    <div className={classes.iconTooltipContainer}>
                      <InfoIcon />
                      <p>{item.toolTip}</p>
                    </div>
                    <Typography className={classes.title}>{item.title}</Typography>
                  </div>
                  <div className={classes.value}>
                    <Typography>{item.amount}</Typography>
                    <Typography>{item.unit}</Typography>
                  </div>
                </div>
              ))}
            </div>
            <div className={classes.alertBoxContainer}>
              <AlertBox type={alertTypes.INFO}>
                <InfoIcon />
                <Typography className={classes.infoAlertMessage}>
                  Minimum stake amount is {fromWei(stakeDetails.minStake)} AGI
                </Typography>
              </AlertBox>
              <AlertBox type={alert.type} message={alert.message} />
            </div>
          </CardContent>
          <CardActions className={classes.CardActions}>
            <SNETButton children="cancel" color="primary" variant="text" onClick={handleCancel} />
            <SNETButton
              children="submit funds"
              color="primary"
              variant="contained"
              onClick={handleSubmitFunds}
              disabled={!metamaskDetails.isTxnsAllowed || disableAction}
            />
          </CardActions>
        </Card>
      </Modal>
    </div>
  );
};

export default AddStake;
