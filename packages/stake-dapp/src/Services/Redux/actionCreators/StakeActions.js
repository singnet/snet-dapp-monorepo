import { API } from "aws-amplify";
import BigNumber from "bignumber.js";
import { APIError } from "shared/dist/utils/API";

import { APIEndpoints, APIPaths } from "../../AWS/APIEndpoints";
import { initializeAPIOptions } from "../../../Utils/API";
import { fetchAuthenticatedUser } from "./userActions/loginActions";
import { getStakeInfo, getUserStakeBalance, getRecentStakeWindow } from "../../../Utils/BlockchainHelper";
import { loaderActions } from "./";

export const UPDATE_ACTIVE_STAKE_WINDOW = "UPDATE_ACTIVE_STAKE_WINDOW";
export const UPDATE_ACTIVE_STAKE_WINDOW_BLOCKCHAIN = "UPDATE_ACTIVE_STAKE_WINDOW_BLOCKCHAIN";
export const UPDATE_RECENT_STAKE_WINDOW_BLOCKCHAIN = "UPDATE_RECENT_STAKE_WINDOW_BLOCKCHAIN";

export const UPDATE_ACTIVE_STAKES = "UPDATE_ACTIVE_STAKES";
export const UPDATE_CLAIM_STAKES = "UPDATE_CLAIM_STAKES";
export const UPDATE_STAKE_TRANSACTIONS = "UPDATE_STAKE_TRANSACTIONS";

export const UPDATE_STAKE_SUMMARY = "UPDATE_STAKE_SUMMARY";
export const UPDATE_STAKE_BALANCE = "UPDATE_STAKE_BALANCE";

export const UPDATE_ACTIVE_STAKE_AUTO_RENEWAL = "UPDATE_ACTIVE_STAKE_AUTO_RENEWAL";
export const UPDATE_INCUBATING_STAKE_AUTO_RENEWAL = "UPDATE_INCUBATING_STAKE_AUTO_RENEWAL";

export const UPDATE_CLAIM_STAKES_ACTIONS = "UPDATE_CLAIM_STAKES_ACTIONS";

export const UPDATE_STAKE_WINDOWS_SUMMARY = "UPDATE_STAKE_WINDOWS_SUMMARY";
export const UPDATE_STAKE_OVERALL_SUMMARY = "UPDATE_STAKE_OVERALL_SUMMARY";

export const updateClaimStakesActions = claimAction => ({
  type: UPDATE_CLAIM_STAKES_ACTIONS,
  payload: claimAction,
});

export const updateActiveStakeAutoRenewal = activeAutoRenewal => ({
  type: UPDATE_ACTIVE_STAKE_AUTO_RENEWAL,
  payload: activeAutoRenewal,
});

export const updateIncubatingStakeAutoRenewal = incubatingAutoRenewal => ({
  type: UPDATE_INCUBATING_STAKE_AUTO_RENEWAL,
  payload: incubatingAutoRenewal,
});

export const setActiveStakeWindowDetails = stakeWindowDetails => ({
  type: UPDATE_ACTIVE_STAKE_WINDOW,
  payload: stakeWindowDetails,
});

export const setActiveStakeWindowDetailsFromBlockchain = stakeWindowDetails => ({
  type: UPDATE_ACTIVE_STAKE_WINDOW_BLOCKCHAIN,
  payload: stakeWindowDetails,
});

export const setRecentStakeWindowFromBlockchain = recentStakeWindowDetails => ({
  type: UPDATE_RECENT_STAKE_WINDOW_BLOCKCHAIN,
  payload: recentStakeWindowDetails,
});

export const setRecentStakeWindow = recentStakeWindowDetails => ({
  type: UPDATE_RECENT_STAKE_WINDOW_BLOCKCHAIN,
  payload: recentStakeWindowDetails,
});

export const setActiveStakes = activeStakes => ({
  type: UPDATE_ACTIVE_STAKES,
  payload: activeStakes,
});

export const setClaimStakes = claimStakes => ({
  type: UPDATE_CLAIM_STAKES,
  payload: claimStakes,
});

export const setTransactionStakes = txnStakes => ({
  type: UPDATE_STAKE_TRANSACTIONS,
  payload: txnStakes,
});

export const setStakeSummary = stakeSummary => ({
  type: UPDATE_STAKE_SUMMARY,
  payload: stakeSummary,
});

export const setUserStakeBalance = stakeBalance => ({
  type: UPDATE_STAKE_BALANCE,
  payload: stakeBalance,
});

export const setStakeOverallSummary = stakeOverallSummary => ({
  type: UPDATE_STAKE_OVERALL_SUMMARY,
  payload: stakeOverallSummary,
});

export const setAllStakeWindowsSummary = allStakeWindows => ({
  type: UPDATE_STAKE_WINDOWS_SUMMARY,
  payload: allStakeWindows,
});

// **************************
// Active Stake Functionality
// **************************

const fetchCurrentActiveStakeWindowAPI = metamaskDetails => async dispatch => {
  let staker = "0x0";
  const status = "OPEN";
  if (metamaskDetails.isTxnsAllowed) {
    staker = metamaskDetails.account;
  }

  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.STAKE.name;
  const apiPath = APIPaths.ACTIVE_STAKE_WINDOW(status, staker);
  const apiOptions = initializeAPIOptions(token);
  return await API.get(apiName, apiPath, apiOptions);
};

export const fetchCurrentActiveStakeWindow = metamaskDetails => async dispatch => {
  try {
    dispatch(loaderActions.startStakeWindowLoader());

    const { data, error } = await dispatch(fetchCurrentActiveStakeWindowAPI(metamaskDetails));
    if (error.code) {
      throw new APIError(error.message);
    }

    //console.log("fetchCurrentActiveStakeWindow - ", data);
    const stakeWindowDetails = parseAndTransformStakeWindow(data);
    dispatch(setActiveStakeWindowDetails(stakeWindowDetails));

    // Get the latest State from Blockchain
    dispatch(fetchUserStakeFromBlockchain(metamaskDetails, stakeWindowDetails.stakeMapIndex));

    dispatch(loaderActions.stopStakeWindowLoader());
  } catch (error) {
    dispatch(loaderActions.stopStakeWindowLoader());
    throw error;
  }
};

const parseAndTransformStakeWindow = data => {
  if (data.length === 0) {
    return {};
  }

  // There should be only one active window at a given time
  const stakeWindow = data[0];

  const stakeWindowDetails = {
    stakeMapIndex: stakeWindow.blockchain_id,
    startPeriod: stakeWindow.start_period,
    submissionEndPeriod: stakeWindow.submission_end_period,
    approvalEndPeriod: stakeWindow.approval_end_period,
    requestWithdrawStartPeriod: stakeWindow.request_withdraw_start_period,
    endPeriod: stakeWindow.end_period,
    minStake: stakeWindow.min_stake,
    maxStake: stakeWindow.max_stake,
    windowMaxCap: stakeWindow.window_max_cap,
    openForExternal: stakeWindow.open_for_external,
    windowTotalStake: stakeWindow.total_stake,
    rewardAmount: stakeWindow.reward_amount,
    tokenOperator: stakeWindow.token_operator,
    totalStakers: stakeWindow.no_of_stakers,
    totalStakedAmount: stakeWindow.total_stake_deposited,
    myStake: stakeWindow.pending_stake_amount_for_staker,
    myStakeProcessed: stakeWindow.pending_stake_amount_for_staker,
    myStakeAutoRenewed: BigNumber.sum(
      stakeWindow.auto_renew_amount_for_staker,
      stakeWindow.approved_stake_amount_for_staker
    ).toString(),
    totalAutoRenewAmount: stakeWindow.total_auto_renew_amount,
  };
  //myStake: stakeWindow.stake_amount_for_given_staker_address,
  //myStakeProcessed: stakeWindow.stake_amount_for_given_staker_address,

  return stakeWindowDetails;
};

export const fetchUserStakeFromBlockchain = (metamaskDetails, stakeMapIndex) => async dispatch => {
  if (metamaskDetails.isTxnsAllowed) {
    const { found, pendingForApprovalAmount, approvedAmount, autoRenewal } = await getStakeInfo(
      metamaskDetails,
      stakeMapIndex
    );

    const stakeWindowDetails = {
      myStake: pendingForApprovalAmount,
      autoRenewal: found ? autoRenewal : true,
      approvedAmount,
      userExist: found,
    };
    dispatch(setActiveStakeWindowDetailsFromBlockchain(stakeWindowDetails));
  }
};

// *********************************
// Active User Stakes Functionality
// *********************************

// TODO - Change the address to 0x0 after API error fixes...
const fetchActiveStakesAPI = metamaskDetails => async dispatch => {
  let staker = "0x0";
  if (metamaskDetails.isTxnsAllowed) {
    staker = metamaskDetails.account;
  }

  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.STAKE.name;
  const apiPath = APIPaths.ACTIVE_USER_STAKE(staker);
  const apiOptions = initializeAPIOptions(token);
  return await API.get(apiName, apiPath, apiOptions);
};

export const fetchActiveStakes = metamaskDetails => async dispatch => {
  try {
    dispatch(loaderActions.startActiveStakeLoader());

    const { data, error } = await dispatch(fetchActiveStakesAPI(metamaskDetails));
    if (error.code) {
      throw new APIError(error.message);
    }

    //console.log("fetchActiveStakes - ", data);
    const activeStakes = parseAndTransformStakes(data);

    dispatch(setActiveStakes(activeStakes));
    dispatch(setStakeSummary({ incubatingCount: data.length }));

    dispatch(loaderActions.stopActiveStakeLoader());
  } catch (error) {
    dispatch(loaderActions.stopActiveStakeLoader());
    throw error;
  }
};

// **************************
// Stake Claim Functionality
// **************************

const fetchClaimStakesAPI = metamaskDetails => async dispatch => {
  let staker = "0x0";
  if (metamaskDetails.isTxnsAllowed) {
    staker = metamaskDetails.account;
  }

  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.STAKE.name;
  const apiPath = APIPaths.CLAIM_STAKE(staker);
  const apiOptions = initializeAPIOptions(token);
  return await API.get(apiName, apiPath, apiOptions);
};

export const fetchClaimStakes = metamaskDetails => async dispatch => {
  try {
    dispatch(loaderActions.startClaimStakeLoader());

    const { data, error } = await dispatch(fetchClaimStakesAPI(metamaskDetails));
    if (error.code) {
      throw new APIError(error.message);
    }

    //console.log("fetchClaimStakes - ", data);
    const claimStakes = parseAndTransformStakes(data);
    dispatch(setClaimStakes(claimStakes));
    dispatch(setStakeSummary({ readyToClaimCount: data.length }));

    dispatch(loaderActions.stopClaimStakeLoader());
  } catch (error) {
    dispatch(loaderActions.stopClaimStakeLoader());
    throw error;
  }
};

const parseAndTransformStakes = data => {
  if (data.length === 0) {
    return [];
  }

  // First Section of transformation for the Stake Window
  // Second Section of transformation for the Stake Holder
  const stakes = data.map(stake => ({
    stakeMapIndex: stake.stake_window.blockchain_id,
    startPeriod: stake.stake_window.start_period,
    submissionEndPeriod: stake.stake_window.submission_end_period,
    approvalEndPeriod: stake.stake_window.approval_end_period,
    requestWithdrawStartPeriod: stake.stake_window.request_withdraw_start_period,
    endPeriod: stake.stake_window.end_period,
    minStake: stake.stake_window.min_stake,
    maxStake: stake.stake_window.max_stake,
    windowMaxCap: stake.stake_window.window_max_cap,
    openForExternal: stake.stake_window.open_for_external,
    windowTotalStake: stake.stake_window.total_stake,
    rewardAmount: stake.stake_window.reward_amount,
    tokenOperator: stake.stake_window.token_operator,
    numOfStakers: stake.stake_window.no_of_stakers,
    totalStakedAmount: stake.stake_window.total_stake_deposited,

    staker: stake.stake_holder.staker,
    pendingForApprovalAmount: stake.stake_holder.amount_pending_for_approval,
    approvedAmount: stake.stake_holder.amount_approved,
    autoRenewal: stake.stake_holder.auto_renewal,
    stakedBlockNumber: stake.stake_holder.block_no_created,
    refundAmount: stake.stake_holder.refund_amount,
  }));

  return stakes;
};

// **************************************
// User Stake Transactions Functionality
// **************************************

const fetchStakeTransactionsAPI = metamaskDetails => async dispatch => {
  let staker = "0x0";
  if (metamaskDetails.isTxnsAllowed) {
    staker = metamaskDetails.account;
  }

  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.STAKE.name;
  const apiPath = APIPaths.STAKE_TRANSACTIONS(staker);
  const apiOptions = initializeAPIOptions(token);
  return await API.get(apiName, apiPath, apiOptions);
};

export const fetchStakeTransactions = metamaskDetails => async dispatch => {
  try {
    dispatch(loaderActions.startTxnStakeLoader());

    const { data, error } = await dispatch(fetchStakeTransactionsAPI(metamaskDetails));
    if (error.code) {
      throw new APIError(error.message);
    }

    //console.log("fetchStakeTransactions - ", data);
    const txnStakes = parseAndTransformStakeTransactions(data);
    dispatch(setTransactionStakes(txnStakes));

    dispatch(loaderActions.stopTxnStakeLoader());
  } catch (error) {
    dispatch(loaderActions.stopTxnStakeLoader());
    throw error;
  }
};

const parseAndTransformStakeTransactions = data => {
  if (data.length === 0) {
    return [];
  }

  // First Section of transformation for the Stake Window
  // Second Section of transformation for the Stake Holder
  const stakes = data.map(stake => ({
    stakeMapIndex: stake.stake_window.blockchain_id,
    startPeriod: stake.stake_window.start_period,
    submissionEndPeriod: stake.stake_window.submission_end_period,
    approvalEndPeriod: stake.stake_window.approval_end_period,
    requestWithdrawStartPeriod: stake.stake_window.request_withdraw_start_period,
    endPeriod: stake.stake_window.end_period,
    minStake: stake.stake_window.min_stake,
    maxStake: stake.stake_window.max_stake,
    windowMaxCap: stake.stake_window.window_max_cap,
    openForExternal: stake.stake_window.open_for_external,
    windowTotalStake: stake.stake_window.total_stake,
    rewardAmount: stake.stake_window.reward_amount,
    tokenOperator: stake.stake_window.token_operator,
    numOfStakers: stake.stake_window.no_of_stakers,
    totalStakedAmount: stake.stake_window.total_stake_deposited,

    transactionList: stake.transactions.map(t => ({
      txnHash: t.transaction_hash,
      txnDate: t.transaction_date,
      blockNumber: t.block_no,
      eventName: t.event,
      eventData: parseEventData(t.event_data),
    })),
  }));

  return stakes;
};

const parseEventData = eventData => {
  const jsonStr = eventData.json_str;
  return JSON.parse(
    jsonStr
      .replace(/'/gi, '"')
      .replace(/True/gi, "true")
      .replace(/False/gi, "false")
  );
};

// *********************************
// User Stake Balance Functionality
// *********************************

export const fetchUserStakeBalanceFromBlockchain = metamaskDetails => async dispatch => {
  if (metamaskDetails.isTxnsAllowed) {
    const stakeBalance = await getUserStakeBalance(metamaskDetails);
    dispatch(setUserStakeBalance(stakeBalance.toString()));
  }
};

// *************************************************
// Recent Stake Window from Blockchain Functionality
// *************************************************

const fetchStakeCalculatorDetailsAPI = async () => {
  const url = `${APIEndpoints.STAKE.endpoint}${APIPaths.STAKE_CALCULATOR}`;
  const response = await fetch(url);
  return response.json();
};

export const fetchStakeCalculatorDetails = () => async dispatch => {
  try {
    const { data, error } = await fetchStakeCalculatorDetailsAPI();
    if (error.code) {
      throw new APIError(error.message);
    }

    const recentStakeWindowDetails = {
      startPeriod: data.start_period,
      submissionEndPeriod: data.submission_end_period,
      approvalEndPeriod: data.approval_end_period,
      requestWithdrawStartPeriod: data.request_withdraw_start_period,
      endPeriod: data.end_period,
      minStake: data.min_stake,
      maxStake: data.max_stake,
      windowMaxCap: data.window_max_cap,
      openForExternal: data.open_for_external,
      windowTotalStake: data.total_stake,
      windowRewardAmount: data.reward_amount,
      totalPendingApprovalStake: data.total_stake_pending_for_approval,
      totalAutoRenewAmount: data.total_auto_renew_amount,
    };

    dispatch(setRecentStakeWindow(recentStakeWindowDetails));
  } catch (error) {
    // Leave to default values in case of an error
  }
};

export const fetchRecentStakeWindowFromBlockchain = () => async dispatch => {
  try {
    const recentStakeWindowDetails = await getRecentStakeWindow();
    dispatch(setRecentStakeWindowFromBlockchain(recentStakeWindowDetails));
  } catch (_err) {
    // Leave the defaults in the redux state
  }
};

// *************************************************
// Stake Overall Summary - Public API
// *************************************************

const fetchStakeOverallSummaryAPI = async () => {
  const url = `${APIEndpoints.STAKE.endpoint}${APIPaths.STAKE_OVERALL_SUMMARY}`;
  const response = await fetch(url);
  return response.json();
};

export const fetchStakeOverallSummary = () => async dispatch => {
  try {
    const { data, error } = await fetchStakeOverallSummaryAPI();
    if (error.code) {
      throw new APIError(error.message);
    }

    const stakeOverallSummary = {
      overallStake: data.total_stake_deposited,
      totalUniqueStakers: data.no_of_stakers,
      totalReward: data.total_reward,
    };

    dispatch(setStakeOverallSummary(stakeOverallSummary));
  } catch (error) {
    throw error;
  }
};

// *************************************************
// All Stake Window Summary
// *************************************************

const fetchStakeWindowsSummaryAPI = () => async dispatch => {
  const { token } = await dispatch(fetchAuthenticatedUser());
  const apiName = APIEndpoints.STAKE.name;
  const apiPath = APIPaths.STAKE_WINDOWS_SUMMARY;
  const apiOptions = initializeAPIOptions(token);
  return await API.get(apiName, apiPath, apiOptions);
};

export const fetchStakeWindowsSummary = () => async dispatch => {
  try {
    const { data, error } = await dispatch(fetchStakeWindowsSummaryAPI());
    if (error.code) {
      throw new APIError(error.message);
    }

    const allStakeWindows = parseAndTransformStakeWindows(data);
    dispatch(setAllStakeWindowsSummary(allStakeWindows));
  } catch (error) {
    throw error;
  }
};

const parseAndTransformStakeWindows = data => {
  if (data.length === 0) {
    return [];
  }

  const stakeWindows = data.map(stakeWindow => ({
    stakeMapIndex: stakeWindow.blockchain_id,
    startPeriod: stakeWindow.start_period,
    submissionEndPeriod: stakeWindow.submission_end_period,
    approvalEndPeriod: stakeWindow.approval_end_period,
    requestWithdrawStartPeriod: stakeWindow.request_withdraw_start_period,
    endPeriod: stakeWindow.end_period,
    minStake: stakeWindow.min_stake,
    maxStake: stakeWindow.max_stake,
    windowMaxCap: stakeWindow.window_max_cap,
    openForExternal: stakeWindow.open_for_external,
    windowTotalStake: stakeWindow.total_stake,
    rewardAmount: stakeWindow.reward_amount,
    tokenOperator: stakeWindow.token_operator,
    numOfStakers: stakeWindow.no_of_stakers,
    totalStakedAmount: stakeWindow.total_stake_deposited,
  }));

  return stakeWindows;
};
