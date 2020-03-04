import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";

import moment from "moment";
import web3 from "web3";

import SNETButton from "shared/dist/components/SNETButton";
import SNETTextfield from "shared/dist/components/SNETTextfield";
import AlertBox, { alertTypes } from "shared/dist/components/AlertBox";

import { useStyles } from "./styles";
import { LoaderContent } from "../../../Utils/Loader";
import { tokenActions, loaderActions } from "../../../Services/Redux/actionCreators";
import { toWei, fromWei, isValidInputAmount } from "../../../Utils/GenHelperFunctions";
import { waitForTransaction, withdrawStake } from "../../../Utils/BlockchainHelper";

const BN = web3.utils.BN;

const WithdrawStake = ({ handleClose, open, withdrawStakeAmountDetails, stakeDetails }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [withdrawAmount, setWithdrawAmount] = useState(stakeDetails.myStake);
  const [alert, setAlert] = useState({ type: alertTypes.ERROR, message: undefined });

  const metamaskDetails = useSelector(state => state.metamaskReducer.metamaskDetails);

  const stakeStartDate = moment.unix(stakeDetails.startPeriod).format("MMM YYYY");

  const handleCancel = () => {
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
    const zeroBN = new BN(0);
    const withdrawAmountBN = new BN(toWei(withdrawAmount));
    //const myStakeBN = new BN(stakeDetails.myStake);

    // TODO - Add the condition to validate the MinStake & myStake amounts
    if (withdrawAmountBN.gt(zeroBN)) {
      let txHash;

      try {
        // Initiate the Withdraw Stake Operation
        txHash = await withdrawStake(metamaskDetails, stakeDetails.stakeMapIndex, withdrawAmountBN);

        dispatch(loaderActions.startAppLoader(LoaderContent.WITHDRAW_STAKE));

        await waitForTransaction(txHash);

        setAlert({ type: alertTypes.SUCCESS, message: "Transaction has been completed successfully" });

        dispatch(loaderActions.stopAppLoader());

        // Update the AGI Token Balances
        dispatch(tokenActions.updateTokenBalance(metamaskDetails));
      } catch (err) {
        setAlert({ type: alertTypes.ERROR, message: "Transaction has failed." });
        dispatch(loaderActions.stopAppLoader());
      }
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
              <Typography>Session : </Typography>
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
              />
            </div>
            <div className={classes.stakeAmtDetailsContainer}>
              {withdrawStakeAmountDetails.map(item => (
                <div className={classes.stakeAmtDetail} key={item.title}>
                  <div className={classes.iconTitleContainer}>
                    <InfoIcon />
                    <Typography className={classes.title}>{item.title}</Typography>
                  </div>
                  <div className={classes.value}>
                    <Typography>{item.amount}</Typography>
                    <Typography>AGI</Typography>
                  </div>
                </div>
              ))}
            </div>
            <div className={classes.alertBoxContainer}>
              <AlertBox type={alertTypes.INFO}>
                <InfoIcon />
                <Typography className={classes.infoAlertMessage}>
                  You can withdraw amount of that keeps the minimum of {fromWei(stakeDetails.minStake)} AGI stake amount
                  or you can withdraw all stake amount for a balance of 0 AGI.
                </Typography>
              </AlertBox>
              <AlertBox type={alert.type} message={alert.message} />
            </div>
          </CardContent>
          <CardActions className={classes.CardActions}>
            <SNETButton children="cancel" color="primary" variant="text" onClick={handleCancel} />
            <SNETButton children="submit withdraw" color="primary" variant="contained" onClick={handleWithdraw} />
          </CardActions>
        </Card>
      </Modal>
    </div>
  );
};

export default WithdrawStake;
