import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";

import SNETButton from "shared/dist/components/SNETButton";

import { useStyles } from "./styles";
import { GlobalRoutes } from "../../../GlobalRouter/Routes";

const FAQ = ({ classes, history }) => {
  const navigateToLanding = () => {
    history.push(GlobalRoutes.LANDING.path);
  };
  return (
    <Grid container className={classes.faqContainer}>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.faqSection}>
        <Typography variant="h2">How It Works</Typography>
        <Typography className={classes.faqDesc}>
          Staking is the process of holding funds in a cryptocurrency wallet to support the operations of a blockchain
          network. Essentially, it consists of locking cryptocurrencies to receive rewards. The process relies on users
          participating in blockchain activities through a personal crypto wallet, such as Metamask Wallet. Have
          questions? Browse through these FAQ’s to find answers to commonly asked questions.
        </Typography>
        <SNETButton children="start staking tokens" color="primary" variant="contained" onClick={navigateToLanding} />
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(FAQ);
