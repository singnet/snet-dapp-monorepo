import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import { useStyles } from "./styles";
import StakeSession from "../StakeSession";
import { cardDetails, incubationProgressDetails, agreementDetails } from "./content";
import { stakeActions } from "../../Services/Redux/actionCreators";

import NoDataFoundImg from "shared/dist/assets/images/NoDataFound.png";

const UserStake = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { incubationStakes } = useSelector(state => state.stakeReducer);
  const { metamaskDetails } = useSelector(state => state.metamaskReducer);

  //const [alert, setAlert] = useState({ 0: { type: "Error", message: "Test Error Message" } });

  useEffect(() => {
    try {
      // TODO: Convert the same to async Constant based on the need...
      dispatch(stakeActions.fetchActiveStakes(metamaskDetails));
    } catch (_error) {
      //console.log("error - ", error);
      // TODO - Need to handle the error based on overall Web App
    }
  }, [dispatch, metamaskDetails]);

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
        <Grid key={stake.stakeMapIndex} item xs={12} sm={12} md={12} lg={12}>
          <StakeSession
            incubationProgressDetails={incubationProgressDetails(stake)}
            cardDetails={cardDetails(stake)}
            agreementDetails={agreementDetails}
            stakeDetails={stake}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default UserStake;
