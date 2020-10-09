import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Typography from "@material-ui/core/Typography";
import NoMetamaskImg from "shared/dist/assets/images/NoMetamask.png";
import SNETButton from "shared/dist/components/SNETButton";

import { useStyles } from "./styles";
import { metamaskActions } from "../../Services/Redux/actionCreators";
import { toChecksumAddress } from "../../Utils/GenHelperFunctions";

const stateSelector = state => ({
  metamaskDetails: state.metamaskReducer.metamaskDetails,
});

const NoMetamask = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { metamaskDetails } = useSelector(state => stateSelector(state));

  const handleConnect = () => {
    connectMetamask();
  };

  const connectMetamask = async () => {
    if (window.ethereum) {
      try {
        const ethereum = window.ethereum;

        const chainId = ethereum.chainId;
        const netId = parseInt(chainId);

        // await ethereum.request({ method: 'eth_accounts' });
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });

        if (accounts.length > 0) {
          const isTxnsAllowed = Boolean(accounts[0]) && netId.toString() === process.env.REACT_APP_ETH_NETWORK;
          await storeMetamaskDetails(Boolean(accounts[0]), toChecksumAddress(accounts[0]), netId, isTxnsAllowed);
        }

        // Subscribe to Metamask after connection
        subscribeToMetamask();
      } catch (_error) {
        // User denied account access...
        storeMetamaskDetails(false, "0x0", 0, false);
      }
    }
  };

  const subscribeToMetamask = async () => {
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
            await storeMetamaskDetails(Boolean(accounts[0]), toChecksumAddress(accounts[0]), netId, isTxnsAllowed);
          } else {
            await storeMetamaskDetails(false, "0x0", 0, false);
          }
        });
      } catch (_error) {
        // User has denied account access...
        await storeMetamaskDetails(false, "0x0", 0, false);
      }
    }
  };

  const storeMetamaskDetails = async (isConnected, account, networkId, isTxnsAllowed) => {
    await dispatch(metamaskActions.updateMetamaskDetails(isConnected, account, networkId, isTxnsAllowed));
  };

  if (metamaskDetails.isTxnsAllowed) {
    return null;
  }

  return (
    <div className={classes.noMetamaskConnectedContainer}>
      <img src={NoMetamaskImg} alt="Metamask Not Connected" />
      <Typography className={classes.noMetamaskTitle}>Metamask not installed or connected.</Typography>
      <Typography className={classes.noMetamaskDesc}>
        Please install or enable Metamask to view the contents of this page.{" "}
        <span>
          <a href="https://metamask.io/" title="Click Here" target="_new">
            Click here{" "}
          </a>
          to learn more about Metamask and how to use it.
        </span>
      </Typography>
      <SNETButton color="primary" variant="contained" children="connect metamask" onClick={handleConnect} />
    </div>
  );
};

export default NoMetamask;
