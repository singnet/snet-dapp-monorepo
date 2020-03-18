import React, { Fragment, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";

import BasicDetails from "./BasicDetails";
import OrgImg from "./OrgImg";
import SupportDetails from "./SupportDetails";
import { useStyles } from "./styles";
import SNETButton from "shared/dist/components/SNETButton";
import { OrganizationSetupRoutes } from "../OrganizationSetupRouter/Routes";
import AlertBox, { alertTypes } from "shared/dist/components/AlertBox";
import ValidationError from "shared/dist/utils/validationError";
import validator from "shared/dist/utils/validator";
import { orgProfileValidationConstraints, errorMsg, contactConstraints } from "./validationConstraints";
import { ContactsTypes } from "../../../Utils/Contacts";

const OrganizationProfile = ({ classes, history, handleFinishLater }) => {
  const organization = useSelector(state => state.organization);
  const [alert, setAlert] = useState({});

  const validateForm = () => {
    let isNotValid = validator(organization, orgProfileValidationConstraints);
    if (isNotValid) {
      return isNotValid;
    }
    const supportContacts = organization.contacts.find(el => el.type === ContactsTypes.SUPPORT);
    if (supportContacts) {
      if (Boolean(supportContacts.email)) {
        isNotValid = validator.single(supportContacts.email, contactConstraints.email);
      }
      if (Boolean(supportContacts.phone)) {
        isNotValid = validator.single(supportContacts.email, contactConstraints.phone);
      }
    }

    return isNotValid;
  };

  const handleContinue = () => {
    const isNotValid = validateForm();
    if (isNotValid) {
      return setAlert({ type: alertTypes.ERROR, message: isNotValid[0] });
    }
    if (!organization.assets.heroImage.raw && !organization.assets.heroImage.url) {
      return setAlert({ type: alertTypes.ERROR, message: errorMsg.IMAGE_NOT_FOUND });
    }

    history.push(OrganizationSetupRoutes.REGION.path.replace(":orgUuid", organization.uuid));
  };

  const onFinishLater = async () => {
    try {
      setAlert({});
      await handleFinishLater();
      setAlert({ type: alertTypes.SUCCESS, message: "Changes have been saved to draft" });
    } catch (error) {
      if (error instanceof ValidationError) {
        return setAlert({ type: alertTypes.ERROR, message: error.message });
      }
      setAlert({ type: alertTypes.ERROR, message: "Unable to save draft. Please try later" });
    }
  };

  return (
    <Fragment>
      <Grid className={classes.box}>
        <Typography variant="h6">Organization Profile</Typography>
        <BasicDetails />
        <OrgImg />
        <hr />
        <SupportDetails />
        {alert.message ? (
          <div className={classes.errorContainer}>
            <AlertBox type={alert.type} message={alert.message} />
          </div>
        ) : null}
      </Grid>
      <div className={classes.buttonsContainer}>
        <SNETButton color="primary" children="finish later" onClick={onFinishLater} />
        <SNETButton color="primary" variant="contained" children="continue" onClick={handleContinue} />
      </div>
    </Fragment>
  );
};

export default withStyles(useStyles)(OrganizationProfile);
