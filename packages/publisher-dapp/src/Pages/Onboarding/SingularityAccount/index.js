import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import { emailPreferencesList, entityTypeDetails } from "./content";
import SNETButton from "shared/src/components/SNETButton";
import StyledDropdown from "shared/dist/components/StyledDropdown";
import { useStyles } from "./styles";
import { OnboardingRoutes } from "../OnboardingRouter/Routes";
import { userEntities, userPreferenceTypes } from "../../../Utils/user";
import { useDispatch, useSelector } from "react-redux";
import { onboardingActions, preferenceActions } from "../../../Services/Redux/actionCreators/userActions";
import LoginBanner from "./LoginBanner";

const SingularityAccount = ({ classes, history }) => {
  const [emailPreferences, setEmailPreferences] = useState({
    [userPreferenceTypes.FEATURE_RELEASE]: false,
    [userPreferenceTypes.WEEKLY_SUMMARY]: false,
    [userPreferenceTypes.COMMENTS_AND_MESSAGES]: false,
  });
  const entity = useSelector(state => state.user.entity);
  const dispatch = useDispatch();
  const handleContinue = () => {
    dispatch(preferenceActions.updateEmailPreferences(emailPreferences));
    history.push(OnboardingRoutes.ACCEPT_SERVICE_AGREEMENT.path);
  };

  const handleEntityChange = event => {
    const value = event.target.value;
    if (value === "default") {
      return;
    }
    dispatch(onboardingActions.setUserEntity(value));
  };

  const handleEmailPreferencesChange = event => {
    const value = event.target.value;
    const updatedEmailPreferences = { ...emailPreferences, [value]: !emailPreferences[value] };
    setEmailPreferences(updatedEmailPreferences);
  };

  return (
    <Grid container className={classes.singularityAccContainer}>
      <Grid item sx={12} sm={12} md={12} lg={12} className={classes.box}>
        <Typography variant="h6">{entityTypeDetails.title}</Typography>
        <Typography className={classes.singularityAccDescription}>{entityTypeDetails.description}</Typography>
        <StyledDropdown
          labelTxt="Please Select"
          inputLabel="Entity Type"
          value={entity}
          list={[
            { value: userEntities.ORGANIZATION, label: userEntities.ORGANIZATION },
            { value: userEntities.INDIVIDUAL, label: userEntities.INDIVIDUAL },
          ]}
          onChange={handleEntityChange}
        />
      </Grid>
      <LoginBanner classes={classes} />
      <Grid item sx={12} sm={12} md={12} lg={12} className={classes.box}>
        <Typography variant="h6">Email Preferences</Typography>
        <div className={classes.checkboxContainer}>
          {emailPreferencesList.map(preference => (
            <FormControlLabel
              key={preference.type}
              control={
                <Checkbox
                  color="primary"
                  checked={emailPreferences[preference.type]}
                  value={preference.type}
                  onChange={handleEmailPreferencesChange}
                />
              }
              label={preference.description}
            />
          ))}
        </div>
      </Grid>
      <Grid item sx={12} sm={12} md={12} lg={12} className={classes.btnContainer}>
        <SNETButton color="primary" children="cancel" variant="text" />
        <SNETButton
          color="primary"
          children="continue"
          variant="contained"
          onClick={handleContinue}
          disabled={!entity}
        />
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(SingularityAccount);
