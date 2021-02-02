import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

import SNETTextarea from "shared/dist/components/SNETTextarea";
import AlertBox, { alertTypes } from "shared/dist/components/AlertBox";
import { useStyles } from "./styles";
import { aiServiceDetailsActions, loaderActions, organizationActions } from "../../../Services/Redux/actionCreators";
import SNETButton from "shared/dist/components/SNETButton";
import { organizationSetupStatuses } from "../../../Utils/organizationSetup";
import { serviceCreationStatus } from "../constant";
import { checkIfKnownError, GrpcError } from "shared/dist/utils/error";
import validator from "shared/dist/utils/validator";
import { submitServiceConstraints } from "./validationConstraints";
import { generateDetailedErrorMessageFromValidation } from "../../../Utils/validation";
import { ConfigurationServiceRequest } from "../../../Utils/Daemon/ConfigurationService";
import ValidateConfig from "./ValidateConfig";
import ValidationError from "shared/dist/utils/validationError";
import isEmpty from "lodash/isEmpty";
import { LoaderContent } from "../../../Utils/Loader";

class SubmitForReview extends React.Component {
  state = { daemonConfig: {}, alert: {}, validateDaemonAlert: {}, testEndpointAlert: {} };

  fetchSampleDaemonConfig = async () => {
    try {
      const { getSampleDaemonConfig, orgUuid, serviceDetails } = this.props;

      const daemon_config = await getSampleDaemonConfig(orgUuid, serviceDetails.uuid, true);
      this.setState({ daemonConfig: daemon_config });
    } catch (e) {
      // Alert user daemon config cannot be retrieved
    }
  };

  componentDidUpdate = async prevProps => {
    const { serviceDetails } = this.props;
    if (serviceDetails.uuid && serviceDetails.uuid !== prevProps.serviceDetails.uuid) {
      await this.fetchSampleDaemonConfig();
    }
  };

  componentDidMount = async () => {
    const { serviceDetails } = this.props;
    if (serviceDetails.uuid) {
      await this.fetchSampleDaemonConfig();
    }
  };

  handleCommentChange = event => {
    this.props.changeServiceProviderComments(event.target.value);
  };

  validateDaemonEndpoint = async () => {
    const { orgId, serviceId } = this.props;
    const configValidation = {
      allowed_user_flag: "true",
      blockchain_enabled: "false",
      passthrough_enabled: "true",
      organization_id: String(orgId),
      service_id: String(serviceId),
    };
    const invalidConfig = [];
    const { serviceDetails } = this.props;
    const testEndPoint = serviceDetails.groups[0].testEndpoints;
    if (isEmpty(testEndPoint)) {
      return this.setState({
        validateDaemonAlert: {
          type: alertTypes.ERROR,
          message: "The Ropsten endpoint can not be empty.",
        },
      });
    }
    try {
      const configurationServiceRequest = new ConfigurationServiceRequest(testEndPoint);
      const res = await configurationServiceRequest.getConfiguration();
      res.currentConfigurationMap.forEach(element => {
        if (element[0] in configValidation) {
          if (element[1] !== configValidation[element[0]]) {
            invalidConfig.push(`${element[0]} should be  ${configValidation[element[0]]}`);
          }
        }

        if (!isEmpty(invalidConfig)) {
          const errorMessage = generateDetailedErrorMessageFromValidation(invalidConfig);
          this.setState({
            validateDaemonAlert: {
              type: alertTypes.ERROR,
              children: errorMessage,
            },
          });
        } else {
          this.setState({
            alert: {},
            validateDaemonAlert: {
              type: alertTypes.SUCCESS,
              message:
                "Endpoint connection to test configuration file successfully validated You are ready to submit for review",
            },
          });
        }
      });
    } catch (error) {
      if (checkIfKnownError(error)) {
        if (error instanceof GrpcError) {
          return this.setState({
            validateDaemonAlert: {
              type: alertTypes.ERROR,
              message: `The Ropsten endpoint ${testEndPoint}  is either down or Invalid. \nDetails: ${error.message} `,
            },
          });
        }
        return this.setState({ validateDaemonAlert: { type: alertTypes.ERROR, message: error.message } });
      }
      return this.setState({
        validateDaemonAlert: { type: alertTypes.ERROR, message: `Something went wrong. Please try again` },
      });
    }
  };

  handleSubmitForReview = async () => {
    try {
      this.setState({ alert: {} });
      const {
        submitServiceDetailsForReview,
        orgUuid,
        serviceDetails,
        getLatestOrgDetails,
        getLatestOrgLoader,
      } = this.props;
      getLatestOrgLoader();
      const orgList = await getLatestOrgDetails();
      const selectedOrg = orgList[0];
      const orgStatus = selectedOrg.state.state;
      if (this.state.validateDaemonAlert.type !== alertTypes.SUCCESS) {
        throw new ValidationError("Please validate the daemon endpoint before submitting for review");
      }
      if (orgStatus !== organizationSetupStatuses.PUBLISHED) {
        if (orgStatus === organizationSetupStatuses.PUBLISH_IN_PROGRESS) {
          throw new ValidationError("Service cannot be submitted for approval as organization is not yet submitted.");
        }
        throw new ValidationError("Organization must be published before submitting the service for review");
      }
      if (serviceDetails.serviceState.state !== serviceCreationStatus.DRAFT) {
        throw new ValidationError("No changes in draft. Please edit a field before submitting for review");
      }
      const isNotValid = validator(serviceDetails, submitServiceConstraints);
      if (isNotValid) {
        const errorMessage = generateDetailedErrorMessageFromValidation(isNotValid);
        return this.setState({ alert: { type: alertTypes.ERROR, children: errorMessage } });
      }
      await submitServiceDetailsForReview(orgUuid, serviceDetails.uuid, serviceDetails);
    } catch (e) {
      this.props.stopAppLoader();
      if (checkIfKnownError(e)) {
        return this.setState({ alert: { type: alertTypes.ERROR, message: e.message } });
      }
      return this.setState({
        alert: { type: alertTypes.ERROR, message: "Unable to publish service. Please try again later" },
      });
    }
  };

  handleTestEndpointValidation = value => {
    this.setState({
      validateDaemonAlert: {
        type: alertTypes.ERROR,
        children: "",
      },
    });
    const errorMessage = validator.single(value, submitServiceConstraints.groups.array.testEndpoints);
    return this.setState({
      testEndpointAlert: {
        type: alertTypes.ERROR,
        message: errorMessage,
      },
    });
  };

  handleTestEndpointsChange = event => {
    const { changeGroups, serviceDetails } = this.props;
    const newEndpoints = [event.target.value];
    this.handleTestEndpointValidation(newEndpoints);
    const updatedServiceGroups = [...serviceDetails.groups];
    updatedServiceGroups[0] = { ...serviceDetails.groups[0], testEndpoints: newEndpoints };
    changeGroups(updatedServiceGroups);
  };

  render() {
    const { classes, serviceDetails } = this.props;
    const { daemonConfig, alert, validateDaemonAlert, testEndpointAlert } = this.state;
    const charCount = serviceDetails.comments.SERVICE_PROVIDER.length;
    const testEndPoint = serviceDetails.groups[0].testEndpoints[0];

    return (
      <Grid container className={classes.submitContainer}>
        <Grid item sx={12} sm={12} md={12} lg={12} className={classes.box}>
          <Typography variant="h6">Review Process</Typography>
          <div className={classes.wrapper}>
            <Typography className={classes.submitDescription}>
              SingularityNET will review your service protocols. You will be notified once the review has been
              completed, please be patient as this process could take a few days.
            </Typography>
            <ValidateConfig
              daemonConfig={daemonConfig}
              handleValidateConfig={this.validateDaemonEndpoint}
              testEndPoint={testEndPoint}
              handleTestEndpointsChange={this.handleTestEndpointsChange}
              alert={validateDaemonAlert}
              testEndpointAlert={testEndpointAlert}
            />
            <div className={classes.commentField}>
              <SNETTextarea
                label="Comments for Reviewers (optional)"
                minCount={charCount}
                maxCount={5000}
                rowCount={8}
                colCount={105}
                value={serviceDetails.comments.SERVICE_PROVIDER}
                onChange={this.handleCommentChange}
              />
            </div>
            <AlertBox type={alert.type} message={alert.message} children={alert.children} />
            <div className={classes.btnContainer}>
              <SNETButton
                children="submit for review"
                color="primary"
                variant="contained"
                onClick={this.handleSubmitForReview}
                disabled={validateDaemonAlert.type !== alertTypes.SUCCESS}
              />
            </div>
          </div>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  orgUuid: state.organization.uuid,
  orgStatus: state.organization.state.state,
});

const mapDispatchToProps = dispatch => ({
  getSampleDaemonConfig: (orgUuid, serviceUuid, testDaemon) =>
    dispatch(aiServiceDetailsActions.getSampleDaemonConfig(orgUuid, serviceUuid, testDaemon)),
  submitServiceDetailsForReview: (orgUuid, serviceUuid, serviceDetails) =>
    dispatch(aiServiceDetailsActions.submitServiceDetailsForReview(orgUuid, serviceUuid, serviceDetails)),
  getLatestOrgLoader: () => dispatch(loaderActions.startAppLoader(LoaderContent.GET_LATEST_ORG)),
  getLatestOrgDetails: () => dispatch(organizationActions.getStatus),
  stopAppLoader: () => dispatch(loaderActions.stopAppLoader()),
});

export default withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(SubmitForReview));
