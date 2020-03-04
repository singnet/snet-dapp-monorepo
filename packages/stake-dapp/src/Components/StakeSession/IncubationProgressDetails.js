import React from "react";

import InfoIcon from "@material-ui/icons/Info";

import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

import { useStyles } from "./styles";

const IncubationProgressDetails = ({ details }) => {
  const classes = useStyles();
  if (details) {
    return (
      <div className={classes.incubationContainer}>
        <div className={classes.dayCountContainer}>
          <div>
            <InfoIcon />
            <Typography className={classes.incubationText}>Incubation Progress</Typography>
          </div>
          <div className={classes.daysCount}>
            <Typography className={classes.value}>
              {details.daysLeft}/{details.totalDays}
            </Typography>
            <Typography className={classes.unit}> days</Typography>
          </div>
        </div>
        <div className={classes.progressBarContainer}>
          <div className={classes.startFinishDate}>
            <Typography>Started {details.started}</Typography>
            <Typography>Finished {details.finished}</Typography>
          </div>
          <LinearProgress variant="determinate" value={30} className={classes.linearProgress} />
        </div>
      </div>
    );
  }

  return null;
};

export default IncubationProgressDetails;
