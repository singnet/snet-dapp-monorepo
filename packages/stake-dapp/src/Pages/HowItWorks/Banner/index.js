import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import BigNumber from "bignumber.js";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";
import InfoIcon from "@material-ui/icons/Info";
import TimerIcon from "@material-ui/icons/Timer";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import InputAdornment from "@material-ui/core/InputAdornment";

import SNETTextfield from "shared/dist/components/SNETTextfield";
import SNETButton from "shared/dist/components/SNETButton";
import ApproxSymbolImg from "shared/dist/assets/images/ApproxSymbol.png";

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

const Banner = ({ classes, recentStakeWindow, stakeOverallSummary }) => {
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
          recentStakeWindow.windowTotalStake > 0 ||
          recentStakeWindow.totalAutoRenewAmount > 0 ||
          recentStakeWindow.totalPendingApprovalStake > 0
            ? Math.floor(
                fromWei(
                  BigNumber.sum(
                    recentStakeWindow.windowTotalStake,
                    recentStakeWindow.totalAutoRenewAmount,
                    recentStakeWindow.totalPendingApprovalStake
                  )
                )
              )
            : stakeCalculatorFields.poolStakeAmount,
        incubationPeriodInDays: Math.ceil(
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
    const maxStakeAmount = new BigNumber(stakeCalculatorFields.maxStakeAmount);
    const stakeRewardAmount = new BigNumber(stakeCalculatorFields.stakeRewardAmount);
    const _finalPoolStakeAmount = BigNumber.sum(
      stakeCalculatorFields.stakeAmount,
      stakeCalculatorFields.poolStakeAmount
    );
    const _stakeAmount = new BigNumber(stakeCalculatorFields.stakeAmount);

    if (_finalPoolStakeAmount.gt(maxStakeAmount)) return 0;

    let rewardAmount = new BigNumber(0);

    if (_finalPoolStakeAmount.lt(maxStakeAmount)) {
      rewardAmount = _stakeAmount.times(stakeRewardAmount).div(_finalPoolStakeAmount);
    } else {
      rewardAmount = _stakeAmount.times(stakeRewardAmount).div(maxStakeAmount);
    }

    return rewardAmount.isNaN() ? 0 : rewardAmount.integerValue(BigNumber.ROUND_FLOOR);
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
          <TimerIcon />
          <Typography>Current Session</Typography>
          <Typography>Open for</Typography>
        </Fragment>
      );
    }

    //return <Typography>Next Session will open soon</Typography>;
    return (
      <Fragment>
        <TrendingUpIcon />
        <Typography>Stake stats</Typography>
        <Typography>so far</Typography>
      </Fragment>
    );
  };

  const toDisplayFormat = val => {
    return new BigNumber(fromWei(val)).toFormat(0, BigNumber.ROUND_FLOOR);
  };

  const NumFormatter = ({ num }) => {
    const numInAGI = new BigNumber(fromWei(num));
    let numToDisplay = 0;
    let textToDisplay = "";
    if (numInAGI.gte(1000000)) {
      textToDisplay = "M+";
      numToDisplay = numInAGI.div(1000000).integerValue(BigNumber.ROUND_FLOOR);
    } else if (numInAGI.gte(1000)) {
      textToDisplay = "K+";
      numToDisplay = numInAGI.div(1000).integerValue(BigNumber.ROUND_FLOOR);
    } else {
      textToDisplay = "";
      numToDisplay = numInAGI.integerValue(BigNumber.ROUND_FLOOR);
    }

    return (
      <Typography className={classes.metricsValue}>
        {numToDisplay.toString()}
        <span>{textToDisplay}</span>
      </Typography>
    );
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

    return (
      <div className={classes.metrics}>
        <div>
          <NumFormatter num={stakeOverallSummary.overallStake} />
          <Typography className={classes.metricsUnit}>Tokens Staked</Typography>
        </div>
        <div>
          <Typography className={classes.metricsValue}>{stakeOverallSummary.totalUniqueStakers}+</Typography>
          <Typography className={classes.metricsUnit}>Stakers</Typography>
        </div>
        <div>
          <Typography className={classes.metricsValue}>{toDisplayFormat(stakeOverallSummary.totalReward)}</Typography>
          <Typography className={classes.metricsUnit}>Token Reward Distributed</Typography>
        </div>
      </div>
    );
  };

  return (
    <Grid container className={classes.bannerContainer}>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.bannerDesFormContainer}>
        <Grid item xs={12} sm={12} md={6} lg={6} className={classes.bannerDescriptionContainer}>
          <Typography className={classes.bannerTitle}>Earn more while holding AGI tokens</Typography>
          <Typography className={classes.bannerDescPara1}>
            By staking AGI tokens, you support the operations of our blockchain network and in doing so you will be
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
                InputProps={{
                  inputProps: { min: 1, max: stakeCalculatorFields.poolStakeAmount },
                  endAdornment: <InputAdornment position="start">agi</InputAdornment>,
                }}
                onChange={handleDataChange}
              />
              <img src={ApproxSymbolImg} alt="Approximate Symbol" />
              <SNETTextfield
                name="userRewardAmount"
                label="Reward Amount"
                extraInfo="~Approximate based on pool size"
                value={getRewardAmount()}
                InputProps={{
                  endAdornment: <InputAdornment position="start">agi</InputAdornment>,
                }}
              />
            </div>
            <div className={classes.stakingDetails}>
              <div>
                <div className={classes.label}>
                  <div className={classes.iconTooltipContainer}>
                    <InfoIcon />
                    <p>Total amount of AGI tokens staked in the pool currently</p>
                  </div>
                  <span>Current Pool Size</span>
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
                <div className={classes.label}>
                  <div className={classes.iconTooltipContainer}>
                    <InfoIcon />
                    <p>
                      Number of AGI tokens that will be divided amongst all stakers as the reward for the current window
                    </p>
                  </div>
                  <span>Reward Pool</span>
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
                <div className={classes.label}>
                  <div className={classes.iconTooltipContainer}>
                    <InfoIcon />
                    <p>Amount of the time that AGI tokens in the stake will be vested and locked in</p>
                  </div>
                  <span>Incubation Period</span>
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
                children="stake & earn tokens"
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
          {/* <TimerIcon /> */}
          <CounterTitle />
        </div>
        <ShowTimer />
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(Banner);
