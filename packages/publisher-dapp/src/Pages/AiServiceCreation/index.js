import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import last from "lodash/last";
import ProgressBar from "shared/dist/components/ProgressBar";

import { progressText, serviceCreationSections } from "./constant";
import { ServiceCreationRoutes } from "./ServiceCreationRouter/Routes";
import ServiceCreationRouter from "./ServiceCreationRouter";
import Heading from "./Heading";
import { useStyles } from "./styles";
import { aiServiceDetailsActions, aiServiceListActions, loaderActions } from "../../Services/Redux/actionCreators";
import Loader from "./Loader";
import { LoaderContent } from "../../Utils/Loader";
import EditHeader from "./EditHeader";
import { GlobalRoutes } from "../../GlobalRouter/Routes";

class AiServiceCreation extends Component {
  initData = async () => {
    const {
      getAiServiceList,
      getServiceDetails,
      initServiceCreationLoader,
      stopInitServiceCreationLoader,
      orgId,
    } = this.props;
    const { orgUuid, serviceUuid } = this.props.match.params;
    initServiceCreationLoader();
    await Promise.all([getAiServiceList(orgUuid), getServiceDetails(orgUuid, serviceUuid, orgId)]);
    stopInitServiceCreationLoader();
  };

  componentDidMount = async () => {
    await this.initData();
  };

  componentDidUpdate = async prevProps => {
    const { orgUuid, serviceUuid } = this.props;
    if (orgUuid !== prevProps.orgUuid || serviceUuid !== prevProps.serviceUuid) {
      await this.initData();
    }
  };

  activeSection = () => {
    const path = this.props.location.pathname;
    const { PROFILE, DEMO, PRICING_AND_DISTRIBUTION, SUBMIT } = serviceCreationSections;
    if (path.includes(last(ServiceCreationRoutes.PROFILE.path.split("/")))) {
      return PROFILE;
    }
    if (path.includes(last(ServiceCreationRoutes.DEMO.path.split("/")))) {
      return DEMO;
    }
    if (path.includes(last(ServiceCreationRoutes.PRICING_AND_DISTRIBUTION.path.split("/")))) {
      return PRICING_AND_DISTRIBUTION;
    }
    if (path.includes(last(ServiceCreationRoutes.SUBMIT.path.split("/")))) {
      return SUBMIT;
    }
    return PROFILE;
  };

  handleBackToDashboard = () => {
    const { orgUuid, history } = this.props;
    history.push(GlobalRoutes.SERVICES.path.replace(":orgUuid", orgUuid));
  };

  handleSubmit = async () => {
    const { orgUuid, serviceUuid, history, location, saveServiceDetails, serviceDetails } = this.props;
    await saveServiceDetails(orgUuid, serviceUuid, serviceDetails);
    if (!location.pathname.match(ServiceCreationRoutes.SUBMIT.match)) {
      history.push(ServiceCreationRoutes.SUBMIT.path.replace(":orgUuid", orgUuid).replace(":serviceUuid", serviceUuid));
    }
  };

  render() {
    const { classes, serviceFoundInBlockchain, serviceTouched } = this.props;
    return (
      <Fragment>
        <EditHeader
          show={serviceFoundInBlockchain}
          onBack={this.handleBackToDashboard}
          allowSubmit={serviceTouched}
          onSubmit={this.handleSubmit}
        />
        <div className={classes.serviceCreationContainer}>
          <Heading {...this.activeSection().heading} />
          <ProgressBar activeSection={this.activeSection().key} progressText={progressText} />
          <ServiceCreationRouter />
          <Loader />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  orgId: state.organization.id,
  orgUuid: state.organization.uuid,
  serviceUuid: state.aiServiceDetails.uuid,
  serviceFoundInBlockchain: state.aiServiceDetails.foundInBlockchain,
  serviceTouched: state.aiServiceDetails.touched,
  serviceDetails: state.aiServiceDetails,
});

const mapDispatchToProps = dispatch => ({
  initServiceCreationLoader: () =>
    dispatch(loaderActions.startInitServiceCreationLoader(LoaderContent.INIT_SERVICE_CREATION)),
  stopInitServiceCreationLoader: () => dispatch(loaderActions.stopInitServiceCreationLoader()),
  getAiServiceList: (orgUuid, pagination) => dispatch(aiServiceListActions.getAiServiceList(orgUuid, pagination)),
  getServiceDetails: (orgUuid, serviceUuid, orgId) =>
    dispatch(aiServiceDetailsActions.getServiceDetails(orgUuid, serviceUuid, orgId)),
  saveServiceDetails: (orgUuid, serviceUuid, serviceDetails) =>
    dispatch(aiServiceDetailsActions.saveServiceDetails(orgUuid, serviceUuid, serviceDetails)),
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(AiServiceCreation));
