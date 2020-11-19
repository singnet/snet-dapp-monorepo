import React, { Fragment, useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";

import BasicDetails from "./BasicDetails";
import CompanyAddress from "./CompanyAddress";
import SNETButton from "shared/dist/components/SNETButton";
import { useStyles } from "./styles";
import { OnboardingRoutes } from "../../OnboardingRouter/Routes";
import { organizationActions } from "../../../../Services/Redux/actionCreators";
import validator from "shared/dist/utils/validator";
import { orgOnboardingConstraints } from "./validationConstraints";
import AlertBox, { alertTypes } from "shared/dist/components/AlertBox";
import { GlobalRoutes } from "../../../../GlobalRouter/Routes";
import { organizationSetupStatuses, organizationTypes } from "../../../../Utils/organizationSetup";
import { generateDetailedErrorMessageFromValidation, getEmailDomain } from "../../../../Utils/validation";
import { userEntities } from "../../../../Utils/user";
import { individualVerificationStatusList } from "../../constant";
import { checkIfKnownError } from "shared/dist/utils/error";
import { individualVerificationActions } from "../../../../Services/Redux/actionCreators/userActions";

const selectState = state => {
  return {
    userEntity: state.user.entity,
    organization: state.organization,
    email: state.user.email,
    individualStatus: state.user.individualVerificationStatus,
  };
};
const domainsToBeAutoApproved = ["singularitynet.io"];

const Organization = props => {
  const classes = useStyles();
  const { history } = props;
  const [alert, setAlert] = useState({});
  const { organization, email, userEntity, individualStatus } = useSelector(selectState);
  const [allowDuns, setAllowDuns] = useState(false);

  const dispatch = useDispatch();
  const [invalidFieldsFlag, setInvalidFieldsFlag] = useState();
  let orgValidationConstraints = orgOnboardingConstraints;
  if (userEntity === userEntities.INDIVIDUAL) {
    delete orgValidationConstraints.id;
  }
  const invalidFields = validator(organization, orgValidationConstraints, { format: "grouped" });
  useEffect(() => {
    if (organization.state.state === organizationSetupStatuses.APPROVAL_PENDING) {
      history.push(GlobalRoutes.ORG_SETUP_STATUS.path.replace(":orgUuid", organization.uuid));
    }
  }, [history, organization.state.state, organization.uuid]);

  useEffect(() => {
    setAllowDuns(organization.uuid ? (organization.duns ? true : false) : true);
  }, [organization.duns, organization.uuid, setAllowDuns]);

  useEffect(() => {
    if (organization.state.state === organizationSetupStatuses.ONBOARDING_REJECTED && !Boolean(alert.type)) {
      setAlert({
        type: alertTypes.ERROR,
        message: "Your organization has been rejected.",
      });
    } else if (
      (organization.state.state === organizationSetupStatuses.CHANGE_REQUESTED ||
        individualStatus === individualVerificationStatusList.CHANGE_REQUESTED) &&
      !Boolean(alert.type)
    ) {
      setAlert({
        type: alertTypes.ERROR,
        message: "Please validate the details provided and submit again for approval",
      });
    }
  }, [organization.state.state, setAlert, alert, individualStatus]);

  const handleNavigateBack = () => {
    history.push(OnboardingRoutes.SINGULARITY_ACCOUNT.path);
  };

  const initiateIndividualVerification = async () => {
    try {
      const { redirect_url: redirectUrl } = await dispatch(individualVerificationActions.initiateVerification());
      const userDomain = getEmailDomain(email);
      if (domainsToBeAutoApproved.includes(userDomain)) {
        await dispatch(
          individualVerificationActions.setIndividualVerificationStatus(individualVerificationStatusList.APPROVED)
        );
        return history.push(GlobalRoutes.INDIVIDUAL_STATUS.path);
      }
      await window.location.replace(redirectUrl);
    } catch (e) {
      if (checkIfKnownError(e)) {
        return setAlert({
          type: alertTypes.ERROR,
          message: e.message,
        });
      }
      return setAlert({
        type: alertTypes.ERROR,
        message: "Unable to initiate ID verification. Please try again",
      });
    }
  };

  const handleFinish = async () => {
    setAlert({});

    try {
      if (invalidFields) {
        const isNotValid = Object.values(invalidFields);
        if (isNotValid) {
          const errorMessage = generateDetailedErrorMessageFromValidation(isNotValid);
          setInvalidFieldsFlag(true);
          return setAlert({ type: alertTypes.ERROR, children: errorMessage });
        }
      }
      let orgUuid;
      const orgData = { ...organization, duns: allowDuns ? organization.duns : "" };
      if (userEntity === userEntities.INDIVIDUAL) {
        orgData.type = organizationTypes.INDIVIDUAL;
        // delete orgData.duns
      }
      if (
        orgData.state.state === organizationSetupStatuses.CHANGE_REQUESTED ||
        individualStatus === individualVerificationStatusList.CHANGE_REQUESTED
      ) {
        const data = await dispatch(organizationActions.finishLater(orgData, "ONBOARDING"));
        orgUuid = data.org_uuid;
      } else {
        const data = await dispatch(organizationActions.createOrganization(orgData));
        if (userEntity === userEntities.INDIVIDUAL) {
          await initiateIndividualVerification();
        }
        orgUuid = data.org_uuid;
      }
      dispatch(organizationActions.setOrganizationStatus(organizationSetupStatuses.ONBOARDING));
      if (userEntity !== userEntities.INDIVIDUAL) {
        history.push(GlobalRoutes.ORG_SETUP_STATUS.path.replace(":orgUuid", orgUuid));
      }
      dispatch(organizationActions.initializeOrg(email));
    } catch (error) {
      return setAlert({
        type: alertTypes.ERROR,
        message: "Unable to finish organization authentication. Please try later",
      });
    }
  };

  const handleCancel = () => {
    dispatch(organizationActions.resetOrganizationData());
    history.push(OnboardingRoutes.SINGULARITY_ACCOUNT.path);
  };

  return (
    <Fragment>
      <div className={classes.box}>
        <Typography variant="h6">Organization Verification Required</Typography>
        <div className={classes.wrapper}>
          <Typography>Please provide your company organization details for the verification process.</Typography>
          <BasicDetails
            allowDuns={allowDuns}
            setAllowDuns={setAllowDuns}
            invalidFields={typeof invalidFieldsFlag !== "undefined" ? invalidFields : {}}
          />
          <CompanyAddress />
          <div className={classes.alertBoxContainer}>
            <AlertBox type={alert.type} message={alert.message} children={alert.children} />
          </div>
        </div>
      </div>
      <div className={classes.buttonsContainer}>
        <SNETButton color="primary" children="cancel" onClick={handleCancel} />
        <SNETButton color="primary" children="back" onClick={handleNavigateBack} />
        <SNETButton
          color="primary"
          variant="contained"
          children="finish"
          onClick={handleFinish}
          disabled={organization.state.state === organizationSetupStatuses.ONBOARDING_REJECTED}
        />
      </div>
    </Fragment>
  );
};

export default Organization;
