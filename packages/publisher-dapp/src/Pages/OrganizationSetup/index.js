import React, { useEffect } from "react";
import { progressText, organizationSetupSections } from "./constant";
import ProgressBar from "shared/dist/components/ProgressBar";
import { withStyles } from "@material-ui/core/styles";

import { OrganizationSetupRoutes } from "./OrganizationSetupRouter/Routes";
import OrganizationSetupRouter from "./OrganizationSetupRouter";
import Heading from "./Heading";
import { useStyles } from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { organizationActions } from "../../Services/Redux/actionCreators";
import { organizationSetupStatuses } from "../../Utils/organizationSetup";
import { GlobalRoutes } from "../../GlobalRouter/Routes";

const OrganizationSetup = ({ classes, location, history }) => {
  const organization = useSelector(state => state.organization);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      organization.state.state === organizationSetupStatuses.APPROVAL_PENDING ||
      organization.state.state === organizationSetupStatuses.ONBOARDING
    ) {
      history.push(GlobalRoutes.ORG_SETUP_STATUS.path.replace(":orgUuid", organization.uuid));
    }
  }, [organization.state.state, organization.uuid, history]);

  const handleFinishLater = async () => {
    await dispatch(organizationActions.finishLater(organization));
    if (organization.foundInBlockchain) {
      return history.push(GlobalRoutes.SERVICES.path.replace(":orgUuid", organization.uuid));
    }
    history.push(GlobalRoutes.ORG_SETUP_STATUS.path.replace(":orgUuid", organization.uuid));
  };

  const activeSection = () => {
    const { pathname: path } = location;
    const { ORGANIZATION_PROFILE, REGION, PUBLISH_TO_BLOCKCHAIN } = organizationSetupSections;
    if (path.includes(path.match(OrganizationSetupRoutes.ORGANIZATION_PROFILE.match))) {
      return ORGANIZATION_PROFILE;
    } else if (path.includes(path.match(OrganizationSetupRoutes.REGION.match))) {
      return REGION;
    } else if (path.includes(path.match(OrganizationSetupRoutes.PUBLISH_TO_BLOCKCHAIN.match))) {
      return PUBLISH_TO_BLOCKCHAIN;
    }
    return ORGANIZATION_PROFILE;
  };

  const handleSectionClick = progressNumber => {
    const clickedSection = Object.values(organizationSetupSections).find(el => el.key === progressNumber);
    if (clickedSection) {
      history.push(clickedSection.route.path.replace(":orgUuid", organization.uuid));
    }
  };

  return (
    <div className={classes.organizationSetupContainer}>
      <Heading {...activeSection().heading} />
      <ProgressBar
        activeSection={activeSection().key}
        progressText={progressText}
        onSectionClick={progressNumber => handleSectionClick(progressNumber)}
      />
      <OrganizationSetupRouter handleFinishLater={handleFinishLater} />
    </div>
  );
};

export default withStyles(useStyles)(OrganizationSetup);
