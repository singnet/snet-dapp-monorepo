import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import { useStyles } from "./styles";
import AlertBox from "shared/dist/components/AlertBox";
import SNETButton from "shared/dist/components/SNETButton";
import { initSDK } from "shared/dist/utils/snetSdk";
import SNETTextfield from "shared/dist/components/SNETTextfield";

const MMAddress = ({ address, setAddress, classes }) => {
  const handleConnetMM = async () => {
    const sdk = await initSDK();
    const address = await sdk.account.getAddress();
    setAddress(address);
  };

  if (!!address) {
    return (
      <Fragment>
        <Grid item xs={12} sm={12} md={6} lg={6} className={classes.metamaskAddTxtField}>
          <SNETTextfield name="ownerAddress" value={address} icon label="Metamask Address" />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} className={classes.metamaskAddBtn}>
          <SNETButton color="primary" variant="contained" children="capture from metamask" onClick={handleConnetMM} />
        </Grid>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <AlertBox
          message="Please install or log in to Metamask to proceed further.  Learn more about Metamask."
          type="warning"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <SNETButton color="primary" variant="contained" children="connect metamask" onClick={handleConnetMM} />
      </Grid>
    </Fragment>
  );
};

export default withStyles(useStyles)(MMAddress);
