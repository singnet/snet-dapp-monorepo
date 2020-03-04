import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import moment from "moment";

import AlertBox from "shared/dist/components/AlertBox";
import SNETButton from "shared/dist/components/SNETButton";

import { cardDetails, btnDetails } from "./content";
import { useStyles } from "./styles";
import AccountBalance from "../AccountBalance";
import Card from "../StakeSession/Card";

import { stakeActions } from "../../Services/Redux/actionCreators";

const ClaimStake = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { claimStakes } = useSelector(state => state.stakeReducer);
  const { metamaskDetails } = useSelector(state => state.metamaskReducer);

  const [alert, setAlert] = useState({ 0: { type: "Error", message: "Test Error Message" } });

  useEffect(() => {
    try {
      // TODO: Convert the same to async Constant based on the need...
      dispatch(stakeActions.fetchClaimStakes(metamaskDetails));
    } catch (_error) {
      //console.log("error - ", error);
      // TODO - Need to handle the error based on overall Web App
    }
  }, [dispatch, metamaskDetails]);

  if (claimStakes.length === 0) {
    // TODO - Need to handle the No Data Found Here as per the Invision App Designs
  }

  const handleClick = (btnAction, stakeMapIndex) => {
    // TODO - Handle the blockchain calls here...
    // TODO stakeMapIndex from if
    if (btnAction === "reStake" && stakeMapIndex > 0) {
      // Call blockchain event here
    }

    if (btnAction === "claimStake") {
      // Call blockchain event here
    }

    // TODO In case of Error Message
    setAlert(...alert);
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <AccountBalance />
      </Grid>
      <Grid item xs={12} sm={12} md={8} lg={8} className={classes.stakeSessionBoxContainer}>
        {claimStakes.map(stake => (
          <div key={stake.stakeMapIndex} className={classes.box}>
            <div className={classes.header}>
              <Typography variant="h6">
                Stake Session - {moment.unix(stake.startPeriod).format("MMM YYYY")} #{stake.stakeMapIndex}
              </Typography>
            </div>
            <div className={classes.cards}>
              {cardDetails(stake).map(card => (
                <Card key={card.title} title={card.title} value={card.value} unit={card.unit} />
              ))}
            </div>
            <AlertBox
              type="error"
              message={alert[stake.stakeMapIndex] ? alert[stake.stakeMapIndex].message : undefined}
            />
            <div className={classes.btnContainer}>
              {btnDetails.map(button => (
                <SNETButton
                  key={button.text}
                  children={button.text}
                  color={button.color}
                  variant={button.variant}
                  onClick={_e => handleClick(button.action, stake.stakeMapIndex)}
                />
              ))}
            </div>
          </div>
        ))}
      </Grid>
    </Grid>
  );
};

export default ClaimStake;
