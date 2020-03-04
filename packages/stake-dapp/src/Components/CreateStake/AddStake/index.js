import React from "react";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import SwapHorizontalCircleIcon from "@material-ui/icons/SwapHorizontalCircle";

import SNETButton from "shared/dist/components/SNETButton";
import SNETTextfield from "shared/dist/components/SNETTextfield";
import AlertBox, { alertTypes } from "shared/dist/components/AlertBox";

import { useStyles } from "./styles";

const AddStake = ({ handleClose, open, addStakeAmountDetails, stakeStartDate, stakeMapIndex, minStake }) => {
  const classes = useStyles();

  const handleCancel = () => {
    handleClose();
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
                {" "}
                {stakeStartDate} #{stakeMapIndex}
              </Typography>
            </div>
            <div className={classes.addStakeTextfieldSection}>
              <SNETTextfield label="Input Stake Amount" extraInfo="Avaialble Balance: {availBal}" />
              <SwapHorizontalCircleIcon />
              <SNETTextfield label="Reward Amount" extraInfo="Approximate Estimate" />
            </div>
            <div className={classes.stakeAmtDetailsContainer}>
              {addStakeAmountDetails.map(item => (
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
                  You can withdraw amount of that keeps the minimum of {minStake} AGI stake amount or you can withdraw
                  all stake amount for a balance of 0 AGI.
                </Typography>
              </AlertBox>
              <AlertBox type={alertTypes.ERROR} message="error state message" />
            </div>
          </CardContent>
          <CardActions className={classes.CardActions}>
            <SNETButton children="cancel" color="primary" variant="text" />
            <SNETButton children="submit funds" color="primary" variant="contained" />
          </CardActions>
        </Card>
      </Modal>
    </div>
  );
};

export default AddStake;
