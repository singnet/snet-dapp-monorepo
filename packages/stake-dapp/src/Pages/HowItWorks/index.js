import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";

import SNETTextfield from "shared/dist/components/SNETTextfield";
import SNETButton from "shared/dist/components/SNETButton";

import ComputeMailsImage from "shared/dist/assets/images/ComputeMails.png";
import BankImage from "shared/dist/assets/images/bank.png";
import PiggyBankImage from "shared/dist/assets/images/piggyBank.png";
import CalculatorImage from "shared/dist/assets/images/calculator.png";

import Banner from "./Banner";
import Benefits from "./Benefits";
import FAQ from "./FAQ";
import { useStyles } from "./styles";
import { stakeActions } from "../../Services/Redux/actionCreators";

const stateSelector = state => ({
  recentStakeWindow: state.stakeReducer.recentStakeWindow,
  stakeOverallSummary: state.stakeReducer.stakeOverallSummary,
});

const HowItWorks = ({ classes }) => {
  const dispatch = useDispatch();

  const { recentStakeWindow, stakeOverallSummary } = useSelector(state => stateSelector(state));

  useEffect(() => {
    //dispatch(stakeActions.fetchRecentStakeWindowFromBlockchain());
    dispatch(stakeActions.fetchStakeCalculatorDetails());
    dispatch(stakeActions.fetchStakeOverallSummary());
  }, [dispatch]);

  return (
    <Grid container className={classes.howItWorksContainer}>
      <Banner recentStakeWindow={recentStakeWindow} stakeOverallSummary={stakeOverallSummary} />
      <Benefits />
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.signUpContainer}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography variant="h2">Subscribe for Staking Updates</Typography>
          <Typography>Get notified by email when the next staking window is open - Don’t miss out!</Typography>
          <form
            action="https://singularitynet.us16.list-manage.com/subscribe/post?u=d74195510c25bf501caf3011d&id=a804df2efd"
            method="post"
            target="_blank"
            name="mc-embedded-subscribe-form"
            noValidate=""
          >
            <SNETTextfield name="EMAIL" label="email" />
            <SNETButton type="submit" children="subscribe" color="primary" variant="contained" />
          </form>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <img src={ComputeMailsImage} alt="Computer And Mails" />
        </Grid>
      </Grid>
      <FAQ />
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.titlesContainer}>
        <ul className={classes.titlesContainer}>
          <li>
            <a
              href="https://dev.singularitynet.io/products/staking/"
              rel="noopener noreferrer"
              target="_blank"
              className={classes.titlesContainer}
            >
              <img src={BankImage} alt="Bank" />
              <Typography variant="h4">What is Staking</Typography>
              <Typography>
                Learn more about how staking works in our ecosystem of products and why staking your AGI tokens is
                important for the AI community.
              </Typography>
            </a>
          </li>
          <li>
            <a
              href="https://dev.singularitynet.io/products/stake-timeline/"
              rel="noopener noreferrer"
              target="_blank"
              className={classes.titlesContainer}
            >
              <img src={PiggyBankImage} alt="Piggy Bank" />
              <Typography variant="h4">Stages of Staking</Typography>
              <Typography>
                Learn more about the stages of the staking process and what happens to your AGI tokens whilst they are
                staked.
              </Typography>
            </a>
          </li>
          <li>
            <a
              href="https://dev.singularitynet.io/products/stake-opt-out/"
              rel="noopener noreferrer"
              target="_blank"
              className={classes.titlesContainer}
            >
              <img src={CalculatorImage} alt="Calculator" />
              <Typography variant="h4">Auto Renewing Stakes</Typography>
              <Typography>
                Learn how to become a priority staker by auto renewing your stakes, as well as how you can save on
                transaction fees (ETH gas).
              </Typography>
            </a>
          </li>
        </ul>
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(HowItWorks);
