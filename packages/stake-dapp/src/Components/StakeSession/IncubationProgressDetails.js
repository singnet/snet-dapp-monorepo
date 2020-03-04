import React from "react";

import moment from "moment";

import InfoIcon from "@material-ui/icons/Info";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

import { useStyles } from "./styles";

const IncubationProgressDetails = ({ details }) => {
  const classes = useStyles();
  if (details) {
    const daysPassed = Math.floor((moment().unix() - details.submissionEndPeriod) / (60 * 60 * 24));
    const stakeDays = Math.floor((details.endPeriod - details.submissionEndPeriod) / (60 * 60 * 24));
    const started = moment.unix(details.submissionEndPeriod).format("DD MMM YYYY");
    const finished = moment.unix(details.endPeriod).format("DD MMM YYYY");

    const progressVal = daysPassed > 0 ? Math.floor((daysPassed * 100) / stakeDays) : 0;

    return (
      <div className={classes.incubationContainer}>
        <div className={classes.dayCountContainer}>
          <div>
            <InfoIcon />
            <Typography className={classes.incubationText}>Incubation Progress</Typography>
          </div>
          <div className={classes.daysCount}>
            <Typography className={classes.value}>
              {daysPassed > 0 ? daysPassed : 0}/{stakeDays}
            </Typography>
            <Typography className={classes.unit}> days</Typography>
          </div>
        </div>
        <div className={classes.progressBarContainer}>
          <div className={classes.startFinishDate}>
            <Typography>Started {started}</Typography>
            <Typography>Finished {finished}</Typography>
          </div>
          <LinearProgress variant="determinate" value={progressVal} className={classes.linearProgress} />
        </div>
      </div>
    );
  }

  return null;
};

export default IncubationProgressDetails;
