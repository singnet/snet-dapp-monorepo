import SnetSDK from "snet-sdk-web";

export const ethereumMethods = {
  REQUEST_ACCOUNTS: "eth_requestAccounts",
};

const DEFAULT_GAS_LIMIT = undefined;
const DEFAULT_GAS_PRICE = undefined;
const ON_ACCOUNT_CHANGE = "accountsChanged";
const ON_NETWORK_CHANGE = "networkChanged";

export const initSDK = async () => {
  let sdk;
  let web3Provider;
  const updateSDK = async () => {
    const chainIdHex = web3Provider.chainId;
    const networkId = parseInt(chainIdHex);

    const config = {
      networkId,
      web3Provider,
      defaultGasLimit: DEFAULT_GAS_LIMIT,
      defaultGasPrice: DEFAULT_GAS_PRICE,
    };
    sdk = new SnetSDK(config);
    await sdk.setupAccount();
  };

  const hasEth = typeof window.ethereum !== "undefined";
  const hasWeb3 = typeof window.web3 !== "undefined";
  try {
    if (hasEth && hasWeb3) {
      web3Provider = window.ethereum;
      await web3Provider.request({ method: ethereumMethods.REQUEST_ACCOUNTS });
      // eslint-disable-next-line require-atomic-updates
      web3Provider.addListener(ON_ACCOUNT_CHANGE, accounts => {
        const event = new CustomEvent("snetMMAccountChanged", { detail: { address: accounts[0] } });
        window.dispatchEvent(event);
      });
      web3Provider.addListener(ON_NETWORK_CHANGE, network => {
        const event = new CustomEvent("snetMMNetworkChanged", { detail: { network } });
        window.dispatchEvent(event);
      });
      await updateSDK();
      return sdk;
    }
  } catch (error) {
    throw error;
  }
};
