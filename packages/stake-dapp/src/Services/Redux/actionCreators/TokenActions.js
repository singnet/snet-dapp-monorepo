import { getTokenBalance, getTokenAllowance } from "../../../Utils/BlockchainHelper";

export const UPDATE_TOKEN_BALANCE = "UPDATE_TOKEN_BALANCE";
export const UPDATE_TOKEN_ALLOWANCE = "UPDATE_TOKEN_ALLOWANCE";

// Fetching The the Token Balance
export const updateTokenBalance = metamaskState => async dispatch => {
  let tokenBalance = 0;
  try {
    tokenBalance = await getTokenBalance(metamaskState);
    dispatch({ type: UPDATE_TOKEN_BALANCE, payload: tokenBalance });
  } catch (_error) {
    dispatch({ type: UPDATE_TOKEN_BALANCE, payload: tokenBalance });
  }
};

// Fetching The the Token Allowance
export const updateTokenAllowance = metamaskState => async dispatch => {
  var tokenAllowance = 0;
  try {
    tokenAllowance = await getTokenAllowance(metamaskState);
    dispatch({ type: UPDATE_TOKEN_ALLOWANCE, payload: tokenAllowance });
  } catch (_error) {
    dispatch({ type: UPDATE_TOKEN_ALLOWANCE, payload: tokenAllowance });
  }
};
