import React, { Fragment, useState, useEffect } from "react";
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
import { organizationTypes, organizationSetupStatuses } from "../../../Utils/organizationSetup";

const PublishToBlockchain = ({ classes, handleFinishLater, history }) => {
  const { organization } = useSelector(state => ({
    organization: state.organization,
    entity: state.user.entity,
  }));
  const { name, type, status, uuid, ownerFullName, ownerAddress } = organization;
  const [alert, setAlert] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    if (organization.status === organizationSetupStatuses.PUBLISHED) {
      setAlert({ type: alertTypes.SUCCESS, message: "Organization has been published in the blockchain" });
    }
  }, [organization.status]);

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
      const ipfsHash = await dispatch(organizationActions.publishToIPFS(uuid));
      await dispatch(organizationActions.createAndSaveTransaction(organization, ipfsHash));
    } catch (error) {
      if (error instanceof APIError) {
        return setAlert({ type: alertTypes.ERROR, message: error.message });
      }
      setAlert({ type: alertTypes.ERROR, message: "unable to publish. please try later" });
    }
  };

  const handleBack = () => {
    history.push(OrganizationSetupRoutes.REGION.path);
  };

  return (
    <Fragment>
      <div className={classes.box}>
        <Typography variant="h6">Publish Organization to Blockchain</Typography>
        <Typography className={classes.description}>
          Lorem ipsum dolor sit amet, consectetur et mihi. Accusatores directam qui ut accusatoris. Communiter videbatur
          hominum vitam ut qui eiusdem fore accommodatior maximis vetere communitatemque.
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
            description="The company name is displayed as the provider to users on the AI service page name.11111. "
            name="name"
            disabled
            value={name}
          />
          <SNETTextfield
            label="Owners Full Name"
            description="You should be owner of your company’s legal entity."
            name="ownerFullName"
            disabled
            value={ownerFullName}
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
          disablePublish={!ownerAddress}
          handlePublish={handlePublish}
          handleSubmit={handleSubmit}
        />
      </div>
    </Fragment>
  );
};

export default withStyles(useStyles)(PublishToBlockchain);
