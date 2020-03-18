import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Grid from "@material-ui/core/Grid";

import AlertBox from "shared/dist/components/AlertBox";
import SNETButton from "shared/dist/components/SNETButton";
import { initSDK } from "shared/dist/utils/snetSdk";
import SNETTextfield from "shared/dist/components/SNETTextfield";

import { organizationActions } from "../../../../Services/Redux/actionCreators";

const MMAddress = ({ classes }) => {
  const { email, ownerAddress, ownerEmail } = useSelector(state => ({
    email: state.user.email,
    ownerAddress: state.organization.ownerAddress,
    ownerEmail: state.organization.owner,
  }));
  const dispatch = useDispatch();

  const handleConnetMM = async () => {
    const sdk = await initSDK();
    dispatch(organizationActions.setOneBasicDetail("ownerAddress", sdk.account.address));
  };

  if (email !== ownerEmail) {
    return null;
  }

  if (!!ownerAddress) {
    return (
      <Grid container className={classes.technicalInfo}>
        <Grid item xs={12} sm={12} md={6} lg={6} className={classes.owmnerMMTextfield}>
          <SNETTextfield name="ownerAddress" value={ownerAddress} label="Owner's Metamask Address" />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} className={classes.btnContainer}>
          <SNETButton color="primary" variant="contained" children="capture from metamask" onClick={handleConnetMM} />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container className={classes.alertBoxBtnContainer}>
      <Grid item xs={12} sm={6} md={6} lg={6} className={classes.alertBoxContainer}>
        <AlertBox
          message="Please install or log in to Metamask to proceed further.  Learn more about Metamask."
          type="warning"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6} className={classes.btnContainer}>
        <SNETButton color="primary" variant="contained" children="connect metamask" onClick={handleConnetMM} />
      </Grid>
    </Grid>
  );
};

export default MMAddress;
