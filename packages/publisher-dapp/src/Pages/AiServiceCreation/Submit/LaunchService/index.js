import React from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

import { aiServiceDetailsActions } from "../../../../Services/Redux/actionCreators";
import { serviceCreationStatus } from "../../constant";
import ContinueLaunchTable from "./ContinueLaunchTable";
import LaunchTable from "./LaunchTable";
import MessageToReviewers from "./MessageToReviewers";
import { useStyles } from "./styles";
import DaemonConfig from "../DaemonConfig";
import { alertTypes } from "shared/dist/components/AlertBox";
import AlertBox from "shared/dist/components/AlertBox";

class LaunchService extends React.Component {
  state = { daemonConfig: {}, alert: {} };

  fetchSampleDaemonConfig = async () => {
    try {
      const { organization, serviceDetails, getSampleDaemonConfig } = this.props;
      if (serviceDetails.serviceState.state === serviceCreationStatus.APPROVAL_PENDING) {
        return;
      }
      const daemon_config = await getSampleDaemonConfig(organization.uuid, serviceDetails.uuid, false);
      this.setState({ daemonConfig: daemon_config });
    } catch (e) {
      // Alert user daemon config cannot be retrieved
    }
  };

  componentDidMount = async () => {
    await this.fetchSampleDaemonConfig();
  };

  handlePublishToBlockchain = async () => {
    this.setState({ alert: {} });
    const { publishToIPFS, organization, serviceDetails, history, publishService } = this.props;
    if (serviceDetails.serviceState.state === serviceCreationStatus.PUBLISHED) {
      return this.setState({
        alert: { type: alertTypes.ERROR, message: "Service is already published. No new changes to be published " },
      });
    }
    if (serviceDetails.serviceState.state === serviceCreationStatus.PUBLISH_IN_PROGRESS) {
      return this.setState({
        alert: { type: alertTypes.ERROR, message: "Service is already being published. Please wait." },
      });
    }
    if (serviceDetails.serviceState.state !== serviceCreationStatus.APPROVED) {
      return this.setState({
        alert: { type: alertTypes.ERROR, message: "Service is not yet approved. Please submit for approval " },
      });
    }
    const { metadata_ipfs_hash } = await publishToIPFS(organization.uuid, serviceDetails.uuid);
    await publishService(organization, serviceDetails, metadata_ipfs_hash, serviceDetails.tags, history);
  };

  render() {
    const { classes, serviceDetails } = this.props;
    const { daemonConfig, alert } = this.state;
    if (serviceDetails.serviceState.state === serviceCreationStatus.APPROVAL_PENDING) {
      return (
        <div className={classes.launchServiceContainer}>
          <Grid item sx={12} sm={12} md={12} lg={12} className={classes.box}>
            <Typography variant="h6">Review Process</Typography>
            <Typography className={classes.reviewProcessDescription}>
              After you submitted your service, SNET admins will review your service protocals. This process could take
              a few days. After the review you will be notified if your service as has been ACCEPTED or if some your
              inputs needs to be refined. You will be able to review and respond to the feedback from the SNET Admins
              here.
            </Typography>
            <ContinueLaunchTable />
            <AlertBox type={alert.type} message={alert.message} />
          </Grid>
          <MessageToReviewers />
        </div>
      );
    }

    return (
      <div className={classes.launchServiceContainer}>
        <Grid item sx={12} sm={12} md={12} lg={12} className={classes.box}>
          <Typography variant="h6">Review Process</Typography>
          <Typography className={classes.reviewProcessDescription}>
            After you submitted your service, SNET admins will review your service protocals. This process could take a
            few days. After the review you will be notified if your service as has been ACCEPTED or if some your inputs
            needs to be refined. You will be able to review and respond to the feedback from the SNET Admins here.
          </Typography>
          <LaunchTable handlePublishToBlockchain={this.handlePublishToBlockchain} />
          <AlertBox type={alert.type} message={alert.message} />
          <DaemonConfig config={daemonConfig} footerNote="Lorem ipsum doler amet" />
        </Grid>
        <MessageToReviewers />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  organization: state.organization,
  serviceDetails: state.aiServiceDetails,
});

const mapDispatchToProps = dispatch => ({
  getSampleDaemonConfig: (orgUuid, serviceUuid, testDaemon) =>
    dispatch(aiServiceDetailsActions.getSampleDaemonConfig(orgUuid, serviceUuid, testDaemon)),
  publishToIPFS: (orgUuid, serviceUuid) => dispatch(aiServiceDetailsActions.publishToIPFS(orgUuid, serviceUuid)),
  publishService: (organization, serviceDetails, metadata_ipfs_hash, tags, history) =>
    dispatch(aiServiceDetailsActions.publishService(organization, serviceDetails, metadata_ipfs_hash, tags, history)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(LaunchService)));
