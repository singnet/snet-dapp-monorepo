import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";
import SwapHorizontalCircleIcon from "@material-ui/icons/SwapHorizontalCircle";
import InfoIcon from "@material-ui/icons/Info";
import TimerIcon from "@material-ui/icons/Timer";
import InputAdornment from "@material-ui/core/InputAdornment";

import SNETTextfield from "shared/dist/components/SNETTextfield";
import SNETButton from "shared/dist/components/SNETButton";

import { useStyles } from "./styles";
import { GlobalRoutes } from "../../../GlobalRouter/Routes";
import Timer from "../../../Components/CreateStake/SessionTime/Timer";
import { fromWei } from "../../../Utils/GenHelperFunctions";

const calculaterFields = {
  stakeAmount: 7500,
  userRewardAmount: 0,
  poolStakeAmount: 68000,
  maxStakeAmount: 1000000000,
  stakeRewardAmount: 100000,
  numOfStakers: 20,
  incubationPeriodInDays: 30,
  recentWindowLoaded: false,
};

const Banner = ({ classes, recentStakeWindow }) => {
  const history = useHistory();

  const currentTime = moment().unix();

  const [stakeCalculatorFields, setStakeCalculatorFields] = useState(calculaterFields);
  const [showTimer, setShowTimer] = useState(
    currentTime >= recentStakeWindow.startPeriod && currentTime < recentStakeWindow.submissionEndPeriod ? true : false
  );
  const interval = 1000;

  useEffect(() => {
    if (recentStakeWindow.startPeriod > 0 && stakeCalculatorFields.recentWindowLoaded === false) {
      setStakeCalculatorFields({
        ...stakeCalculatorFields,
        stakeRewardAmount: Math.floor(fromWei(recentStakeWindow.windowRewardAmount)),
        poolStakeAmount:
          recentStakeWindow.windowTotalStake > 0
            ? recentStakeWindow.windowTotalStake
            : stakeCalculatorFields.poolStakeAmount,
        incubationPeriodInDays: Math.floor(
          (recentStakeWindow.endPeriod - recentStakeWindow.submissionEndPeriod) / (60 * 60 * 24)
        ),
        recentWindowLoaded: true,
      });
    }
  }, [recentStakeWindow, stakeCalculatorFields]);

  const handleTimerCompletion = () => {
    setShowTimer(false);
  };

  const getRewardAmount = () => {
    const _finalPoolStakeAmount =
      parseInt(stakeCalculatorFields.stakeAmount) + parseInt(stakeCalculatorFields.poolStakeAmount);

    if (_finalPoolStakeAmount > parseInt(stakeCalculatorFields.maxStakeAmount)) return 0;

    let _stakeAmount = parseInt(stakeCalculatorFields.stakeAmount);

    const rewardAmount = Math.floor(
      (_stakeAmount * parseInt(stakeCalculatorFields.stakeRewardAmount)) /
        Math.min(_finalPoolStakeAmount, parseInt(stakeCalculatorFields.maxStakeAmount))
    );

    return isNaN(rewardAmount) ? 0 : rewardAmount;
  };

  const handleDataChange = event => {
    if (!isNaN(event.target.value) && event.target.value >= 0) {
      setStakeCalculatorFields({ ...stakeCalculatorFields, [event.target.name]: event.target.value });
    } else {
      setStakeCalculatorFields({ ...stakeCalculatorFields, [event.target.name]: "" });
    }
  };

  const navigateToLanding = () => {
    history.push(GlobalRoutes.LANDING.path);
  };

  const CounterTitle = () => {
    if (
      showTimer ||
      (currentTime >= recentStakeWindow.startPeriod && currentTime < recentStakeWindow.submissionEndPeriod)
    ) {
      return (
        <Fragment>
          <Typography>Current Session</Typography>
          <Typography>Open for</Typography>
        </Fragment>
      );
    }

    return <Typography>Next Session will open soon</Typography>;
  };

  const ShowTimer = () => {
    if (
      showTimer ||
      (currentTime >= recentStakeWindow.startPeriod && currentTime < recentStakeWindow.submissionEndPeriod)
    ) {
      return (
        <Timer
          key="waitToOpen"
          startTime={currentTime}
          endTime={recentStakeWindow.submissionEndPeriod}
          interval={interval}
          handleTimerCompletion={handleTimerCompletion}
          onHowItWorks={true}
        />
      );
    }
    return null;
  };

  return (
    <Grid container className={classes.bannerContainer}>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.bannerDesFormContainer}>
        <Grid item xs={12} sm={12} md={6} lg={6} className={classes.bannerDescriptionContainer}>
          <Typography className={classes.bannerTitle}>Earn more while holding AGI tokens</Typography>
          <Typography className={classes.bannerDescPara1}>
            By staking AGI coins, you support the operations of our blockchain network and in doing so you will be
            rewarded with more AGI tokens for your contributions.
          </Typography>
          <Typography className={classes.bannerDescPara2}>
            Vest your AGI tokens in 30 day staking sessions. Tokens staked in this way will be used to fulfill
            blockchain transactions on the SingularityNET platform. At the end of the 30 day period you can either
            continue to allow your tokens to vest or withdraw them along with any reward earned during the staking
            period.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} className={classes.bannerForm}>
          <div className={classes.form}>
            <div className={classes.formHeader}>
              <Typography>Staking Calculator</Typography>
            </div>
            <div className={classes.stakedRewardAmt}>
              <SNETTextfield
                type="Number"
                name="stakeAmount"
                label="Staked Amount"
                extraInfo={
                  parseInt(stakeCalculatorFields.stakeAmount) + parseInt(stakeCalculatorFields.poolStakeAmount) >
                  parseInt(stakeCalculatorFields.maxStakeAmount)
                    ? "* Exceeding AGI Total supply"
                    : ""
                }
                value={stakeCalculatorFields.stakeAmount}
                InputProps={{ inputProps: { min: 1, max: stakeCalculatorFields.poolStakeAmount } }}
                onChange={handleDataChange}
              />
              <SwapHorizontalCircleIcon />
              <SNETTextfield
                name="userRewardAmount"
                label="Reward Amount"
                extraInfo="~Approximate"
                value={getRewardAmount()}
              />
            </div>
            <div className={classes.stakingDetails}>
              <div>
                <div className={classes.iconTitlContainer}>
                  <InfoIcon />
                  <Typography>Current Pool Size</Typography>
                </div>
                <div className={classes.valuesContainer}>
                  <TextField
                    type="Number"
                    name="poolStakeAmount"
                    value={stakeCalculatorFields.poolStakeAmount}
                    InputProps={{
                      inputProps: { min: 0, max: stakeCalculatorFields.maxStakeAmount },
                      endAdornment: <InputAdornment position="start">agi</InputAdornment>,
                    }}
                    onChange={handleDataChange}
                  />
                </div>
              </div>
              <div>
                <div className={classes.iconTitlContainer}>
                  <InfoIcon />
                  <Typography>Reward Pool</Typography>
                </div>
                <div className={classes.valuesContainer}>
                  <TextField
                    type="Number"
                    name="stakeRewardAmount"
                    value={stakeCalculatorFields.stakeRewardAmount}
                    InputProps={{
                      inputProps: { min: 1 },
                      endAdornment: <InputAdornment position="start">agi</InputAdornment>,
                    }}
                    onChange={handleDataChange}
                  />
                </div>
              </div>
              <div>
                <div className={classes.iconTitlContainer}>
                  <InfoIcon />
                  <Typography>Incubation Period</Typography>
                </div>
                <div className={classes.incubationValuesConatiner}>
                  <Typography className={classes.incubationValue}>
                    {stakeCalculatorFields.incubationPeriodInDays}
                  </Typography>
                  <Typography className={classes.incubationUnit}>days</Typography>
                </div>
              </div>
            </div>
            <div className={classes.formBtnContainer}>
              <SNETButton
                children="stake & earntokens"
                color="primary"
                variant="contained"
                onClick={navigateToLanding}
              />
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.countDownContainer}>
        <div className={classes.countDownTitle}>
          <TimerIcon />
          <CounterTitle />
        </div>
        <ShowTimer />
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(Banner);
