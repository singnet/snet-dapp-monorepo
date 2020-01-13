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
    if (organization.status === organizationSetupStatuses.APPROVAL_PENDING) {
      history.push(GlobalRoutes.ORG_SETUP_STATUS.path);
    } else if (organization.status === organizationSetupStatuses.PUBLISHED) {
      history.push(OrganizationSetupRoutes.PUBLISH_TO_BLOCKCHAIN.path);
    }
  }, [organization.status, history]);

  const handleFinishLater = async () => {
    await dispatch(organizationActions.finishLater(organization));
  };

  const activeSection = () => {
    const { pathname: path } = location;
    const { ORGANIZATION_PROFILE, REGION, PUBLISH_TO_BLOCKCHAIN } = organizationSetupSections;

    if (path.includes(OrganizationSetupRoutes.ORGANIZATION_PROFILE.path)) {
      return ORGANIZATION_PROFILE;
    } else if (path.includes(OrganizationSetupRoutes.REGION.path)) {
      return REGION;
    } else if (path.includes(OrganizationSetupRoutes.PUBLISH_TO_BLOCKCHAIN.path)) {
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
