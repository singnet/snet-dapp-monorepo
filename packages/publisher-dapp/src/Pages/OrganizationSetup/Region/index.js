import React, { Fragment, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import { useStyles } from "./styles";
import SNETButton from "shared/dist/components/SNETButton";
import { OrganizationSetupRoutes } from "../OrganizationSetupRouter/Routes";
import Settings from "./Settings";
import { useSelector } from "react-redux";
import validator from "shared/dist/utils/validator";
import { orgSetupRegionValidationConstraints } from "./validationConstraints";
import AlertBox, { alertTypes } from "shared/dist/components/AlertBox";

const Region = ({ history, classes, handleFinishLater }) => {
  const [alert, setAlert] = useState({});
  const organization = useSelector(state => state.organization);
  const { groups } = organization;

  const handleContinue = () => {
    const isNotValid = validator(organization, orgSetupRegionValidationConstraints);
    if (isNotValid) {
      return setAlert({ type: alertTypes.ERROR, message: isNotValid[0] });
    }
    history.push(OrganizationSetupRoutes.PUBLISH_TO_BLOCKCHAIN.path.replace("orgUuid", organization.uuid));
  };

  const handleBack = () => {
    history.push(OrganizationSetupRoutes.ORGANIZATION_PROFILE.path.replace("orgUuid", organization.uuid));
  };

  return (
    <Fragment>
      <div className={classes.box}>
        <Typography variant="h6">Region Groups Configuration</Typography>
        <Typography variant="subtitle2">
          Every AI service your company publishes can be optimized for users based in various regions and groups. You
          will be able to configure this during the AI service level.
        </Typography>
        {groups.map((group, index) => (
          <Settings groups={groups} groupIndex={index} group={group} key={group.id} />
        ))}
        <AlertBox type={alert.type} message={alert.message} />
      </div>
      <div className={classes.buttonsContainer}>
        <SNETButton color="primary" children="finish later" onClick={handleFinishLater} />
        <SNETButton color="primary" children="back" onClick={handleBack} />
        <SNETButton color="primary" variant="contained" children="continue" onClick={handleContinue} />
      </div>
    </Fragment>
  );
};

export default withStyles(useStyles)(Region);
