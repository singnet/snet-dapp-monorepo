import React from "react";
import CheckIcon from "@material-ui/icons/Check";

import { useStyles } from "./styles";
import { ProgressStatusList } from "./";

const StatusToggler = ({ progressNumber, progressStatus }) => {
  const classes = useStyles();

  if (progressStatus === ProgressStatusList.COMPLETED) {
    return (
      <div className={classes.numberContaienr}>
        <span className={classes.completedIcon}>
          <CheckIcon />
        </span>
      </div>
    );
  }
  return (
    <div className={classes.numberContaienr}>
      <span className={classes.number}>{progressNumber}</span>
    </div>
  );
};

export default StatusToggler;
