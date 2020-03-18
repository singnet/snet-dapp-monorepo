import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import { useStyles } from "./styles";
import { ProgressStatusList } from "./";

const StatusToggler = ({ progressNumber, progressStatus }) => {
  const classes = useStyles();

  if (progressStatus === ProgressStatusList.COMPLETED) {
    return (
      <div className={classes.numberContaienr}>
        <span className={classes.completedIcon}>
          <CheckCircleIcon />
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
