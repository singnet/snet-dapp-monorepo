import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import InfoIcon from "@material-ui/icons/Info";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import BigNumber from "bignumber.js";

import { useStyles } from "./styles";
import { tokenActions, stakeActions, loaderActions } from "../../../Services/Redux/actionCreators";
import { NetworkNames } from "../../../Utils/constants/NetworkNames";

import { LoaderContent } from "../../../Utils/Loader";
import { fromWei } from "../../../Utils/GenHelperFunctions";
import { approveTokenV2 } from "../../../Utils/BlockchainHelper";

// Default Amount 1,000,000,000 * 10**8
const defaultAuthorizedAmount = "100000000000000000";
// Min Authorized Amount as 1M
const minAuthorizedAmount = "100000000000000";

class MetaMaskAccountBalance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: 0,
      switchState: false,
    };
  }

  componentDidMount = async () => {
    const {
      updateTokenBalance,
      updateTokenAllowance,
      fetchUserStakeBalanceFromBlockchain,
      metamaskDetails,
    } = this.props;

    await updateTokenBalance(metamaskDetails);
    await updateTokenAllowance(metamaskDetails);
    await fetchUserStakeBalanceFromBlockchain(metamaskDetails);
  };

  approveStake = async approveAmount => {
    const { startLoader, stopLoader, updateTokenAllowance, metamaskDetails } = this.props;

    try {
      startLoader(LoaderContent.AUTHORIZE_TOKENS);

      await approveTokenV2(metamaskDetails, approveAmount);

      await updateTokenAllowance(metamaskDetails);

      stopLoader();
    } catch (_error) {
      stopLoader();
    }
  };

  handleSwitchChange = async event => {
    const approveAmount = event.target.checked ? defaultAuthorizedAmount : "0";
    await this.approveStake(approveAmount);
  };

  render() {
    const { classes, metamaskDetails, tokenBalance, tokenAllowance, stakeBalance } = this.props;

    const networkNames = NetworkNames.filter(nw => nw.networkId.toString() === metamaskDetails.networkId.toString());

    return (
      <div className={classes.metamaskAccBalanceContainer}>
        <div className={classes.accountDetails}>
          <div>
            <div className={classes.label}>
              <div className={classes.iconTooltipContainer}>
                <InfoIcon />
                <p>Your account is linked to a third-party crypto wallet such as Metamask</p>
              </div>
              <span>Wallet</span>
            </div>
            <span>Metamask</span>
          </div>

          <div>
            <div className={classes.label}>
              <div className={classes.iconTooltipContainer}>
                <InfoIcon />
                <p>
                  Metamask allows you to select your Ethereum network. Please be sure you are using the correct network
                  for proper access to your wallet.
                </p>
              </div>
              <span>Current Network</span>
            </div>
            <span>
              {metamaskDetails.networkId} - {networkNames.length > 0 ? networkNames[0].networkName : ""}
            </span>
          </div>

          <div className={classes.walletIdContainer}>
            <div className={classes.label}>
              <span>Wallet ID</span>
            </div>
            <span className={classes.walletId}>{metamaskDetails.account}</span>
          </div>

          <div className={classes.switchToggleContainer}>
            <span>new</span>
            <div className={classes.label}>
              <div className={classes.iconTooltipContainer}>
                <InfoIcon />
                <p>
                  Allows staking contract to authorize higher amount of AGI for efficient and fast staking. This saves
                  you gas cost (ETH) for every stake you submit. Recommended if you are planning to stake more than
                  once. See FAQ for more information.
                </p>
              </div>
            </div>
            <FormControlLabel
              control={
                <Switch
                  checked={new BigNumber(tokenAllowance).gte(minAuthorizedAmount)}
                  onChange={this.handleSwitchChange}
                  color="primary"
                  name="authorizeTokens"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              }
              label="Authorize staking escrow contract"
            />
          </div>

          {/* <div className={classes.bgBox}>
            <div className={classes.label}>
              <div className={classes.iconTooltipContainer}>
                <InfoIcon />
                <p>
                  Number of tokens authorized for deposit or transfer.You cannot transfer more than the authorized
                  amount.
                </p>
              </div>
              <span>Authorized Tokens</span>
            </div>
            <span>{fromWei(tokenAllowance)} AGI</span>
          </div> */}

          <div className={classes.bgBox}>
            <div className={classes.label}>
              <div className={classes.iconTooltipContainer}>
                <InfoIcon />
                <p>Number of AGI tokens currently available in your wallet.</p>
              </div>
              <span>Total Tokens</span>
            </div>
            <span>{fromWei(tokenBalance)} AGI</span>
          </div>

          <div className={classes.bgBox}>
            <div className={classes.label}>
              <div className={classes.iconTooltipContainer}>
                <InfoIcon />
                <p>
                  Number of AGI tokens that you have staked across all sessions. This includes pending and active
                  staking amounts.
                </p>
              </div>
              <span>Total Staked</span>
            </div>
            <span>{fromWei(stakeBalance)} AGI</span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  metamaskDetails: state.metamaskReducer.metamaskDetails,
  tokenBalance: state.tokenReducer.tokenBalance,
  tokenAllowance: state.tokenReducer.tokenAllowance,
  stakeBalance: state.stakeReducer.stakeBalance,
});

const mapDispatchToProps = dispatch => ({
  updateTokenBalance: metamaskDetails => dispatch(tokenActions.updateTokenBalance(metamaskDetails)),
  updateTokenAllowance: metamaskDetails => dispatch(tokenActions.updateTokenAllowance(metamaskDetails)),
  fetchUserStakeBalanceFromBlockchain: metamaskDetails =>
    dispatch(stakeActions.fetchUserStakeBalanceFromBlockchain(metamaskDetails)),
  startLoader: loaderContent => dispatch(loaderActions.startAppLoader(loaderContent)),
  stopLoader: () => dispatch(loaderActions.stopAppLoader()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(MetaMaskAccountBalance));
