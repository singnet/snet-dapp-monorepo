import React, { Component } from "react";
import { onboardingSections, progressText } from "./constant";
import ProgressBar from "shared/dist/components/ProgressBar";
import { withStyles } from "@material-ui/core/styles";
import isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";

import { useStyles } from "./styles";
import { OnboardingRoutes } from "./OnboardingRouter/Routes";
import OnboardingRouter from "./OnboardingRouter";
import Heading from "./Heading";
import { organizationSetupStatuses, organizationTypes } from "../../Utils/organizationSetup";
import { GlobalRoutes } from "../../GlobalRouter/Routes";
import { AuthenticateRoutes } from "./Authenticate/AuthenitcateRouter/Routes";
import { memberStatus } from "../../Utils/TeamMembers";

class Onboarding extends Component {
  navigateToAppropriatePage = () => {
    const {
      email,
      ownerEmail,
      orgStatus,
      orgUuid,
      orgType,
      location,
      history,
      publisherTnC,
      allowChangeRequestEdit,
      orgMembershipStatus,
    } = this.props;

    const userAllowedToProceed = () => {
      const isUserTheOwner = !isEmpty(ownerEmail) && email === ownerEmail;
      const userAcceptedInvitation = orgMembershipStatus && orgMembershipStatus !== memberStatus.PENDING;
      return isUserTheOwner || userAcceptedInvitation;
    };

    if (!isEmpty(email) && Boolean(orgUuid) && userAllowedToProceed()) {
      if (orgType === organizationTypes.INDIVIDUAL) {
        if (
          orgStatus === organizationSetupStatuses.PUBLISHED ||
          orgStatus === organizationSetupStatuses.PUBLISH_IN_PROGRESS
        ) {
          return history.push(GlobalRoutes.SERVICES.path.replace(":orgUuid", orgUuid));
        } else if (location.pathname !== AuthenticateRoutes.INDIVIDUAL.path) {
          return history.push(AuthenticateRoutes.INDIVIDUAL.path);
        }
      } else if (orgType === organizationTypes.ORGANIZATION) {
        if (orgStatus === organizationSetupStatuses.CHANGE_REQUESTED && allowChangeRequestEdit) {
          if (location.pathname !== AuthenticateRoutes.ORGANIZATION.path) {
            return history.push(AuthenticateRoutes.ORGANIZATION.path);
          }
          return;
        } else if (
          orgStatus === organizationSetupStatuses.PUBLISHED ||
          orgStatus === organizationSetupStatuses.PUBLISH_IN_PROGRESS
        ) {
          return history.push(GlobalRoutes.SERVICES.path.replace(":orgUuid", orgUuid));
        }
        history.push(GlobalRoutes.ORG_SETUP_STATUS.path.replace(":orgUuid", orgUuid));
      }
    } else if (publisherTnC.accepted) {
      return history.push(OnboardingRoutes.SINGULARITY_ACCOUNT.path);
    }
  };

  componentDidMount = () => {
    this.navigateToAppropriatePage();
  };

  componentDidUpdate = prevProps => {
    const { email, ownerEmail, orgStatus, orgUuid, orgType } = this.props;
    if (
      prevProps.email !== email ||
      prevProps.ownerEmail !== ownerEmail ||
      prevProps.orgStatus !== orgStatus ||
      prevProps.orgUuid !== orgUuid ||
      prevProps.orgType !== orgType
    ) {
      this.navigateToAppropriatePage();
    }
  };

  activeSection = () => {
    const { pathname: path } = this.props.location;
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

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.onboardingContainer}>
        <Heading {...this.activeSection().heading} />
        <ProgressBar activeSection={this.activeSection().key} progressText={progressText} />
        <OnboardingRouter />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  email: state.user.email,
  ownerEmail: state.organization.owner,
  orgStatus: state.organization.state.state,
  orgUuid: state.organization.uuid,
  orgType: state.organization.type,
  publisherTnC: state.user.publisherTnC,
  allowChangeRequestEdit: state.organization.allowChangeRequestEdit,
  orgMembershipStatus: state.organization.membershipDetails.status,
});

export default withStyles(useStyles)(connect(mapStateToProps)(Onboarding));
