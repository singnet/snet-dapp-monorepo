import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Typography from "@material-ui/core/Typography";
import moment from "moment";

import AlertBox, { alertTypes } from "shared/dist/components/AlertBox";

import IncubationProgressDetails from "./IncubationProgressDetails";
import Agreement from "./Agreement";
import InfoBox from "./InfoBox";
import Card from "./Card";
import Button from "./Button";
import { useStyles } from "./styles";
import { LoaderContent } from "../../Utils/Loader";
import { loaderActions } from "../../Services/Redux/actionCreators";
import { waitForTransaction, updateAutoRenewal } from "../../Utils/BlockchainHelper";

const StakeSession = ({
  cardDetails,
  incubationProgressDetails,
  agreementDetails,
  btnDetails,
  handleClick,
  stakeDetails,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // The default options is to be checked
  const [autoRenewal, setAutoRenewal] = useState(stakeDetails.userExist ? stakeDetails.autoRenewal : true);
  const [alert, setAlert] = useState({ type: alertTypes.ERROR, message: undefined });

  const metamaskDetails = useSelector(state => state.metamaskReducer.metamaskDetails);

  const stakeStartDate = moment.unix(stakeDetails.startPeriod).format("MMM YYYY");
  const stakeMapIndex = stakeDetails.stakeMapIndex;

  const handleAutoRenewalChange = async event => {
    // TODO - Check in case of Open Stake or Incubating - condition might change
    if (stakeDetails.myStake === 0) {
      setAutoRenewal(event.target.checked);
      return;
    }

    try {
      let txHash;

      // Initiate the Auto Renewal Flag Update
      txHash = await updateAutoRenewal(metamaskDetails, stakeDetails.stakeMapIndex, event.target.checked);

      dispatch(loaderActions.startAppLoader(LoaderContent.UPDATE_STAKE_AUTO_RENEWAL));

      await waitForTransaction(txHash);

      setAlert({ type: alertTypes.SUCCESS, message: "Transaction has been completed successfully" });

      dispatch(loaderActions.stopAppLoader());

      // set the checkbox only when the transaction is allowed otherwise revert it
      setAutoRenewal(event.target.checked);

      // TODO - Update the Auto Renewal flag in the Redux store accordingly...
    } catch (err) {
      setAlert({ type: alertTypes.ERROR, message: "Transaction has failed." });
      dispatch(loaderActions.stopAppLoader());
    }
  };

  return (
    <div className={classes.StackSessionContainer}>
      <div className={classes.header}>
        <Typography variant="h6">
          Stake Session - {stakeStartDate} #{stakeMapIndex}
        </Typography>
      </div>
      <div className={classes.content}>
        <IncubationProgressDetails details={incubationProgressDetails} />
        <div className={classes.cards}>
          {cardDetails.map(item => (
            <Card key={item.title} title={item.title} value={item.value} unit={item.unit} />
          ))}
        </div>
        <Agreement details={agreementDetails} autoRenewal={autoRenewal} handleChange={handleAutoRenewalChange} />
        <div className={classes.infoBox}>
          <InfoBox stakeDetails={stakeDetails} />
        </div>
        <AlertBox type={alert.type} message={alert.message} />
        <Button details={btnDetails} handleClick={handleClick} autoRenewal={autoRenewal} />
      </div>
    </div>
  );
};

export default StakeSession;
