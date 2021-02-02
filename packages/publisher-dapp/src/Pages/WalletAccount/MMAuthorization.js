import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { useStyles } from "./styles";
import SNETButton from "shared/dist/components/SNETButton";
import AlertBox from "shared/dist/components/AlertBox";
import AnchorLink from "shared/dist/components/AnchorLink";
import AuthorizeMetamaskImg from "shared/dist/assets/images/AuthorizeMetamask.png";

const MmAuthorization = ({ classes, handleAuthorizeMM, alert }) => {
  return (
    <Grid container className={classes.metaMaskContainer}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography variant="h3" className={classes.walletAccHeading}>
          Wallet Account
        </Typography>
        <div className={classes.metamaskContent}>
          <img src={AuthorizeMetamaskImg} alt="No Metamask Connected" />
          <div>
            <Typography className={classes.metamaskTitle}>Authorize Connection to Blockchain</Typography>
            <Typography className={classes.metamaskDesc}>
              Metamask signature is needed to fetch the claims list from blockchain.
              <span>
                <AnchorLink
                  label="Click here "
                  href="https://dev.singularitynet.io/docs/ai-developers/claim/"
                  newTab={true}
                />
                to learn more about claim revenue and how to collect it.
              </span>
            </Typography>
            <SNETButton color="primary" variant="contained" children="Authorize Metamask" onClick={handleAuthorizeMM} />
          </div>
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.alertBoxContainer}>
        <AlertBox type={alert.type} message={alert.message} children={alert.children} />
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(MmAuthorization);
