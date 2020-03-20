import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";

import SNETButton from "shared/dist/components/SNETButton";

import ComputeMailsImage from "shared/dist/assets/images/ComputeMails.png";
import BankImage from "shared/dist/assets/images/bank.png";
import PiggyBankImage from "shared/dist/assets/images/piggyBank.png";
import CalculatorImage from "shared/dist/assets/images/calculator.png";

import Banner from "./Banner";
import Benefits from "./Benefits";
import { useStyles } from "./styles";
import { GlobalRoutes } from "../../GlobalRouter/Routes";
import { stakeActions } from "../../Services/Redux/actionCreators";

const HowItWorks = ({ classes, history }) => {
  const dispatch = useDispatch();

  const { recentStakeWindow } = useSelector(state => state.stakeReducer);

  useEffect(() => {
    dispatch(stakeActions.fetchRecentStakeWindowFromBlockchain());
  }, [dispatch]);

  const navigateToLanding = () => {
    history.push(GlobalRoutes.LANDING.path);
  };

  return (
    <Grid container className={classes.howItWorksContainer}>
      <Banner recentStakeWindow={recentStakeWindow} />
      <Benefits />
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.signUpContainer}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography variant="h2">Subscribe for Staking Updates</Typography>
          <Typography>Get notified by email when the next staking window is open - Don’t miss out!</Typography>
          <form>
            <input type="text" />
            <SNETButton children="subscribe" color="primary" variant="contained" />
          </form>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <img src={ComputeMailsImage} alt="Computer And Mails" />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.howItWorksSection}>
        <Typography variant="h2">How It Works</Typography>
        <Typography className={classes.howItWorksDesc}>
          Staking is the process of holding funds in a cryptocurrency wallet to support the operations of a blockchain
          network. Essentially, it consists of locking cryptocurrencies to receive rewards. The process relies on users
          participating in blockchain activities through a personal crypto wallet, such as Metamask Wallet.
        </Typography>
        <img src="http://placehold.it/738x416" alt="Youtube Video" />
        <SNETButton children="start staking tokens" color="primary" variant="contained" onClick={navigateToLanding} />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.titlesContainer}>
        <ul className={classes.titlesContainer}>
          <li>
            <img src={BankImage} alt="Bank" />
            <Typography variant="h4">What is Staking</Typography>
            <Typography>
              Learn more about how staking works in our ecosystem of products and why staking your AGI tokens is
              important for the AI community.
            </Typography>
          </li>
          <li>
            <img src={PiggyBankImage} alt="Piggy Bank" />
            <Typography variant="h4">Stages of Staking</Typography>
            <Typography>
              Learn more about the stages of the staking process and what happens to your AGI tokens whilst they are
              staked.
            </Typography>
          </li>
          <li>
            <img src={CalculatorImage} alt="Calculator" />
            <Typography variant="h4">Auto Renewing Stakes</Typography>
            <Typography>
              Learn how to become a priority staker by auto renewing your stakes, as well as how you can save on
              transaction fees (ETH gas).
            </Typography>
          </li>
        </ul>
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(HowItWorks);
