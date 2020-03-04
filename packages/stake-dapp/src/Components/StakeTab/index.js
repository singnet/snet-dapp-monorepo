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
import { stakeActions } from "../../Services/Redux/actionCreators";

class StakeTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
    };
  }

  // Tab Change
  handleTabChange = (_event, value) => {
    this.setState({ selectedTab: value });
  };

  componentDidMount = () => {
    const { metamaskDetails, fetchActiveStakes, fetchClaimStakes } = this.props;

    // Initiate the Fetch Calls
    fetchActiveStakes(metamaskDetails);
    fetchClaimStakes(metamaskDetails);
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
                <Tab className="singularity-tab" label={`Incubating(${stakeSummary.incubatingCount})`} value={1} />
                <Tab
                  className="singularity-tab"
                  label={`Ready to Claim(${stakeSummary.readyToClaimCount})`}
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
  fetchActiveStakes: metamaskDetails => dispatch(stakeActions.fetchActiveStakes(metamaskDetails)),
  fetchClaimStakes: metamaskDetails => dispatch(stakeActions.fetchClaimStakes(metamaskDetails)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(StakeTab));
