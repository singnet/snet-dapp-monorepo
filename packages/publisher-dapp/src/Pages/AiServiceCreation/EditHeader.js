import React from "react";
import InfoIcon from "@material-ui/icons/Info";
import Typography from "@material-ui/core/Typography";
import SNETButton from "shared/dist/components/SNETButton";
import { withStyles } from "@material-ui/core/styles";

import { useStyles } from "./styles";

const EditHeader = ({ classes, onBack, allowSubmit, onSubmit }) => {
  return (
    <div className={classes.editHeaderContainer}>
      <div className={classes.editHeaderTitleContainer}>
        <InfoIcon />
        <Typography className={classes.editHeaderTitle}>Edit Service</Typography>
      </div>
      <div className={classes.editHeaderBtns}>
        <SNETButton children="back to dashboard" onClick={onBack} />
        <SNETButton children="submit" onClick={onSubmit} disabled={!allowSubmit} />
      </div>
    </div>
  );
};

export default withStyles(useStyles)(EditHeader);
