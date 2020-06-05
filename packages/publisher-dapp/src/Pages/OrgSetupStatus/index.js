import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";

import RelatedLinks from "./RelatedLinks";
import { useStyles } from "./styles";
import VerificationPending from "./VerificationPending";
import { useDispatch, useSelector } from "react-redux";
import VerificationApproved from "./VerificationApproved";
import { organizationSetupStatuses } from "../../Utils/organizationSetup";
import VerificationRejected from "./VerificationRejected";
import { GlobalRoutes } from "../../GlobalRouter/Routes";
import VerificationChangeRequested from "./VerificationChangeRequested";
import { orgVerificationActions } from "../../Services/Redux/actionCreators/userActions";

const Banners = {
  [organizationSetupStatuses.APPROVAL_PENDING]: VerificationPending,
  [organizationSetupStatuses.ONBOARDING]: VerificationPending,
  [organizationSetupStatuses.ONBOARDING_APPROVED]: VerificationApproved,
  [organizationSetupStatuses.APPROVED]: VerificationApproved,
  [organizationSetupStatuses.ONBOARDING_REJECTED]: VerificationRejected,
  [organizationSetupStatuses.REJECTED]: VerificationRejected,
  [organizationSetupStatuses.CHANGE_REQUESTED]: VerificationChangeRequested,
};

const selectState = state => ({
  status: state.organization.state.state,
  uuid: state.organization.uuid,
});

const OrgSetupStatus = ({ classes, history }) => {
  const { status, uuid } = useSelector(selectState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      status === organizationSetupStatuses.ONBOARDING_REJECTED ||
      status === organizationSetupStatuses.CHANGE_REQUESTED
    ) {
      dispatch(orgVerificationActions.getVerificationStatus(uuid));
    }
  }, [dispatch, status, uuid]);

  useEffect(() => {
    if (status === organizationSetupStatuses.PUBLISHED || status === organizationSetupStatuses.PUBLISH_IN_PROGRESS) {
      history.push(GlobalRoutes.SERVICES.path.replace(":orgUuid", uuid));
    }
  }, [history, status, uuid]);

  const CurrentStatus = Banners[status];

  return (
    <Grid container className={classes.OrgSetupStatusContainer}>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.description}>
        <Typography variant="h3">Welcome to the AI Publisher</Typography>
        <Typography>With this publisher portal, you can publish and manage your AI services</Typography>
      </Grid>
      {CurrentStatus ? <CurrentStatus /> : null}
      <RelatedLinks />
    </Grid>
  );
};

export default withStyles(useStyles)(OrgSetupStatus);
