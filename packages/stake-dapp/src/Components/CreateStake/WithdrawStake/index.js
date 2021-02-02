import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import web3 from "web3";

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

import { useStyles } from "./styles";
import { LoaderContent } from "../../../Utils/Loader";
import { tokenActions, stakeActions, loaderActions } from "../../../Services/Redux/actionCreators";
import { toWei, fromWei, isValidInputAmount } from "../../../Utils/GenHelperFunctions";
import { withdrawStakeV2 } from "../../../Utils/BlockchainHelper";

const BN = web3.utils.BN;

const WithdrawStake = ({ handleClose, open, withdrawStakeAmountDetails, stakeDetails }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [withdrawAmount, setWithdrawAmount] = useState(Math.floor(fromWei(stakeDetails.myStake)));
  const [disableAction, setDisableAction] = useState(false);
  const [alert, setAlert] = useState({ type: alertTypes.ERROR, message: undefined });

  const metamaskDetails = useSelector(state => state.metamaskReducer.metamaskDetails);

  const stakeStartDate = moment.unix(stakeDetails.startPeriod).format("MMM YYYY");

  const handleCancel = () => {
    // Reset the error state
    setDisableAction(false);
    setAlert({ type: alertTypes.ERROR, message: undefined });
    handleClose();
  };

  const handleAmountChange = event => {
    if (isValidInputAmount(event.target.value)) {
      setWithdrawAmount(event.target.value);
    } else if (event.target.value === "") {
      setWithdrawAmount("");
    } else {
      // Just Ignore the value
    }
  };

  const handleWithdraw = async () => {
    setAlert({ type: alertTypes.ERROR, message: undefined });

    const zeroBN = new BN(0);
    const withdrawAmountBN = new BN(toWei(withdrawAmount));

    const myStakeBN = new BN(stakeDetails.myStake);
    const minStakeBN = new BN(stakeDetails.minStake);

    const balStakeBN = myStakeBN.sub(withdrawAmountBN);

    if (
      withdrawAmountBN.gt(zeroBN) &&
      withdrawAmountBN.lte(myStakeBN) &&
      (balStakeBN.eq(zeroBN) || balStakeBN.gte(minStakeBN))
    ) {
      try {
        setAlert({ type: alertTypes.INFO, message: "Transaction is in Progress" });
        dispatch(loaderActions.startAppLoader(LoaderContent.WITHDRAW_STAKE));

        // Initiate the Withdraw Stake Operation
        await withdrawStakeV2(metamaskDetails, stakeDetails.stakeMapIndex, withdrawAmountBN);

        setAlert({
          type: alertTypes.SUCCESS,
          message: "You have successfully withdrawn tokens to your account.",
        });

        dispatch(loaderActions.stopAppLoader());

        // Disable the submit operation
        setDisableAction(true);

        // Update the AGI Token Balances
        dispatch(tokenActions.updateTokenBalance(metamaskDetails));
        dispatch(stakeActions.fetchUserStakeBalanceFromBlockchain(metamaskDetails));

        // To get the latest state from Blockchain
        dispatch(stakeActions.fetchUserStakeFromBlockchain(metamaskDetails, stakeDetails.stakeMapIndex));
      } catch (err) {
        setAlert({ type: alertTypes.ERROR, message: "Transaction has failed." });
        dispatch(loaderActions.stopAppLoader());
      }
    } else if (withdrawAmountBN.gt(myStakeBN)) {
      setAlert({
        type: alertTypes.ERROR,
        message: `Oops! You cannot withdraw more than staked amount.`,
      });
    } else {
      // Display the alert message
      setAlert({
        type: alertTypes.ERROR,
        message: `Oops! You can either withdraw full stake or need to keep minimum stake.`,
      });
    }
  };

  return (
    <div>
      <Modal open={open} onClose={handleCancel} className={classes.Modal}>
        <Card className={classes.card}>
          <CardHeader
            className={classes.CardHeader}
            title="Withdraw Stake Amount"
            action={
              <IconButton onClick={handleCancel}>
                <CloseIcon />
              </IconButton>
            }
          />
          <CardContent className={classes.CardContent}>
            <div className={classes.sessionDetails}>
              <Typography>Session: </Typography>
              <Typography>
                {" "}
                {stakeStartDate} #{stakeDetails.stakeMapIndex}
              </Typography>
            </div>
            <div className={classes.withdrawStakeTextfield}>
              <SNETTextfield
                name="WithdrawAmount"
                label="Withdraw Stake Amount"
                onChange={handleAmountChange}
                value={withdrawAmount}
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
                <Typography>
                  Auto Renewed amount cannot be withdrawn until auto renew is completed or disabled.
                </Typography>
              </div>
              {withdrawStakeAmountDetails.map(item => (
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
                  If you want to cancel your stake then please withdraw the entire amount. Partial withdrawals are only
                  allowed if the minimum stake amount of {fromWei(stakeDetails.minStake)} AGI is maintained.
                </Typography>
              </AlertBox>
              <AlertBox type={alert.type} message={alert.message} />
            </div>
          </CardContent>
          <CardActions className={classes.CardActions}>
            <SNETButton children="cancel" color="primary" variant="text" onClick={handleCancel} />
            <SNETButton
              children="submit withdrawal"
              color="primary"
              variant="contained"
              onClick={handleWithdraw}
              disabled={!metamaskDetails.isTxnsAllowed || disableAction}
            />
          </CardActions>
        </Card>
      </Modal>
    </div>
  );
};

export default WithdrawStake;
