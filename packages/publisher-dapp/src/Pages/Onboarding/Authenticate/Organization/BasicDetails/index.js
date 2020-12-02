import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import SNETTextField from "shared/dist/components/SNETTextfield";
import AlertText from "shared/dist/components/AlertText";
import { alertTypes } from "shared/dist/components/AlertBox";
import validator from "shared/dist/utils/validator";

import { useStyles } from "../styles";
import { basicDetailsFormData } from "./content";
import { useSelector, useDispatch } from "react-redux";
import { organizationActions } from "../../../../../Services/Redux/actionCreators";
import { ContactsTypes } from "../../../../../Utils/Contacts";
import { orgProfileValidationConstraints } from "../../../../OrganizationSetup/OrganizationProfile/validationConstraints";
import OrganizationIdAvailability from "./OrganizationIdAvailability";
import { userEntities } from "../../../../../Utils/user";
import { organizationTypes } from "../../../../../Utils/organizationSetup";

let validateTimeout = "";
const selectState = state => ({
  userEntity: state.user.entity,
  orgDetails: state.organization,
  isValidateServiceIdLoading: state.loader.validateServiceId.isLoading,
});
const BasicDetails = ({ allowDuns, setAllowDuns, invalidFields }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [websiteValidation, setWebsiteValidation] = useState({});
  const { orgDetails, isValidateOrgIdLoading, userEntity } = useSelector(selectState);
  const contact = orgDetails.contacts.find(el => el.type === ContactsTypes.GENERAL);

  let phone = "";
  if (contact) {
    phone = contact.phone;
  }
  const handleWebsiteValidation = value => {
    const isNotValid = validator.single(value, orgProfileValidationConstraints.website);
    if (isNotValid) {
      return setWebsiteValidation({
        type: alertTypes.ERROR,
        message: `${value} is not a valid URL. URL should start with https:`,
      });
    }
    return setWebsiteValidation({ type: alertTypes.SUCCESS, message: "website is valid" });
  };

  const validateOrgId = orgId => async () => {
    // Call the API to Validate the Org Id
    try {
      const orgAvailability = await dispatch(organizationActions.validateOrgId(orgId));
      dispatch(organizationActions.setOrgAvailability(orgAvailability));
    } catch (error) {
      dispatch(organizationActions.setOrgAvailability(""));
    }
  };
  const debouncedValidate = (newOrgId, timeout = 200) => {
    if (validateTimeout) {
      clearTimeout(validateTimeout);
    }
    validateTimeout = setTimeout(validateOrgId(newOrgId), timeout);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    if (name === basicDetailsFormData.WEBSITE.name) {
      handleWebsiteValidation(value);
    }
    if (name === basicDetailsFormData.ORG_ID.name) {
      debouncedValidate(value);
    }
    dispatch(organizationActions.setOneBasicDetail(name, value));
  };

  const handleContactsChange = event => {
    const { name, value } = event.target;
    const updatedContacts = [...orgDetails.contacts];
    const index = orgDetails.contacts.findIndex(el => el.type === ContactsTypes.GENERAL);
    if (index !== -1) {
      updatedContacts[index] = { ...orgDetails.contacts[index], [name]: value };
    } else {
      updatedContacts[orgDetails.contacts.length] = { type: ContactsTypes.GENERAL, [name]: value };
    }
    dispatch(organizationActions.setContacts(updatedContacts));
  };
  return (
    <Grid container>
      {userEntity !== userEntities.INDIVIDUAL && orgDetails.type !== organizationTypes.INDIVIDUAL ? (
        <Fragment>
          <SNETTextField
            {...basicDetailsFormData.ORG_ID}
            value={orgDetails.id}
            onChange={handleChange}
            error={!!invalidFields ? "id" in invalidFields : ""}
          />
          <OrganizationIdAvailability
            orgDetails={orgDetails}
            id={orgDetails.id}
            availability={orgDetails.availability}
            classes={classes}
            loading={isValidateOrgIdLoading}
          />
        </Fragment>
      ) : null}

      <SNETTextField
        {...basicDetailsFormData.ORGANIZATION_NAME}
        value={orgDetails.name}
        minCount={orgDetails.name.length}
        maxCount={50}
        onChange={handleChange}
        error={!!invalidFields ? "name" in invalidFields : ""}
      />
      {userEntity !== userEntities.INDIVIDUAL && orgDetails.type !== organizationTypes.INDIVIDUAL ? (
        <div className={classes.dunsContainer}>
          <FormControlLabel
            control={<Checkbox color="primary" checked={allowDuns} onChange={e => setAllowDuns(e.target.checked)} />}
            label="I have my DUNS number"
          />
          <SNETTextField
            {...basicDetailsFormData.DUNS}
            value={orgDetails.duns}
            onChange={handleChange}
            disabled={!allowDuns}
          />
        </div>
      ) : null}
      <div className={classes.websiteUrlContainer}>
        <SNETTextField {...basicDetailsFormData.WEBSITE} value={orgDetails.website} onChange={handleChange} />
        <AlertText type={websiteValidation.type} message={websiteValidation.message} />
      </div>
      <SNETTextField {...basicDetailsFormData.PHONE} value={phone} onChange={handleContactsChange} />
      {userEntity === userEntities.INDIVIDUAL || orgDetails.type === organizationTypes.INDIVIDUAL ? (
        <React.Fragment>
          <SNETTextField
            {...basicDetailsFormData.REGISTRATION_ID_TYPE}
            value={orgDetails.registrationType}
            onChange={handleChange}
          />
          <SNETTextField
            {...basicDetailsFormData.REGISTRATION_ID}
            value={orgDetails.registrationId}
            onChange={handleChange}
          />
        </React.Fragment>
      ) : null}
    </Grid>
  );
};

BasicDetails.propTypes = {
  basicDetails: PropTypes.shape({
    name: PropTypes.string,
    duns: PropTypes.string,
    website: PropTypes.string,
    phone: PropTypes.string,
  }),
};

export default BasicDetails;
