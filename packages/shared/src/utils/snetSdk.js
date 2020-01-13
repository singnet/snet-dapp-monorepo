import SnetSDK from "snet-sdk-web";

const DEFAULT_GAS_LIMIT = undefined;
const DEFAULT_GAS_PRICE = undefined;
const ON_ACCOUNT_CHANGE = "accountsChanged";
const ON_NETWORK_CHANGE = "networkChanged";

export const initSDK = async () => {
  let sdk;
  let web3Provider;
  const updateSDK = () => {
    const networkId = web3Provider.networkVersion;
    const config = {
      networkId,
      web3Provider,
      defaultGasLimit: DEFAULT_GAS_LIMIT,
      defaultGasPrice: DEFAULT_GAS_PRICE,
    };
    sdk = new SnetSDK(config);
  };

  const hasEth = typeof window.ethereum !== "undefined";
  const hasWeb3 = typeof window.web3 !== "undefined";
  try {
    if (hasEth && hasWeb3) {
      web3Provider = window.ethereum;
      const accounts = await web3Provider.enable();
      // eslint-disable-next-line require-atomic-updates
      window.web3.eth.defaultAccount = accounts[0];
      web3Provider.addListener(ON_ACCOUNT_CHANGE, accounts => {
        const event = new CustomEvent("snetMMAccountChanged", { detail: { address: accounts[0] } });
        window.dispatchEvent(event);
      });
      web3Provider.addListener(ON_NETWORK_CHANGE, network => {
        const event = new CustomEvent("snetMMNetworkChanged", { detail: { network } });
        window.dispatchEvent(event);
      });
      updateSDK();
      return sdk;
    }
  } catch (error) {
    throw error;
  }
};
