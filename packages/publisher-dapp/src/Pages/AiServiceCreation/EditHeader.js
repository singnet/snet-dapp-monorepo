import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import InfoIcon from "@material-ui/icons/Info";
import Typography from "@material-ui/core/Typography";
import SNETButton from "shared/src/components/SNETButton";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";

import { useStyles } from "./styles";

const EditHeader = ({ classes, show, onBack, allowSubmit, onSubmit }) => {
  if (!show) {
    return null;
  }

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <InfoIcon />
        <Typography className={classes.appBarTitle} variant="h6" noWrap>
          Material-UI
        </Typography>
        <SNETButton children="back to dashboard" onClick={onBack} />
        <SNETButton children="submit" disabled={!allowSubmit} onClick={onSubmit} />
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(useStyles)(EditHeader);
