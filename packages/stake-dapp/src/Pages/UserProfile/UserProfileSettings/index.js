import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
//import FormControlLabel from "@material-ui/core/FormControlLabel";
//import Checkbox from "@material-ui/core/Checkbox";

import StyledButton from "shared/dist/components/StyledButton";
//import AlertBox, { alertTypes } from "shared/dist/components/AlertBox";

import { useStyles } from "./styles";
import { userActions, loaderActions } from "../../../Services/Redux/actionCreators";
import { GlobalRoutes } from "../../../GlobalRouter/Routes";

//import ConfirmDelete from "./ConfirmDelete";

class UserProfileSettings extends Component {
  state = {
    alertMessage: undefined,
    //alertType: alertTypes.ERROR,
    emailAlerts: false,
    showConfirmDelete: false,
    confirmDeleteError: undefined,
  };

  componentDidMount = () => {
    this.setState({ emailAlerts: this.props.emailAlerts });
  };

  handleChangePassword = () => {
    this.props.history.push(`${GlobalRoutes.FORGOT_PASSWORD.path}`);
  };

  // All the commented Functionality will be enabled in next version

  // handleEmailChange = event => {
  //   this.setState({
  //     email: event.target.value,
  //   });
  // };

  // handleEmailAlerts = () => {
  //   this.setState(prevState => ({ emailAlerts: !prevState.emailAlerts }));
  // };

  // handleDelete = () => {
  //   this.setState({ showConfirmDelete: true });
  // };

  // handleSubmit = async () => {
  //   this.setState({ alertMessage: undefined });
  //   const { updateUserProfile, isTermsAccepted } = this.props;
  //   const updatedUserData = { email_alerts: this.state.emailAlerts, is_terms_accepted: isTermsAccepted };
  //   try {
  //     await updateUserProfile(updatedUserData);
  //     this.setState({ alertType: alertTypes.SUCCESS, alertMessage: "Changes saved successfully" });
  //   } catch (error) {
  //     this.setState({ alertType: alertTypes.ERROR, alertMessage: String(error) });
  //   }
  // };

  // shouldSubmitBeEnabled = () => {
  //   return this.state.emailAlerts !== this.props.emailAlerts;
  // };

  // handleConfirmDeleteClose = () => {
  //   this.setState({ showConfirmDelete: false, confirmDeleteError: undefined });
  // };

  // handleConfirmDeleteSubmit = async () => {
  //   const { history, stopLoader } = this.props;
  //   const route = `/${GlobalRoutes.HOW_IT_WORKS.path}`;
  //   try {
  //     await this.props.deleteUserAccount({ history, route });
  //   } catch (err) {
  //     let confirmDeleteError = String(err.message);
  //     if (err.response && err.response.status === 404) {
  //       confirmDeleteError = "The profile has already been deleted";
  //     }
  //     this.setState({ confirmDeleteError });
  //     stopLoader();
  //   }
  // };

  render() {
    const { classes, userEmail, nickname } = this.props;
    //const { alertMessage, alertType, emailAlerts, showConfirmDelete, confirmDeleteError } = this.state;
    return (
      <Grid container className={classes.settingMainContainer}>
        <Grid item xs={12} sm={12} md={7} lg={7} className={classes.settingsContainer}>
          <h3>Settings</h3>
          <div className={classes.settingsContent}>
            <div>
              <TextField
                name="nickName"
                id="nickName"
                label="Nick Name (20 char max)"
                className={classes.styledTextField}
                value={nickname}
                margin="normal"
                variant="outlined"
                disabled
              />
              <p>Your nickname will be visible to other users when you post comments.</p>
            </div>
            <div>
              <TextField
                name="email"
                id="email"
                label="Email"
                className={classes.styledTextField}
                value={userEmail}
                margin="normal"
                variant="outlined"
                disabled
              />
            </div>
            <div>
              <h4>Password</h4>
              <StyledButton
                type="transparentBlueBorder"
                btnText="Change Password"
                onClick={this.handleChangePassword}
              />
            </div>
            {/* <div className={classes.notification}>
              <h4>Notifications</h4>
              <FormControlLabel
                control={
                  <Checkbox
                    className={classes.checkBox}
                    value=""
                    color="primary"
                    checked={emailAlerts}
                    onChange={this.handleEmailAlerts}
                  />
                }
                label="Receive notifications via email"
              />
              <p>
                This includes notifications about algorithms, comments, etc. Account related information will still be
                sent to your email.
              </p>
            </div>
            <AlertBox message={alertMessage} type={alertType} />
            <div className={classes.btnContainer}>
              <StyledButton
                btnText="save changes"
                disabled={!this.shouldSubmitBeEnabled()}
                onClick={this.handleSubmit}
              />
              <StyledButton btnText="delete account" type="red" onClick={this.handleDelete} />
            </div> */}
          </div>
        </Grid>
        {/* <ConfirmDelete
          open={showConfirmDelete}
          handleClose={this.handleConfirmDeleteClose}
          handleSubmit={this.handleConfirmDeleteSubmit}
          error={confirmDeleteError}
        /> */}
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  userEmail: state.user.email,
  nickname: state.user.nickname,
  emailAlerts: state.user.emailAlerts,
  isTermsAccepted: state.user.isTermsAccepted,
});

const mapDispatchToProps = dispatch => ({
  deleteUserAccount: ({ history, route }) => dispatch(userActions.deleteUserAccount({ history, route })),
  updateUserProfile: updatedUserData => dispatch(userActions.updateUserProfile(updatedUserData)),
  stopLoader: () => dispatch(loaderActions.stopAppLoader),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(UserProfileSettings));
