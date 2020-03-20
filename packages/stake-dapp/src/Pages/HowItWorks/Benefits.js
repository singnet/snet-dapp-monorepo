import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";
import CheckIcon from "@material-ui/icons/CheckCircle";

import SNETButton from "shared/dist/components/SNETButton";

import benefitsImage from "shared/dist/assets/images/benefits.png";
import { useStyles } from "./styles";

const Benefits = ({ classes }) => {
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.benefitsContainer}>
        <Grid item xs={12} sm={12} md={6} lg={6} className={classes.benefitsMedia}>
          <img src={benefitsImage} alt="Benefits" />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} className={classes.benefitsContent}>
          <Typography variant="h2">Benefits of Staking AGI tokens</Typography>
          <ul>
            <li>
              <CheckIcon />
              <div>
                <Typography>Support the Platform: </Typography>
                <Typography>
                  Take an active part in the platform operations by helping fulfill AI Marketplace transactions.
                </Typography>
              </div>
            </li>
            <li>
              <CheckIcon />
              <div>
                <Typography>Support Adoption: </Typography>
                <Typography>
                  Staked tokens will allow ordinary everyday businesses to use the marketplace through a fiat gateway,
                  greatly improving platform adoption.
                </Typography>
              </div>
            </li>
            <li>
              <CheckIcon />
              <div>
                <Typography>Earn Rewards: </Typography>
                <Typography>Earn more AGI tokens in reward for putting your token to use.</Typography>
              </div>
            </li>
          </ul>
          <SNETButton
            children="learn more"
            variant="outlined"
            color="primary"
            href="https://dev.singularitynet.io/products/staking"
            target="_new"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(Benefits);
