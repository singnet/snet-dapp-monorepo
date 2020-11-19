import React, { Fragment } from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";
import Notification from "../../Components/Notification";

import StakeTab from "../../Components/StakeTab";

const RFAILanding = ({ classes }) => {
  return (
    <Fragment>
      <div className={classes.notificationContainer}>
        <Notification />
      </div>
      <hr className={classes.divider} />
      <div className={classes.LandingContainer}>
        <div className={classes.mainWrapper}>
          <Grid container spacing={24} className={classes.topSectionCotainer}>
            <Grid item xs={12} sm={3} md={3} lg={3} className={classes.titleContainer}>
              <Typography variant="h3">Staking</Typography>
            </Grid>
          </Grid>
          <div>
            <StakeTab />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default withStyles(useStyles)(RFAILanding);
