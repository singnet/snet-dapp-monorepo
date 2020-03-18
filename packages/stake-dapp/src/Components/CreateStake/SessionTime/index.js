import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import ArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import InfoIcon from "@material-ui/icons/Info";

import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { useStyles } from "./styles";
import { userPreferenceTypes } from "../../../Utils/user";
import { preferenceActions } from "../../../Services/Redux/actionCreators/userActions";
import { stakeActions } from "../../../Services/Redux/actionCreators";

import Timer from "./Timer";

// const stakeDetails = {
//   startPeriod: moment().unix() + 60,
//   submissionEndPeriod: moment().unix() + 120,
// };

const stateSelector = state => ({
  metamaskDetails: state.metamaskReducer.metamaskDetails,
  stakeNotification: state.user.userPreferences,
});

const SessionTime = ({ stakeDetails }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const currentTime = moment().unix();

  const { metamaskDetails, stakeNotification } = useSelector(state => stateSelector(state));

  const [showTimer, setShowTimer] = useState(currentTime < stakeDetails.startPeriod ? 0 : 1);

  const [startTime, setStartTime] = useState(currentTime);
  const [endTime, setEndTime] = useState(
    currentTime < stakeDetails.startPeriod ? stakeDetails.startPeriod : stakeDetails.submissionEndPeriod
  );

  const progressStartTime =
    currentTime < stakeDetails.startPeriod ? currentTime - 1 * 24 * 60 * 60 : stakeDetails.startPeriod;
  const pathColor = currentTime < stakeDetails.startPeriod ? "#6F106A" : "#00C48C";

  const interval = 1000;

  const getSessionTitle = () => {
    let sessionTitle = "Currently no staking enabled";

    if (currentTime < stakeDetails.startPeriod) {
      sessionTitle = "Next Session in:";
    }
    if (currentTime >= stakeDetails.startPeriod && currentTime <= stakeDetails.submissionEndPeriod) {
      sessionTitle = "Open Staking for:";
    }

    return sessionTitle;
  };

  const getClosingTime = () => {
    let closeTime = "-";

    if (currentTime < stakeDetails.startPeriod) {
      closeTime = "Opens: " + moment.unix(stakeDetails.startPeriod).format("DD MMM YYYY");
    }
    if (currentTime >= stakeDetails.startPeriod && currentTime <= stakeDetails.submissionEndPeriod) {
      closeTime = "Closes: " + moment.unix(stakeDetails.submissionEndPeriod).format("DD MMM YYYY");
    }

    return closeTime;
  };

  const handleTimerCompletion = () => {
    const _currentTime = moment().unix();

    if (_currentTime < stakeDetails.startPeriod) {
      setShowTimer(0);
    } else if (_currentTime >= stakeDetails.startPeriod && _currentTime < stakeDetails.submissionEndPeriod) {
      setStartTime(_currentTime);
      setEndTime(stakeDetails.submissionEndPeriod);
      setShowTimer(1);
    } else {
      setShowTimer(2);
      // Call API to change the Stake Window
      if (showTimer !== 2) {
        dispatch(stakeActions.fetchCurrentActiveStakeWindow(metamaskDetails));
        dispatch(stakeActions.fetchActiveStakes(metamaskDetails));
      }
    }
  };

  const handleStakeNotificationChange = event => {
    //setStakeNotification(event.target.checked);

    const emailPreferences = {
      [userPreferenceTypes.TOKEN_STAKE_NOTIFICATION]: event.target.checked,
    };

    dispatch(preferenceActions.updateEmailPreferences(emailPreferences));
  };

  return (
    <div className={classes.sessionTimeContainer}>
      <div className={classes.header}>
        <Typography variant="h6">Session Time</Typography>
        <ArrowUpIcon />
      </div>
      <div className={classes.content}>
        <CircularProgressbarWithChildren
          circleRatio={0.75}
          strokeWidth={5}
          minValue={progressStartTime}
          maxValue={endTime}
          value={currentTime}
          styles={buildStyles({
            rotation: 0.63,
            trailColor: "#D6D6D6",
            pathColor,
          })}
        >
          <Typography variant="subtitle1">{getSessionTitle()}</Typography>
          {showTimer === 0 && (
            <Timer
              key="waitToOpen"
              startTime={startTime}
              endTime={endTime}
              interval={interval}
              handleTimerCompletion={handleTimerCompletion}
              onHowItWorks={false}
            />
          )}
          {showTimer === 1 && (
            <Timer
              key="waitToCloseSubmission"
              startTime={startTime}
              endTime={endTime}
              interval={interval}
              handleTimerCompletion={handleTimerCompletion}
              onHowItWorks={false}
            />
          )}
          <Typography className={classes.closingTime}>{getClosingTime()}</Typography>
        </CircularProgressbarWithChildren>

        <div className={classes.checkbox}>
          <InfoIcon />
          <FormControlLabel
            control={
              <Checkbox color="primary" checked={stakeNotification.status} onClick={handleStakeNotificationChange} />
            }
            label="Staking notifications"
          />
        </div>
      </div>
    </div>
  );
};

export default SessionTime;
