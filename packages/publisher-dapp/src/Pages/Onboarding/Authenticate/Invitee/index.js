import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import SNETButton from "shared/dist/components/SNETButton";
import AlertBox, { alertTypes } from "shared/dist/components/AlertBox";
import { checkIfKnownError } from "shared/dist/utils/error";
import validator from "shared/dist/utils/validator";
import ValidationError from "shared/dist/utils/validationError";

import { profileIdentityDetails } from "./content";
import { useStyles } from "./styles";
import MMAddress from "./MMAddress";
import { OnboardingRoutes } from "../../OnboardingRouter/Routes";
import { inviteMembersActions } from "../../../../Services/Redux/actionCreators";
import { inviteeValidationConstraints } from "./validationConstraints";

import { GlobalRoutes } from "../../../../GlobalRouter/Routes";

const Invitee = ({ classes, history }) => {
  const inviteCode = useSelector(state => state.user.inviteCode);
  const dispatch = useDispatch();

  const [address, setAddress] = useState("");
  const [alert, setAlert] = useState({});

  const handleCancel = () => {
    history.push(OnboardingRoutes.SINGULARITY_ACCOUNT.path);
  };

  const handleNavigateBack = () => {
    history.push(OnboardingRoutes.ACCEPT_SERVICE_AGREEMENT.path);
  };

  const handleFinish = async () => {
    try {
      const isNotValid = validator({ address }, inviteeValidationConstraints);
      if (isNotValid) {
        throw new ValidationError(isNotValid[0]);
      }
      const payload = {
        invite_code: inviteCode,
        wallet_address: address,
      };
      const org = await dispatch(inviteMembersActions.acceptInvitationAndGetLatestOrgStatus(payload));
      if (org) {
        history.push(GlobalRoutes.ORG_SETUP_STATUS.path.replace(":orgUuid", org.uuid));
      }
    } catch (error) {
      if (checkIfKnownError(error)) {
        return setAlert({ type: alertTypes.ERROR, message: error.message });
      }
      return setAlert({ type: alertTypes.ERROR, message: "something went wrong" });
    }
  };

  return (
    <Fragment>
      <Grid container className={classes.box}>
        <Typography variant="h6">{profileIdentityDetails.title}</Typography>
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.acceptedInvitationContent}>
          <Typography variant="subtitle2">{profileIdentityDetails.description}</Typography>
          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.actionContainer}>
            <MMAddress address={address} setAddress={setAddress} />
          </Grid>
          <AlertBox type={alert.type} message={alert.message} />
        </Grid>
      </Grid>
      <div className={classes.buttonsContainer}>
        <SNETButton color="primary" children="cancel" onClick={handleCancel} />
        <SNETButton color="primary" children="back" onClick={handleNavigateBack} />
        <SNETButton color="primary" variant="contained" children="finish" onClick={handleFinish} />
      </div>
    </Fragment>
  );
};

export default withStyles(useStyles)(Invitee);
