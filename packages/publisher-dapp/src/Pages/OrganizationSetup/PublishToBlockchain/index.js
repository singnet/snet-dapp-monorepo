import React, { Fragment, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import { useStyles } from "./styles";
import SNETButton from "shared/dist/components/SNETButton";
import AlertBox, { alertTypes } from "shared/dist/components/AlertBox";
import SNETTextfield from "shared/dist/components/SNETTextfield";
import TechnicalInfo from "./TechnicalInfo";
import { OrganizationSetupRoutes } from "../OrganizationSetupRouter/Routes";
import { useSelector, useDispatch } from "react-redux";
import SubmitAction from "./SubmitAction";
import validator from "shared/dist/utils/validator";
import { submitOrganizationCostraints } from "../validationConstraints";
import ValidationError from "shared/dist/utils/validationError";
import { organizationActions } from "../../../Services/Redux/actionCreators";
import { APIError } from "shared/dist/utils/API";
import { organizationTypes } from "../../../Utils/organizationSetup";

const PublishToBlockchain = ({ classes, handleFinishLater, history }) => {
  const { organization, email, ownerEmail } = useSelector(state => ({
    organization: state.organization,
    email: state.user.email,
    ownerEmail: state.organization.owner,
  }));
  const { name, type, status, uuid, ownerAddress } = organization;
  const [alert, setAlert] = useState({});

  const dispatch = useDispatch();

  const handleSubmit = () => {
    setAlert({});
    try {
      const isNotValid = validator(organization, submitOrganizationCostraints);
      if (isNotValid) {
        throw new ValidationError(isNotValid[0]);
      }
      dispatch(organizationActions.publishToIPFS(organization));
    } catch (error) {
      if (error instanceof ValidationError) {
        return setAlert({ type: alertTypes.ERROR, message: error.message });
      }
      if (error instanceof APIError) {
        return setAlert({ type: alertTypes.ERROR, message: error.message });
      }
      setAlert({ type: alertTypes.ERROR, message: "unable to submit. please try later" });
    }
  };

  const handlePublish = async () => {
    setAlert({});
    try {
      await dispatch(organizationActions.submitForApproval(organization));
      const metadataIpfsUri = await dispatch(organizationActions.publishToIPFS(uuid));
      await dispatch(organizationActions.publishOrganizationInBlockchain(organization, metadataIpfsUri, history));
    } catch (error) {
      if (error instanceof APIError) {
        return setAlert({ type: alertTypes.ERROR, message: error.message });
      }
      setAlert({ type: alertTypes.ERROR, message: "unable to publish. please try later" });
    }
  };

  const handleBack = () => {
    history.push(OrganizationSetupRoutes.REGION.path.replace(":orgUuid", organization.uuid));
  };

  const shouldPublishBeDisabled = () => !ownerAddress || email !== ownerEmail;

  return (
    <Fragment>
      <div className={classes.box}>
        <Typography variant="h6">Publish Organization to Blockchain</Typography>
        <Typography className={classes.description}>
          Add your organisation to the blockchain, making sure you enter all relevant information correctly, as once the
          data is submitted you will be unable to edit it.
        </Typography>
        <div className={classes.inputFields}>
          <SNETTextfield
            label="Entity Type"
            name="entity"
            disabled
            value={type}
            list={[
              { value: organizationTypes.ORGANIZATION, label: organizationTypes.ORGANIZATION },
              { value: organizationTypes.INDIVIDUAL, label: organizationTypes.INDIVIDUAL },
            ]}
          />
          <SNETTextfield
            label="Company Organization Name"
            description="The company name is displayed as the provider to users on the AI service page name. "
            name="name"
            disabled
            value={name}
          />
        </div>
        <TechnicalInfo />
      </div>
      <AlertBox message={alert.message} type={alert.type} />
      <div className={classes.buttonsContainer}>
        <SNETButton color="primary" children="finish later" onClick={handleFinishLater} />
        <SNETButton color="primary" children="back" onClick={handleBack} />
        <SubmitAction
          status={status}
          disablePublish={shouldPublishBeDisabled()}
          handlePublish={handlePublish}
          handleSubmit={handleSubmit}
        />
      </div>
    </Fragment>
  );
};

export default withStyles(useStyles)(PublishToBlockchain);
