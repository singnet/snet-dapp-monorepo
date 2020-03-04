import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";

import RelatedLinks from "./RelatedLinks";
import { useStyles } from "./styles";
import VerificationPending from "./VerificationPending";
import { useSelector } from "react-redux";
import VerificationApproved from "./VerificationApproved";
import { organizationSetupStatuses } from "../../Utils/organizationSetup";
import VerificationRejected from "./VerificationRejected";

const Banners = {
  [organizationSetupStatuses.APPROVAL_PENDING]: VerificationPending,
  [organizationSetupStatuses.ONBOARDING_APPROVED]: VerificationApproved,
  [organizationSetupStatuses.APPROVED]: VerificationApproved,
  [organizationSetupStatuses.REJECTED]: VerificationRejected,
};

const OrgSetupStatus = ({ classes }) => {
  const status = useSelector(state => state.organization.state.state);

  const CurrentStatus = Banners[status];

  return (
    <Grid container spacing={24} className={classes.OrgSetupStatusContainer}>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.description}>
        <Typography variant="h3">Welcome to the AI Publisher</Typography>
        <Typography>
          With this pubilsher portal, you can publish and manage yourAI services. You will be able to edit your
          services, demos, and tutorial content.
        </Typography>
      </Grid>
      {CurrentStatus ? <CurrentStatus /> : null}
      <RelatedLinks />
    </Grid>
  );
};

export default withStyles(useStyles)(OrgSetupStatus);
