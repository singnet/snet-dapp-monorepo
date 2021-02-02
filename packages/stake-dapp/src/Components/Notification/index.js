import React, { Component } from "react";
import { connect } from "react-redux";
//import isEmpty from "lodash/isEmpty";

import { withStyles } from "@material-ui/styles";
import NotificationIcon from "@material-ui/icons/ErrorOutline";

import NotificationBar, { notificationBarTypes } from "shared/dist/components/NotificationBar";

import { useStyles } from "./styles";
import { metamaskActions, tokenActions } from "../../Services/Redux/actionCreators";
import { userWalletActions } from "../../Services/Redux/actionCreators/userActions";
import { NetworkNames } from "../../Utils/constants/NetworkNames";
import { toChecksumAddress } from "../../Utils/GenHelperFunctions";

class Notification extends Component {
  connectMetamask = async () => {
    if (window.ethereum) {
      try {
        const ethereum = window.ethereum;

        const chainId = ethereum.chainId;
        const netId = parseInt(chainId);

        //await ethereum.request({ method: 'eth_accounts' });
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });

        if (accounts.length > 0) {
          const isTxnsAllowed = Boolean(accounts[0]) && netId.toString() === process.env.REACT_APP_ETH_NETWORK;
          await this.storeMetamaskDetails(Boolean(accounts[0]), toChecksumAddress(accounts[0]), netId, isTxnsAllowed);
        }

        // Subscribe to Metamask after connection
        this.subscribeToMetamask();
      } catch (_error) {
        // User denied account access...
        this.storeMetamaskDetails(false, "0x0", 0, false);
      }
    }
  };

  subscribeToMetamask = async () => {
    if (window.ethereum) {
      const ethereum = window.ethereum;

      try {
        // On Network Change
        ethereum.on("chainChanged", _chainId => {
          window.location.reload();
        });

        const chainId = ethereum.chainId;
        const netId = parseInt(chainId);
        // On Account Change
        ethereum.on("accountsChanged", async accounts => {
          if (accounts.length > 0) {
            const isTxnsAllowed = Boolean(accounts[0]) && netId.toString() === process.env.REACT_APP_ETH_NETWORK;
            await this.storeMetamaskDetails(Boolean(accounts[0]), toChecksumAddress(accounts[0]), netId, isTxnsAllowed);
          } else {
            await this.storeMetamaskDetails(false, "0x0", 0, false);
          }
        });
      } catch (_error) {
        // User has denied account access...
        await this.storeMetamaskDetails(false, "0x0", 0, false);
      }
    }
  };

  loadMetamaskDetails = async () => {
    const { metamaskDetails, updateTokenBalance, updateTokenAllowance, isLoggedIn } = this.props;

    if (!isLoggedIn) {
      this.storeMetamaskDetails(false, "0x0", 0, false);
      return;
    }

    if (window.ethereum) {
      const ethereum = window.ethereum;

      try {
        const chainId = ethereum.chainId;
        const netId = parseInt(chainId);

        const accounts = await ethereum.request({ method: "eth_requestAccounts" });

        if (accounts.length > 0) {
          const isTxnsAllowed = Boolean(accounts[0]) && netId.toString() === process.env.REACT_APP_ETH_NETWORK;
          await this.storeMetamaskDetails(Boolean(accounts[0]), toChecksumAddress(accounts[0]), netId, isTxnsAllowed);

          // Subscribe to Metamask for the connection already exists
          this.subscribeToMetamask();

          await updateTokenBalance(metamaskDetails);
          await updateTokenAllowance(metamaskDetails);
        } else {
          await this.storeMetamaskDetails(false, "0x0", 0, false);
        }
      } catch (_error) {
        // User denied account access...
        this.storeMetamaskDetails(false, "0x0", 0, false);
      }
    }
  };

  generateNotificationMessage = () => {
    const { metamaskDetails, isLoggedIn } = this.props;

    var message = "";

    if (!isLoggedIn) {
      message = "User need to login to the Staking DApp.";
      return message;
    }

    const networkName = NetworkNames.find(nw => nw.networkId.toString() === process.env.REACT_APP_ETH_NETWORK)
      .networkName;

    if (window.ethereum) {
      if (!metamaskDetails.isConnected) {
        message = (
          <span>
            Click to connect with Metamask <button onClick={this.connectMetamask}>Connect</button>
          </span>
        );
      } else if (metamaskDetails.networkId !== process.env.REACT_APP_ETH_NETWORK) {
        message = "Metamask needs to be connected to network " + networkName;
      } else if (metamaskDetails.account === null || metamaskDetails.account === "0x0") {
        message = "Click to connect with Metamask";
      } else {
        message = "Metamask connected successfully " + networkName;
      }
    } else {
      message = "Need to have Metamask enabled browser";
    }

    return message;
  };

  componentDidMount = async () => {
    await this.loadMetamaskDetails();
  };

  storeMetamaskDetails = async (isConnected, account, networkId, isTxnsAllowed) => {
    const { updateMetamaskDetails } = this.props;
    await updateMetamaskDetails(isConnected, account, networkId, isTxnsAllowed);
  };

  render() {
    const { metamaskDetails, isLoggedIn } = this.props;
    const message = this.generateNotificationMessage();

    // Metamask Notifications should be shown only after user is loggedIn
    let showNotificationBar = false;
    if (isLoggedIn && !metamaskDetails.isTxnsAllowed) showNotificationBar = true;

    return (
      <NotificationBar
        type={notificationBarTypes.WARNING}
        message={message}
        icon={NotificationIcon}
        showNotification={showNotificationBar}
        buttonClick={this.connectMetamask}
      />
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
  metamaskDetails: state.metamaskReducer.metamaskDetails,
  walletList: state.user.walletList,
});

const mapDispatchToProps = dispatch => ({
  updateMetamaskDetails: (isConnected, account, networkId, isTxnsAllowed) =>
    dispatch(metamaskActions.updateMetamaskDetails(isConnected, account, networkId, isTxnsAllowed)),
  updateTokenBalance: metamaskDetails => dispatch(tokenActions.updateTokenBalance(metamaskDetails)),
  updateTokenAllowance: metamaskDetails => dispatch(tokenActions.updateTokenAllowance(metamaskDetails)),
  fetchWallet: () => dispatch(userWalletActions.fetchWallet()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Notification));
