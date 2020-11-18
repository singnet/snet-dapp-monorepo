import React from "react";
import { useSelector } from "react-redux";

import moment from "moment";
import BigNumber from "bignumber.js";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";
import InfoIcon from "@material-ui/icons/Info";

import TokenStakedImg from "shared/dist/assets/images/tokenStaked.png";
// import StakersImg from "shared/dist/assets/images/Stakers.png";
import TokenRewardDistributedImg from "shared/dist/assets/images/rewardDistributed.png";

import { useStyles } from "./styles";
import { fromWei } from "../../Utils/GenHelperFunctions";

const stateSelector = state => ({
  stakeOverallSummary: state.stakeReducer.stakeOverallSummary,
  stakeWindowsSummary: state.stakeReducer.stakeWindowsSummary,
});

const StakeSummary = ({ classes }) => {
  const { stakeOverallSummary, stakeWindowsSummary } = useSelector(state => stateSelector(state));

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
      <Typography>
        {numToDisplay.toString()}
        <span>{textToDisplay}</span>
      </Typography>
    );
  };

  return (
    <div className={classes.stakeSummaryContainer}>
      <Typography className={classes.stakeSummaryTitle}>Stake Summary</Typography>

      <Grid container className={classes.stakeSummaryDetails}>
        <Grid item xs={12} sm={4} md={4} lg={4}>
          <div className={classes.stakeSummaryIcon}>
            <img src={TokenStakedImg} alt="Tokens Staked" />
          </div>
          <div className={classes.stakeSummaryValues}>
            <NumFormatter num={stakeOverallSummary.overallStake} />
            <Typography>token staked</Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4}>
          <div className={classes.stakeSummaryIcon}>{/* <img src={StakersImg} alt="Stakers" /> */}</div>
          <div className={classes.stakeSummaryValues}>
            <Typography>
              {stakeOverallSummary.totalUniqueStakers}
              <span>+</span>
            </Typography>
            <Typography>stakers</Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4}>
          <div className={classes.stakeSummaryIcon}>
            <img src={TokenRewardDistributedImg} alt="Token Reward Distributed" />
          </div>
          <div className={classes.stakeSummaryValues}>
            <Typography>
              {toDisplayFormat(stakeOverallSummary.totalReward)}
              <span>+</span>
            </Typography>
            <Typography>token rewards distributed</Typography>
          </div>
        </Grid>
      </Grid>

      {stakeWindowsSummary.map(stakeWindow => (
        <div key={stakeWindow.stakeMapIndex} className={classes.stakeSessionContainer}>
          <Typography className={classes.stakeSessionHeader}>
            Stake Session - {moment.unix(stakeWindow.startPeriod).format("MMM YYYY")} #{stakeWindow.stakeMapIndex}
          </Typography>
          <div className={classes.stakeSessionDetails}>
            <Grid container>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <div className={classes.iconTooltipContainer}>
                  <div className={classes.toolTipContainer}>
                    <InfoIcon />
                    <Typography>The number of people who have contributed AGI tokens to this stake session</Typography>
                  </div>
                  <Typography className={classes.title}>Stakers</Typography>
                </div>
                <div className={classes.stakeSessionValues}>
                  <Typography className={classes.value}>{stakeWindow.numOfStakers}</Typography>
                  <Typography className={classes.unit}>people</Typography>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <div className={classes.iconTooltipContainer}>
                  <div className={classes.toolTipContainer}>
                    <InfoIcon />
                    <Typography>The total amount of AGI tokens that have been contributed by all stakers</Typography>
                  </div>
                  <Typography className={classes.title}>Final Pool Size</Typography>
                </div>
                <div className={classes.stakeSessionValues}>
                  <Typography className={classes.value}>{toDisplayFormat(stakeWindow.windowTotalStake)}</Typography>
                  <Typography className={classes.unit}>AGI</Typography>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <div className={classes.iconTooltipContainer}>
                  <div className={classes.toolTipContainer}>
                    <InfoIcon />
                    <Typography>
                      Number of AGI tokens that will be divided amongst all stakers as the reward for the current window
                    </Typography>
                  </div>
                  <Typography className={classes.title}>Reward Pool</Typography>
                </div>
                <div className={classes.stakeSessionValues}>
                  <Typography className={classes.value}>{toDisplayFormat(stakeWindow.rewardAmount)}</Typography>
                  <Typography className={classes.unit}>AGI</Typography>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <div className={classes.iconTooltipContainer}>
                  <div className={classes.toolTipContainer}>
                    <InfoIcon />
                    <Typography>The stake period completion date</Typography>
                  </div>
                  <Typography className={classes.title}>Closed Date</Typography>
                </div>
                <div className={classes.stakeSessionValues}>
                  <Typography className={classes.value}>
                    {moment.unix(stakeWindow.endPeriod).format("DD MMM YYYY")}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      ))}
    </div>
  );
};

export default withStyles(useStyles)(StakeSummary);
