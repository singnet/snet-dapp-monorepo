import React, { Component } from "react";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

import CreateStake from "../CreateStake";
import UserStake from "../UserStake";
import ClaimStake from "../ClaimStake";
import StakeTransitions from "../StakeTransitions";
import { useStyles } from "./styles";
import { stakeActions, userActions } from "../../Services/Redux/actionCreators";

class StakeTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
    };
  }

  componentDidMount = () => {
    const {
      metamaskDetails,
      fetchCurrentActiveStakeWindow,
      fetchActiveStakes,
      fetchClaimStakes,
      getUserPreferences,
    } = this.props;

    // Initiate the Fetch Calls
    fetchCurrentActiveStakeWindow(metamaskDetails);
    fetchActiveStakes(metamaskDetails);
    fetchClaimStakes(metamaskDetails);

    // Get the User Preferences
    getUserPreferences();
  };

  componentDidUpdate = async (prevProps, _prevState) => {
    const { metamaskDetails, fetchCurrentActiveStakeWindow, fetchActiveStakes, fetchClaimStakes } = this.props;
    if (prevProps.metamaskDetails.account !== metamaskDetails.account) {
      await fetchCurrentActiveStakeWindow(metamaskDetails);
      await fetchActiveStakes(metamaskDetails);
      await fetchClaimStakes(metamaskDetails);
    }
  };

  refreshTabContent = async selectedTab => {
    const { metamaskDetails, fetchCurrentActiveStakeWindow, fetchActiveStakes, fetchClaimStakes } = this.props;

    switch (selectedTab) {
      case 0:
        await fetchCurrentActiveStakeWindow(metamaskDetails);
        break;
      case 1:
        await fetchActiveStakes(metamaskDetails);
        break;
      case 2:
        await fetchClaimStakes(metamaskDetails);
        break;
      default:
        // Do Nothing
        break;
    }
  };

  // Tab Change
  handleTabChange = (_event, value) => {
    this.setState({ selectedTab: value });
    this.refreshTabContent(value);
  };

  render() {
    const { selectedTab } = this.state;
    const { classes, stakeSummary } = this.props;

    return (
      <Grid container spacing={24} className={classes.mainSection}>
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.servieMainContainer}>
          <div className={classes.tabsContainer}>
            <AppBar position="static" color="default" className={classes.header}>
              <Tabs value={selectedTab} onChange={this.handleTabChange} indicatorColor="primary" textColor="primary">
                <Tab className="singularity-tab" label="Open Staking" value={0} />
                <Tab className="singularity-tab" label={`Incubating (${stakeSummary.incubatingCount})`} value={1} />
                <Tab
                  className="singularity-tab"
                  label={`Ready to Claim (${stakeSummary.readyToClaimCount})`}
                  value={2}
                />
                <Tab className="singularity-tab" label="Transactions" value={3} />
              </Tabs>
            </AppBar>
            {selectedTab === 0 && (
              <Typography component="div" className={classes.tabDetailsContainer}>
                <CreateStake />
              </Typography>
            )}
            {selectedTab === 1 && (
              <Typography component="div" className={classes.tabDetailsContainer}>
                <UserStake />
              </Typography>
            )}
            {selectedTab === 2 && (
              <Typography component="div" className={classes.tabDetailsContainer}>
                <ClaimStake />
              </Typography>
            )}
            {selectedTab === 3 && (
              <Typography component="div" className={classes.tabDetailsContainer}>
                <StakeTransitions />
              </Typography>
            )}
          </div>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  metamaskDetails: state.metamaskReducer.metamaskDetails,
  stakeSummary: state.stakeReducer.stakeSummary,
});

const mapDispatchToProps = dispatch => ({
  fetchCurrentActiveStakeWindow: metamaskDetails =>
    dispatch(stakeActions.fetchCurrentActiveStakeWindow(metamaskDetails)),
  fetchActiveStakes: metamaskDetails => dispatch(stakeActions.fetchActiveStakes(metamaskDetails)),
  fetchClaimStakes: metamaskDetails => dispatch(stakeActions.fetchClaimStakes(metamaskDetails)),
  getUserPreferences: () => dispatch(userActions.preferenceActions.getUserPreferences()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(StakeTab));
