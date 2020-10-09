import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import JumioLogo from "shared/dist/assets/images/jumio.png";
import SNETButton from "shared/dist/components/SNETButton";
import { documentList } from "./content";
import { useStyles } from "./styles";
import { individualVerificationActions } from "../../../../Services/Redux/actionCreators/userActions";
import AlertBox, { alertTypes } from "shared/dist/components/AlertBox";
import { checkIfKnownError } from "shared/dist/utils/error";
import { individualVerificationStatusList } from "../../constant";
import { getEmailDomain } from "../../../../Utils/validation";
import { GlobalRoutes } from "../../../../GlobalRouter/Routes";
import { AuthenticateRoutes } from "../AuthenitcateRouter/Routes";

const domainsToBeAutoApproved = ["singularitynet.io"];

class Individual extends Component {
  state = {
    alert: {},
  };

  componentDidMount = async () => {
    const { status, getVerificationStatus } = this.props;
    const newStatusData = await getVerificationStatus(status);
    if (newStatusData.status === individualVerificationStatusList.NOT_STARTED) {
      return this.props.history.push(GlobalRoutes.ONBOARDING.path);
    }
    this.props.history.push(AuthenticateRoutes.INDIVIDUAL_STATUS.path);
  };

  componentDidUpdate(prevProps) {
    const { status, history } = this.props;
    if (prevProps.status !== status && status === individualVerificationStatusList.NOT_STARTED) {
      return history.push(GlobalRoutes.ONBOARDING.path);
    }
    this.props.history.push(AuthenticateRoutes.INDIVIDUAL_STATUS.path);
  }

  handleVerify = async () => {
    try {
      const { history, initiateVerification, setStatus } = this.props;
      const { redirect_url: redirectUrl } = await initiateVerification();
      const userDomain = getEmailDomain(this.props.userEmail);
      if (domainsToBeAutoApproved.includes(userDomain)) {
        await setStatus(individualVerificationStatusList.APPROVED);
        return history.push(GlobalRoutes.INDIVIDUAL_STATUS.path);
      }
      await window.location.replace(redirectUrl);
    } catch (e) {
      if (checkIfKnownError(e)) {
        return this.setState({ alert: { type: alertTypes.ERROR, message: e.message } });
      }
      return this.setState({
        alert: { type: alertTypes.ERROR, message: "Unable to initiate ID verification. Please try again" },
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { alert } = this.state;
    return (
      <Grid container className={classes.individualContainer}>
        <Grid item sx={12} sm={12} md={12} lg={12} className={classes.box}>
          <Typography variant="h6">Identity Verification Required</Typography>
          <Grid item sx={12} sm={12} md={12} lg={12} className={classes.descriptionLogoSection}>
            <Grid item sx={12} sm={12} md={8} lg={8} className={classes.description}>
              <Typography>
                To ensure the security and safety of our platform and to enable us to allow you to monetize your
                services we need to verify your identification. Your privacy is paramount to us and so we have selected
                a secured third-party service <a href="https://www.jumio.com/">Jumio</a> to verify your identity.
                Following the completion of Jumio’s verification process, you will be redirected back to AI Publisher.
              </Typography>
            </Grid>
            <Grid item sx={12} sm={12} md={4} lg={4} className={classes.jumioLogo}>
              <img src={JumioLogo} alt="Jumio" />
            </Grid>
          </Grid>
          <Grid item sx={12} sm={12} md={12} lg={12} className={classes.docListSection}>
            <Typography>Please enable your camera and prepare any of the following documents:</Typography>
            <ul>
              {documentList.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Grid>
          <Grid item sx={12} sm={12} md={12} lg={12} className={classes.btnContainer}>
            <SNETButton
              children="process with jumio verification"
              color="primary"
              variant="contained"
              onClick={this.handleVerify}
            />
          </Grid>
          <AlertBox type={alert.type} message={alert.message} />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  status: state.user.individualVerificationStatus,
  userEmail: state.user.email,
});

const mapDispatchToProps = dispatch => ({
  initiateVerification: () => dispatch(individualVerificationActions.initiateVerification()),
  getVerificationStatus: () => dispatch(individualVerificationActions.getVerificationStatus()),
  setStatus: status => dispatch(individualVerificationActions.setIndividualVerificationStatus(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Individual));
