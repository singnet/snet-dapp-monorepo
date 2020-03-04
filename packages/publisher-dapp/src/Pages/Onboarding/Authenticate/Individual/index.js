import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import SNETButton from "shared/dist/components/SNETButton";
import { documentList } from "./content";
import { useStyles } from "./styles";
import { individualVerificationActions } from "../../../../Services/Redux/actionCreators/userActions";
import AlertBox, { alertTypes } from "shared/dist/components/AlertBox";
import { checkIfKnownError } from "shared/src/utils/error";
import { AuthenticateRoutes } from "../AuthenitcateRouter/Routes";

class Individual extends Component {
  state = {
    alert: {},
  };

  componentDidMount = async () => {
    await this.props.getVerificationStatus();
    this.props.history.push(AuthenticateRoutes.INDIVIDUAL_STATUS);
  };

  handleVerify = async () => {
    try {
      const { redirect_url: redirectUrl } = await this.props.initiateVerification();
      await window.location.replace(redirectUrl);
    } catch (e) {
      if (checkIfKnownError(e)) {
        return this.setState({ alert: { type: alertTypes.ERROR, message: e.message } });
      }
      return this.setState({
        alert: { type: alertTypes.ERROR, message: "Unable to initiate Jumio verification. Please try again" },
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
                You need to verify your identification. We use the secured third party service <span>Jumio </span>to
                verifiy your identity. After you complete Jumio’s process, you will be redirected back to AI Publiser.
              </Typography>
            </Grid>
            <Grid item sx={12} sm={12} md={4} lg={4} className={classes.jumioLogo}>
              <img src="http://placehold.it/180x63" alt="Jumio" />
            </Grid>
          </Grid>
          <Grid item sx={12} sm={12} md={12} lg={12} className={classes.docListSection}>
            <Typography>Please prepare the following documents and information:</Typography>
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

const mapDispatchToProps = dispatch => ({
  initiateVerification: () => dispatch(individualVerificationActions.initiateVerification()),
  getVerificationStatus: () => dispatch(individualVerificationActions.getVerificationStatus()),
});

export default connect(null, mapDispatchToProps)(withStyles(useStyles)(Individual));
