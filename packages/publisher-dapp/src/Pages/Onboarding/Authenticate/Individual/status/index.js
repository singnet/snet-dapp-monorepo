import React, { useState } from "react";
import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";

import { useStyles } from "./styles";
import { individualVerificationStatusList } from "../../../constant";
import Pending from "./Pending";
import Denied from "./Denied";
import Approved from "./Approved";
import RelatedLinks from "./RelatedLinks";
import { checkIfKnownError } from "shared/dist/utils/error";
import AlertBox, { alertTypes } from "shared/dist/components/AlertBox";
import { individualVerificationActions } from "../../../../../Services/Redux/actionCreators/userActions";
import ChangeRequested from "./ChangeRequested";

const StatusComponents = {
  [individualVerificationStatusList.PENDING]: Pending,
  [individualVerificationStatusList.APPROVED]: Approved,
  [individualVerificationStatusList.REJECTED]: Denied,
  [individualVerificationStatusList.FAILED]: Denied,
  [individualVerificationStatusList.ERROR]: Denied,
  [individualVerificationStatusList.CHANGE_REQUESTED]: ChangeRequested,
};

const selectState = state => ({
  status: state.user.individualVerificationStatus,
  rejectReason: state.user.individualVerificationRejectReason,
});

const IndividualStatus = ({ classes }) => {
  const { status, rejectReason } = useSelector(selectState);
  const [alert, setAlert] = useState({});
  const dispatch = useDispatch();

  const Component = StatusComponents[status];

  const handleVerify = async () => {
    try {
      const { redirect_url: redirectUrl } = await dispatch(individualVerificationActions.initiateVerification());
      await window.location.replace(redirectUrl);
    } catch (e) {
      if (checkIfKnownError(e)) {
        return setAlert({ type: alertTypes.ERROR, message: e.message });
      }
      return setAlert({ type: alertTypes.ERROR, message: "Unable to initiate ID verification. Please try again" });
    }
  };

  if (Component) {
    return (
      <Grid container spacing={24} className={classes.individualStatusContainer}>
        <Component handleVerify={handleVerify} rejectReason={rejectReason} />
        <AlertBox type={alert.type} message={alert.message} />
        <RelatedLinks show={status === individualVerificationStatusList.APPROVED} />
      </Grid>
    );
  }

  return <div>Status not available</div>;
};

export default withStyles(useStyles)(IndividualStatus);
