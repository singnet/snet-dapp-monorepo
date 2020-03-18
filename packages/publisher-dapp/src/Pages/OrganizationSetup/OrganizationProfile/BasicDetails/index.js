import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from "react-redux";

import SNETTextfield from "shared/dist/components/SNETTextfield";
import SNETTextarea from "shared/dist/components/SNETTextarea";
import { useStyles } from "./styles";
import { organizationActions } from "../../../../Services/Redux/actionCreators";
import AlertText from "shared/dist/components/AlertText";
import validator from "shared/dist/utils/validator";
import { alertTypes } from "shared/dist/components/AlertBox";
import { orgProfileValidationConstraints } from "../validationConstraints";

const BasicDetails = ({ classes }) => {
  const { id, name, shortDescription, longDescription, website, foundInBlockchain } = useSelector(
    state => state.organization
  );
  const dispatch = useDispatch();
  const [websiteValidation, setWebsiteValidation] = useState({});

  const handleWebsiteValidation = value => {
    const isNotValid = validator.single(value, orgProfileValidationConstraints.website);
    if (isNotValid) {
      return setWebsiteValidation({ type: alertTypes.ERROR, message: `${value} is not a valid URL` });
    }
    return setWebsiteValidation({ type: alertTypes.SUCCESS, message: "website is valid" });
  };

  const handleFormInputsChange = event => {
    const { name, value } = event.target;
    if (name === "website") {
      handleWebsiteValidation(value);
    }
    dispatch(organizationActions.setOneBasicDetail(name, value));
  };

  return (
    <Grid item xs={12} sm={12} md={12} lg={12} className={classes.basicDetailsContainer}>
      <Typography variant="subtitle2" className={classes.description}>
        This information that will be displayed as the Provider for all the AI services your company publishes to AI
        Marketplace
      </Typography>
      <SNETTextfield
        name="id"
        value={id}
        label="Organization id"
        description="The organziation id is the unique id for the organization."
        onChange={handleFormInputsChange}
        disabled
      />
      <SNETTextfield
        name="name"
        value={name}
        label="Organization Name"
        description="The organziation name is displayed to users on the AI Marketplace."
        onChange={handleFormInputsChange}
        minCount="15"
        maxCount="50"
        disabled={foundInBlockchain}
      />
      <SNETTextarea
        label="Short Description"
        rowCount="4"
        colCount="102"
        minCount="0"
        maxCount="160"
        name="shortDescription"
        value={shortDescription}
        onChange={handleFormInputsChange}
        showInfoIcon
        disabled={foundInBlockchain}
      />
      <SNETTextarea
        label="Long Description"
        rowCount="8"
        colCount="102"
        minCount="0"
        maxCount="5000"
        name="longDescription"
        value={longDescription}
        onChange={handleFormInputsChange}
        showInfoIcon
        disabled={foundInBlockchain}
      />
      <div className={classes.orgWebsiteUrl}>
        <SNETTextfield
          name="website"
          value={website}
          onChange={handleFormInputsChange}
          label="Organization Website URL"
          description="Your organization’s website must be publicly available and the domain name must be associated with your organization."
        />
        <AlertText type={websiteValidation.type} message={websiteValidation.message} />
      </div>
    </Grid>
  );
};

export default withStyles(useStyles)(BasicDetails);
