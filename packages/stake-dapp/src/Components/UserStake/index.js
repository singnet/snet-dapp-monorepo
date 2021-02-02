import React from "react";
import { useSelector } from "react-redux";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import NoDataFoundImg from "shared/dist/assets/images/NoDataFound.png";

import { useStyles } from "./styles";
import StakeSession from "../StakeSession";
import { yourStakeDetails, stakeSessionDetails, incubationProgressDetails, agreementDetails } from "./content";
import InlineLoader from "../InlineLoader";
import NoMetaMask from "../NoMetamask";

const stateSelector = state => ({
  incubationStakes: state.stakeReducer.incubationStakes,
  isLoading: state.loader.incubationStakeList.isLoading,
  metamaskDetails: state.metamaskReducer.metamaskDetails,
});

const UserStake = () => {
  const classes = useStyles();

  const { incubationStakes, isLoading, metamaskDetails } = useSelector(state => stateSelector(state));

  if (isLoading) {
    return <InlineLoader />;
  }

  if (!metamaskDetails.isTxnsAllowed) {
    return <NoMetaMask />;
  }

  if (incubationStakes.length === 0) {
    return (
      <div className={classes.noDataFoundSection}>
        <img src={NoDataFoundImg} alt="No Data Found" />
        <Typography>You have no incubating stakes.</Typography>
        <Typography>
          Refer to <span>Open Staking</span> to make a stake.
        </Typography>
      </div>
    );
  }

  return (
    <Grid container className={classes.userStakeContainer}>
      {incubationStakes.map(stake => (
        <Grid key={stake.stakeMapIndex} item xs={12} sm={12} md={12} lg={12} className={classes.userStakeContainerItem}>
          <StakeSession
            incubationProgressDetails={incubationProgressDetails(stake)}
            yourStakeDetails={yourStakeDetails(stake)}
            sessionDetails={stakeSessionDetails(stake)}
            agreementDetails={agreementDetails}
            stakeDetails={stake}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default UserStake;
