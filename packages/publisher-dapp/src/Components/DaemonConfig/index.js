import React, { useState } from "react";
import isEmpty from "lodash/isEmpty";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { useStyles } from "./styles";
import SNETButton from "shared/dist/components/SNETButton";
import AlertText from "shared/dist/components/AlertText";
import { alertTypes } from "shared/dist/components/AlertBox";
import PrettyPrintJson from "shared/dist/components/PrettyPrintJSON";

let clearAlertTimeout;

const DaemonConfig = ({ config, classes, title, footerNote }) => {
  const [alert, setAlert] = useState({});
  if (isEmpty(config)) {
    return null;
  }

  const clearAlert = () => {
    clearTimeout(clearAlertTimeout);
    clearAlertTimeout = setTimeout(() => setAlert({}), 1000);
  };

  const handleCopyToClipboard = () => {
    setAlert({ type: alertTypes.SUCCESS, message: "Config has been copied to clipboard" });
    clearAlert();
  };

  return (
    <Grid item>
      <Typography variant="subtitle1" className={classes.configTitle}>
        {title}
      </Typography>
      <div className={classes.grayBoxContainer}>
        <Grid container className={classes.grayBox}>
          <PrettyPrintJson data={config} />

          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.configBtnContainer}>
            <CopyToClipboard text={JSON.stringify(config)} onCopy={handleCopyToClipboard}>
              <SNETButton color="primary" variant="text" children="copy config to clipboard" />
            </CopyToClipboard>
            <div className={classes.alertText}>
              <AlertText type={alert.type} message={alert.message} />
            </div>
          </Grid>
        </Grid>
      </div>
      {footerNote ? (
        <Typography variant="subtitle1" className={classes.configFooter}>
          {footerNote}
        </Typography>
      ) : null}
    </Grid>
  );
};

export default withStyles(useStyles)(DaemonConfig);
