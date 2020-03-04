import React, { useEffect } from "react";
import { onboardingSections, progressText } from "./constant";
import ProgressBar from "shared/dist/components/ProgressBar";
import { withStyles } from "@material-ui/core/styles";
import isEmpty from "lodash/isEmpty";
import { useSelector } from "react-redux";

import { useStyles } from "./styles";
import { OnboardingRoutes } from "./OnboardingRouter/Routes";
import OnboardingRouter from "./OnboardingRouter";
import Heading from "./Heading";
import { organizationSetupStatuses } from "../../Utils/organizationSetup";
import { GlobalRoutes } from "../../GlobalRouter/Routes";

const selectState = state => ({
  email: state.user.email,
  ownerEmail: state.organization.owner,
  orgStatus: state.organization.state.state,
  orgUuid: state.organization.uuid,
});

const Onboarding = ({ location, history, classes }) => {
  const { email, ownerEmail, orgStatus, orgUuid } = useSelector(selectState);

  useEffect(() => {
    if (
      !isEmpty(email) &&
      Boolean(orgUuid) &&
      !isEmpty(ownerEmail) &&
      email === ownerEmail &&
      orgStatus !== organizationSetupStatuses.PUBLISHED
    ) {
      history.push(GlobalRoutes.ORG_SETUP_STATUS.path.replace(":orgUuid", orgUuid));
    }
  });

  useEffect(() => {
    if (orgStatus === organizationSetupStatuses.PUBLISHED) {
      history.push(GlobalRoutes.SERVICES.path.replace(":orgUuid", orgUuid));
    }
  }, [orgStatus, orgUuid, history]);

  const activeSection = () => {
    const { pathname: path } = location;
    const { SINGULARITY_ACCOUNT, ACCEPT_SERVICE_AGREEMENT, AUTHENTICATE_ID } = onboardingSections;

    if (path.includes(OnboardingRoutes.SINGULARITY_ACCOUNT.path)) {
      return SINGULARITY_ACCOUNT;
    } else if (path.includes(OnboardingRoutes.ACCEPT_SERVICE_AGREEMENT.path)) {
      return ACCEPT_SERVICE_AGREEMENT;
    } else if (path.includes(OnboardingRoutes.AUTHENTICATE_ID.path)) {
      return AUTHENTICATE_ID;
    }
    return SINGULARITY_ACCOUNT;
  };

  return (
    <div className={classes.onboardingContainer}>
      <Heading {...activeSection().heading} />
      <ProgressBar activeSection={activeSection().key} progressText={progressText} />
      <OnboardingRouter />
    </div>
  );
};

export default withStyles(useStyles)(Onboarding);
