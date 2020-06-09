import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import isEqual from "lodash/isEqual";

import SNETButton from "shared/dist/components/SNETButton";
import ServiceImage from "shared/dist/assets/images/services.png";
import CreateNewServicePopup from "./CreateNewServicePopup";
import ServiceCollection from "./ServiceCollection";
import { useStyles } from "./styles";
import { aiServiceListActions } from "../../Services/Redux/actionCreators";
import ServicePublishedPopup from "./ServicePublishedPopup";

const devPortalUrl = "https://dev.singularitynet.io/docs/ai-developers/";

class AiServices extends Component {
  state = {
    showPopUp: false,
  };

  handleCreateService = () => {
    this.setState({ showPopUp: true });
  };

  handleClosePopup = () => {
    this.setState({ showPopUp: false });
  };

  componentDidMount = async () => {
    const { orgUuid, pagination, getAiServiceList } = this.props;
    await getAiServiceList(orgUuid, pagination);
  };

  componentDidUpdate = async prevProps => {
    const { orgUuid, pagination, getAiServiceList } = this.props;
    if (isEqual(prevProps.pagination, pagination)) {
      return;
    }
    await getAiServiceList(orgUuid, pagination);
  };

  handleServicePublishedPopupClose = () => {
    this.props.setRecentlyPublishedService(undefined);
  };

  render() {
    const { classes, recentlyPublishedService } = this.props;
    const { showPopUp } = this.state;

    return (
      <Fragment>
        <div className={classes.AiServicesMainContainer}>
          <Grid container className={classes.topSectionCotainer}>
            <Grid item xs={12} sm={12} md={12} lg={12} className={classes.descriptionContainer}>
              <Grid item xs={12} sm={7} md={7} lg={7} className={classes.content}>
                <div>
                  <Typography variant="h3" className={classes.descriptionTitle}>
                    My AI Apps
                  </Typography>
                  <Typography variant="h5" className={classes.description}>
                    With this publisher portal, you can publish and manage your AI services.
                  </Typography>
                </div>
                <div className={classes.btnContainer}>
                  <SNETButton
                    color="primary"
                    children="create new ai service"
                    variant="contained"
                    onClick={this.handleCreateService}
                  />
                  <SNETButton
                    color="primary"
                    variant="text"
                    children="view documentation"
                    href={devPortalUrl}
                    target="_blank"
                    rel="noopener"
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={5} md={5} lg={5} className={classes.media}>
                <img src={ServiceImage} alt="Services" />
              </Grid>
            </Grid>
            <ServiceCollection />
          </Grid>
          <CreateNewServicePopup open={showPopUp} handleClose={this.handleClosePopup} />
        </div>
        <ServicePublishedPopup
          open={Boolean(recentlyPublishedService)}
          handleClose={this.handleServicePublishedPopupClose}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  orgUuid: state.organization.uuid,
  pagination: state.aiServiceList.pagination,
  recentlyPublishedService: state.aiServiceList.recentlyPublishedService,
});

const mapDispatchToProps = dispatch => ({
  getAiServiceList: (orgUuid, pagination) => dispatch(aiServiceListActions.getAiServiceList(orgUuid, pagination)),
  setRecentlyPublishedService: serviceName => dispatch(aiServiceListActions.setRecentlyPublishedService(serviceName)),
});

export default withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(AiServices));
