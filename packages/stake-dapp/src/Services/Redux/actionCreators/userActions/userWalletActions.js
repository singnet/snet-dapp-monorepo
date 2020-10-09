import { API } from "aws-amplify";
import isEmpty from "lodash/isEmpty";
import { APIEndpoints, APIPaths } from "../../../AWS/APIEndpoints";
import { initializeAPIOptions } from "../../../../Utils/API";
import { fetchAuthenticatedUser } from "./loginActions";

export const SET_WALLET_LIST = "SET_WALLET_LIST";
export const ADD_WALLET_TO_WALLET_LIST = "ADD_WALLET_TO_WALLET_LIST";

export const addWalletToWalletList = address => dispatch => {
  const _wallet = {
    address,
    is_default: 0,
    type: "METAMASK",
    status: 1,
  };
  dispatch({ type: ADD_WALLET_TO_WALLET_LIST, payload: { ..._wallet } });
};

// Fetch User Wallet Association Details
const fetchWalletAPI = token => {
  const apiName = APIEndpoints.ORCHESTRATOR.name;
  const apiPath = APIPaths.WALLET;
  const apiOptions = initializeAPIOptions(token);
  return API.get(apiName, apiPath, apiOptions);
};

export const fetchWallet = () => async dispatch => {
  try {
    const { token } = await dispatch(fetchAuthenticatedUser());
    const response = await fetchWalletAPI(token);

    return dispatch(fetchWalletSuccess(response));
  } catch (_error) {
    // In case of error leave it to default
  }
};

const fetchWalletSuccess = response => dispatch => {
  if (!isEmpty(response.data.wallets)) {
    dispatch(updateWalletList(response.data.wallets));
  }
};

const updateWalletList = data => dispatch => {
  dispatch({ type: SET_WALLET_LIST, payload: { walletList: data, isWalletListLoaded: true } });
};

// Associate the wallet to User - Set Wallet List in the backend
const registerWalletAPI = (token, address) => {
  const apiName = APIEndpoints.ORCHESTRATOR.name;
  const apiPath = APIPaths.REGISTER_WALLET;
  const type = "METAMASK";
  const postObj = { address, type };
  const apiOptions = initializeAPIOptions(token, postObj);
  return API.post(apiName, apiPath, apiOptions);
};

export const registerWallet = address => async dispatch => {
  try {
    const { token } = await dispatch(fetchAuthenticatedUser());
    await registerWalletAPI(token, address);
    dispatch(registerWalletSuccess(address));
  } catch (exp) {
    // This request is fire and forget as it works in the backgroud for now
    // Update the list in case if User address is added from other portal at the same time
    //dispatch(fetchWallet());
    dispatch(addWalletToWalletList(address));
  }
};

const registerWalletSuccess = address => dispatch => {
  // On Success Update the Wallet List
  //dispatch(fetchWallet());
  dispatch(addWalletToWalletList(address));
};
