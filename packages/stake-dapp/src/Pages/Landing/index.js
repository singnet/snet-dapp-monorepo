import React, { Fragment } from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";

import { useStyles } from "./styles";
import Notification from "../../Components/Notification";
import NotificationBar, { notificationBarTypes } from "shared/dist/components/NotificationBar";

import StakeTab from "../../Components/StakeTab";

const RFAILanding = ({ classes }) => {
  const generateNotificationMessage = () => {
    return (
      <p>
        Auto <span>renewal </span>options are currently avaliable in your{" "}
        <a href="#" alt="Incubation">
          Incubation.{" "}
        </a>
        For more information visit the{" "}
        <a href="/faq" alt="FAQ">
          FAQ.
        </a>{" "}
      </p>
    );
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
            <Grid item xs={12} sm={9} md={9} lg={9}>
              <NotificationBar
                type={notificationBarTypes.REMINDER}
                message={generateNotificationMessage()}
                icon={NotificationsActiveIcon}
                showNotification={true}
              />
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
