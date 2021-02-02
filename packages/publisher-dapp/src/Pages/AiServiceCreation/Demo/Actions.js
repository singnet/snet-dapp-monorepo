import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import SNETButton from "shared/dist/components/SNETButton";
import { ServiceCreationRoutes } from "../ServiceCreationRouter/Routes";
import { aiServiceDetailsActions } from "../../../Services/Redux/actionCreators";
import { GlobalRoutes } from "../../../GlobalRouter/Routes";

const Actions = ({ classes, serviceDetails, setServiceDetailsInRedux, setInvalidFieldsFlag }) => {
  const history = useHistory();

  const { orgUuid, serviceUuid } = useParams();
  const dispatch = useDispatch();

  const handleBack = () => {
    history.push(ServiceCreationRoutes.PROFILE.path.replace(":orgUuid", orgUuid).replace(":serviceUuid", serviceUuid));
  };

  const handleSave = async () => {
    setServiceDetailsInRedux(serviceDetails);
    await dispatch(aiServiceDetailsActions.saveServiceDetails(orgUuid, serviceUuid, serviceDetails));
  };

  const handleContinue = async () => {
    if (serviceDetails.assets.demoFiles.url) {
      await handleSave();
      history.push(
        ServiceCreationRoutes.PRICING_AND_DISTRIBUTION.path
          .replace(":orgUuid", orgUuid)
          .replace(":serviceUuid", serviceUuid)
      );
      setInvalidFieldsFlag(false);
    } else {
      setInvalidFieldsFlag(true);
    }
  };

  const handleFinishLater = async () => {
    await handleSave();
    history.push(GlobalRoutes.SERVICES.path.replace(":orgUuid", orgUuid));
  };

  return (
    <div>
      <div className={classes.buttonsContainer}>
        <SNETButton color="primary" children="finish later" onClick={handleFinishLater} />
        <SNETButton color="primary" children="previous step" onClick={handleBack} />
        <SNETButton color="primary" variant="contained" children="continue" onClick={handleContinue} />
      </div>
    </div>
  );
};

export default Actions;
