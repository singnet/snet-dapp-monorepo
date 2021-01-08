import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";

import { GlobalRoutes } from "../../GlobalRouter/Routes";
import { useStyles } from "./styles";
import Notification from "../../Components/Notification";
import NotificationBar, { notificationBarTypes } from "shared/dist/components/NotificationBar";

import StakeTab from "../../Components/StakeTab";

const stateSelector = state => ({
  incubationStakes: state.stakeReducer.incubationStakes,
});

const RFAILanding = ({ classes }) => {
  const currentTime = moment().unix();

  const { incubationStakes } = useSelector(state => stateSelector(state));

  const generateNotificationMessage = () => {
    return (
      <p>
        <span>Auto renewal </span>options are currently avaliable in your Incubation. For more information visit the{" "}
        <a href={GlobalRoutes.FAQ.path} alt="FAQ" target="_blank" rel="noopener noreferrer">
          FAQ.
        </a>{" "}
      </p>
    );
  };

  const ShowAutoRewalNotification = () => {
    let displayMsg = false;
    if (incubationStakes) {
      for (var i = 0; i < incubationStakes.length; i++) {
        if (
          currentTime >= incubationStakes[i].requestWithdrawStartPeriod &&
          currentTime <= incubationStakes[i].endPeriod
        ) {
          displayMsg = true;
          break;
        }
      }
    }

    if (displayMsg) {
      return (
        <Grid item xs={12} sm={9} md={9} lg={9}>
          <NotificationBar
            type={notificationBarTypes.REMINDER}
            message={generateNotificationMessage()}
            icon={NotificationsActiveIcon}
            showNotification={true}
          />
        </Grid>
      );
    }
    return null;
  };

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
            <ShowAutoRewalNotification />
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
