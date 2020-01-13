import React from "react";
import Grid from "@material-ui/core/Grid";

import AlertBox from "shared/dist/components/AlertBox";
import SNETButton from "shared/dist/components/SNETButton";
import { initSDK } from "shared/dist/utils/snetSdk";
import SNETTextfield from "shared/dist/components/SNETTextfield";
import { useSelector, useDispatch } from "react-redux";
import { organizationActions } from "../../../../Services/Redux/actionCreators";

const MMAddress = ({ classes }) => {
  const { ownerAddress } = useSelector(state => state.organization);
  const dispatch = useDispatch();

  const handleConnetMM = async () => {
    const sdk = await initSDK();
    dispatch(organizationActions.setOneBasicDetail("ownerAddress", sdk.account.address));
  };

  if (!!ownerAddress) {
    return (
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={6} className={classes.topSectionContainer}>
          <SNETTextfield name="ownerAddress" value={ownerAddress} disabled label="Owner's Metamask Address" />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} className={classes.topSectionContainer}>
          <SNETButton color="primary" variant="contained" children="capture from metamask" onClick={handleConnetMM} />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={6} lg={6} className={classes.topSectionContainer}>
        <AlertBox
          message="Please install or log in to Metamask to proceed further.  Learn more about Metamask."
          type="warning"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} className={classes.topSectionContainer}>
        <SNETButton color="primary" variant="contained" children="connect metamask" onClick={handleConnetMM} />
      </Grid>
    </Grid>
  );
};

export default MMAddress;
