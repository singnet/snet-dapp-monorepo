import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

import SNETTextarea from "shared/dist/components/SNETTextarea";
import AlertBox, { alertTypes } from "shared/dist/components/AlertBox";
import { useStyles } from "./styles";
import { aiServiceDetailsActions } from "../../../Services/Redux/actionCreators";
import SNETButton from "shared/dist/components/SNETButton";
import DaemonConfig from "./DaemonConfig";
import { organizationSetupStatuses } from "../../../Utils/organizationSetup";
import { serviceCreationStatus } from "../constant";
import { checkIfKnownError } from "shared/src/utils/error";

class SubmitForReview extends React.Component {
  state = { daemonConfig: {}, alert: {} };

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
    if (serviceDetails.uuid !== prevProps.serviceDetails.uuid) {
      await this.fetchSampleDaemonConfig();
    }
  };

  componentDidMount = async () => {
    await this.fetchSampleDaemonConfig();
  };

  handleCommentChange = event => {
    this.props.setServiceProviderComment(event.target.value);
  };

  handleSubmitForReview = async () => {
    try {
      this.setState({ alert: {} });
      const { submitServiceDetailsForReview, orgId, orgUuid, orgStatus, serviceDetails } = this.props;
      if (orgStatus !== organizationSetupStatuses.PUBLISHED) {
        return this.setState({
          alert: {
            type: alertTypes.ERROR,
            message: "Organization is not published. Please publish the organization before publishing the service",
          },
        });
      }
      if (serviceDetails.serviceState.state !== serviceCreationStatus.DRAFT) {
        return this.setState({
          alert: { type: alertTypes.ERROR, message: "No changes in draft. Please edit a field before submitting" },
        });
      }
      // TODO remove orgId. MPS has to figure out orgId from orgUuid
      await submitServiceDetailsForReview(orgId, orgUuid, serviceDetails.uuid, serviceDetails);
    } catch (e) {
      if (checkIfKnownError(e)) {
        return this.setState({ alert: { type: alertTypes.ERROR, message: e.message } });
      }
      this.setState({ alert: { type: alertTypes.ERROR, message: "Something Went wrong. Please try later." } });
    }
  };

  render() {
    const { classes, serviceDetails } = this.props;
    const { daemonConfig, alert } = this.state;

    return (
      <Grid container className={classes.submitContainer}>
        <Grid item sx={12} sm={12} md={12} lg={12} className={classes.box}>
          <Typography variant="h6">Review Process</Typography>
          <div className={classes.wrapper}>
            <Typography className={classes.submitDescription}>
              After you submitted your service, SNET admins will review your service protocals. This process could take
              a few days. After the review you will be notified if your service as has been ACCEPTED or if some your
              inputs needs to be refined. You will be able to review and respond to the feedback from the SNET Admins
              here.
            </Typography>
            <DaemonConfig config={daemonConfig} footerNote="lore ipsum doler amet" />
            <div className={classes.commentField}>
              <SNETTextarea
                label="Comments for Reviewers (optional)"
                minCount={0}
                maxCount={5000}
                rowCount={8}
                colCount={105}
                value={serviceDetails.comments.serviceProvider[0]}
                onChange={this.handleCommentChange}
              />
            </div>
            <AlertBox type={alert.type} message={alert.message} />
            <div className={classes.btnContainer}>
              <SNETButton
                children="submit for review"
                color="primary"
                variant="contained"
                onClick={this.handleSubmitForReview}
              />
            </div>
          </div>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  serviceDetails: state.aiServiceDetails,
  orgId: state.organization.id,
  orgUuid: state.organization.uuid,
  orgStatus: state.organization.state.state,
});

const mapDispatchToProps = dispatch => ({
  getSampleDaemonConfig: (orgUuid, serviceUuid, testDaemon) =>
    dispatch(aiServiceDetailsActions.getSampleDaemonConfig(orgUuid, serviceUuid, testDaemon)),
  setServiceProviderComment: comment => dispatch(aiServiceDetailsActions.setServiceProviderComment(comment)),
  submitServiceDetailsForReview: (orgId, orgUuid, serviceUuid, serviceDetails) =>
    dispatch(aiServiceDetailsActions.submitServiceDetailsForReview(orgId, orgUuid, serviceUuid, serviceDetails)),
});

export default withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(SubmitForReview));
