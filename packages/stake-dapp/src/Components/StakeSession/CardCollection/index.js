import React from "react";

import Typography from "@material-ui/core/Typography";
import InfoIcon from "@material-ui/icons/Info";

import { useStyles } from "./styles";

const CardCollection = ({ yourStakeData, sessionDetailsData }) => {
  const classes = useStyles();

  return (
    <div className={classes.CardCollectionContainer}>
      <div>
        <Typography className={classes.header}>Your Stake</Typography>
        <div className={classes.grayBox}>
          {yourStakeData.map(item => (
            <div className={classes.cardCollection} key={item.title}>
              <div className={classes.iconTooltipContainer}>
                <div className={classes.toolTipContainer}>
                  <InfoIcon />
                  <Typography>{item.toolTip}</Typography>
                </div>
                <Typography className={classes.title}>{item.title}</Typography>
              </div>
              <div>
                <Typography className={classes.value}>{item.value}</Typography>
                <Typography className={classes.unit}>{item.unit}</Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Typography className={classes.header}>Session Details</Typography>
        <div className={classes.grayBox}>
          {sessionDetailsData.map(item => (
            <div className={classes.cardCollection} key={item.title}>
              <div className={classes.iconTooltipContainer}>
                <div className={classes.toolTipContainer}>
                  <InfoIcon />
                  <Typography>{item.toolTip}</Typography>
                </div>
                <Typography className={classes.title}>{item.title}</Typography>
              </div>
              <div>
                <Typography className={classes.value}>{item.value}</Typography>
                <Typography className={classes.unit}>{item.unit}</Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardCollection;
