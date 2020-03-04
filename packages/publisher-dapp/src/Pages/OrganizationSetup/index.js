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
    if (organization.state.state === organizationSetupStatuses.APPROVAL_PENDING) {
      history.push(GlobalRoutes.ORG_SETUP_STATUS.path.replace(":orgUuid", organization.uuid));
    } else if (organization.state.state === organizationSetupStatuses.PUBLISHED) {
      history.push(GlobalRoutes.SERVICES.path.replace(":orgUuid", organization.uuid));
    }
  }, [organization.state.state, organization.uuid, history]);

  const handleFinishLater = async () => {
    await dispatch(organizationActions.finishLater(organization));
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

  return (
    <div className={classes.organizationSetupContainer}>
      <Heading {...activeSection().heading} />
      <ProgressBar activeSection={activeSection().key} progressText={progressText} />
      <OrganizationSetupRouter handleFinishLater={handleFinishLater} />
    </div>
  );
};

export default withStyles(useStyles)(OrganizationSetup);
