import React, { useState } from "react";
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

const BasicDetails = () => {
  const classes = useStyles();
  const { id, name, website, duns, contacts } = useSelector(state => state.organization);
  const contact = contacts.find(el => el.type === ContactsTypes.GENERAL);
  let phone = "";
  if (contact) {
    phone = contact.phone;
  }
  const [websiteValidation, setWebsiteValidation] = useState({});

  const handleWebsiteValidation = value => {
    const isNotValid = validator.single(value, orgProfileValidationConstraints.website);
    if (isNotValid) {
      return setWebsiteValidation({ type: alertTypes.ERROR, message: `${value} is not a valid URL` });
    }
    return setWebsiteValidation({ type: alertTypes.SUCCESS, message: "website is valid" });
  };

  const dispatch = useDispatch();

  const handleChange = event => {
    const { name, value } = event.target;
    if (name === basicDetailsFormData.WEBSITE.name) {
      handleWebsiteValidation(value);
    }
    dispatch(organizationActions.setOneBasicDetail(name, value));
  };

  const handleContactsChange = event => {
    const { name, value } = event.target;
    const updatedContacts = [...contacts];
    const index = contacts.findIndex(el => el.type === ContactsTypes.GENERAL);
    if (index !== -1) {
      updatedContacts[index] = { ...contacts[index], [name]: value };
    } else {
      updatedContacts[contacts.length] = { type: ContactsTypes.GENERAL, [name]: value };
    }
    dispatch(organizationActions.setContacts(updatedContacts));
  };

  return (
    <Grid container>
      <SNETTextField {...basicDetailsFormData.ORG_ID} value={id} onChange={handleChange} />
      <SNETTextField {...basicDetailsFormData.ORGANIZATION_NAME} value={name} onChange={handleChange} />
      <div className={classes.dunsContainer}>
        <FormControlLabel control={<Checkbox color="primary" />} label="I have my DUNS number" />
        <SNETTextField {...basicDetailsFormData.DUNS} value={duns} onChange={handleChange} />
      </div>
      <div className={classes.websiteUrlContainer}>
        <SNETTextField {...basicDetailsFormData.WEBSITE} value={website} onChange={handleChange} />
        <AlertText type={websiteValidation.type} message={websiteValidation.message} />
      </div>
      <SNETTextField {...basicDetailsFormData.PHONE} value={phone} onChange={handleContactsChange} />
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
