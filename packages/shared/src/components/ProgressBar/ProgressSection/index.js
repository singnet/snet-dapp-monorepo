import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { useStyles } from "./styles";
import StatusToggler from "./StatusToggler";

export const ProgressStatusList = {
  IDLE: "idle",
  ACTIVE: "active",
  COMPLETED: "completed",
};

const ProgressSection = ({ progressNumber, progressText, progressStatus }) => {
  const classes = useStyles();

  return (
    <li className={classes[progressStatus]}>
      <Fragment>
        <StatusToggler progressStatus={progressStatus} progressNumber={progressNumber} />
        <span className={classes.TabTitle}>{progressText}</span>
      </Fragment>
    </li>
  );
};

ProgressSection.propTypes = {
  progressNumber: PropTypes.number.isRequired,
  progressText: PropTypes.string.isRequired,
  progressStatus: PropTypes.oneOf(["idle", "active", "completed"]),
};

export default ProgressSection;
