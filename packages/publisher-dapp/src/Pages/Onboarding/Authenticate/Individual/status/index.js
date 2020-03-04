import React from "react";
// import { useSelector } from "react-redux";
import { withStyles } from "@material-ui/styles";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { useStyles } from "./styles";
import { individualVerificationStatusList } from "../../../constant";
import Pending from "./Pending";
import Denied from "./Denied";
import Approved from "./Approved";
import RelatedLinks from "./RelatedLinks";

const StatusComponents = {
  [individualVerificationStatusList.PENDING]: Pending,
  [individualVerificationStatusList.APPROVED]: Approved,
  [individualVerificationStatusList.DENIED]: Denied,
};

const IndividualStatus = ({ classes }) => {
  // const status = useSelector(state => state.user.individualVerificationStatus);
  const status = individualVerificationStatusList.DENIED;

  const Component = StatusComponents[status];

  if (Component) {
    return (
      <Grid container spacing={24} className={classes.individualStatusContainer}>
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.description}>
          <Typography variant="h3">Welcome to the AI Publisher</Typography>
          <Typography>
            With this pubilsher portal, you can publish and manage yourAI services. You will be able to edit your
            services, demos, and tutorial content.
          </Typography>
        </Grid>
        <Component />
        <RelatedLinks />
      </Grid>
    );
  }

  return <div>Status not available</div>;
};

export default withStyles(useStyles)(IndividualStatus);
