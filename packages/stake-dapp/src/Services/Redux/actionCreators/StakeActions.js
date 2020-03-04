import { API } from "aws-amplify";

import { APIError } from "shared/dist/utils/API";

import { APIEndpoints, APIPaths } from "../../AWS/APIEndpoints";
import { initializeAPIOptions } from "../../../Utils/API";
import { fetchAuthenticatedUser } from "./userActions/loginActions";

export const UPDATE_ACTIVE_STAKE_WINDOW = "UPDATE_ACTIVE_STAKE_WINDOW";
export const UPDATE_ACTIVE_STAKES = "UPDATE_ACTIVE_STAKES";
export const UPDATE_CLAIM_STAKES = "UPDATE_CLAIM_STAKES";

export const setActiveStakeWindowDetails = stakeWindowDetails => ({
  type: UPDATE_ACTIVE_STAKE_WINDOW,
  payload: stakeWindowDetails,
});

export const setActiveStakes = activeStakes => ({
  type: UPDATE_ACTIVE_STAKES,
  payload: activeStakes,
});

export const setClaimStakes = claimStakes => ({
  type: UPDATE_CLAIM_STAKES,
  payload: claimStakes,
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
    //dispatch(loaderActions.startRequestLoader);

    const { data, error } = await dispatch(fetchCurrentActiveStakeWindowAPI(metamaskDetails));
    if (error.code) {
      throw new APIError(error.message);
    }

    //console.log("fetchCurrentActiveStakeWindow - ", data);
    const stakeWindowDetails = parseAndTransformStakeWindow(data[0]);
    dispatch(setActiveStakeWindowDetails(stakeWindowDetails));

    //dispatch(loaderActions.stopRequestLoader);
  } catch (error) {
    //dispatch(loaderActions.stopRequestLoader);
    throw error;
  }
};

const parseAndTransformStakeWindow = data => {
  const stakeWindowDetails = {
    stakeMapIndex: data.blockchain_id,
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
    rewardAmount: data.reward_amount,
    tokenOperator: data.token_operator,
    totalStakers: data.no_of_stakers,
    totalStakedAmount: data.total_stake_deposited,
    myStake: data.stake_amount_for_given_staker_address,
  };

  return stakeWindowDetails;
};

// **************************
// Active Stake Functionality
// **************************

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
    //dispatch(loaderActions.startRequestLoader);

    const { data, error } = await dispatch(fetchActiveStakesAPI(metamaskDetails));
    if (error.code) {
      throw new APIError(error.message);
    }

    //console.log("fetchActiveStakes - ", data);
    dispatch(setActiveStakes(data));

    //dispatch(loaderActions.stopRequestLoader);
  } catch (error) {
    //dispatch(loaderActions.stopRequestLoader);
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
    //dispatch(loaderActions.startRequestLoader);

    const { data, error } = await dispatch(fetchClaimStakesAPI(metamaskDetails));
    if (error.code) {
      throw new APIError(error.message);
    }

    //console.log("fetchClaimStakes - ", data);
    const activeStakes = parseAndTransformStakes(data);
    dispatch(setClaimStakes(activeStakes));

    //dispatch(loaderActions.stopRequestLoader);
  } catch (error) {
    //dispatch(loaderActions.stopRequestLoader);
    throw error;
  }
};

const parseAndTransformStakes = data => {
  if (data.length === 0) {
    return [];
  }

  // TODO - There are hard codes, need to fix once the API changes are completed
  // First Section of transformation for the Stake Window
  // Second Section of transformation for the Stake Holder
  const stakes = data.map(stake => ({
    stakeMapIndex: stake.stake_holder.blockchain_id,
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
    numOfStakers: 0, //stake.stake_window.no_of_stakers,

    staker: stake.stake_holder.staker,
    pendingForApprovalAmount: stake.stake_holder.amount_pending_for_approval,
    approvedAmount: stake.stake_holder.amount_approved,
    autoRenewal: stake.stake_holder.auto_renewal,
    stakedBlockNumber: stake.stake_holder.block_no_created,
  }));

  return stakes;
};

// TODO - Sample Structured returned from the API - TO BE Deleted from this file after the complete implementation:

/* 
  blockchain_id: 100
  start_period: 1582542242
  submission_end_period: 1582742242
  approval_end_period: 1582842242
  request_withdraw_start_period: 1583142242
  end_period: 1583242242
  min_stake: 100000000
  max_stake: 1000000000000
  window_max_cap: 100000000000000
  open_for_external: true
  total_stake: 0
  reward_amount: 100000
  token_operator: "0x0"
*/

// TODO - Sample Structure for Claims

/*

{
    "status": "success",
    "data": [
        {
            "stake_holder": {
                "blockchain_id": 101,
                "staker": "0xC4f3BFE7D69461B7f363509393D44357c084404c",
                "amount_pending_for_approval": 20000000000,
                "amount_approved": 0,
                "auto_renewal": true,
                "block_no_created": 12345
            },
            "stake_window": {
                "blockchain_id": 101,
                "start_period": 1572618187,
                "submission_end_period": 1572877387,
                "approval_end_period": 1573136587,
                "request_withdraw_start_period": 1574691787,
                "end_period": 1575123787,
                "min_stake": 100000000,
                "max_stake": 1000000000000,
                "window_max_cap": 100000000000000,
                "open_for_external": true,
                "total_stake": 0,
                "reward_amount": 100000,
                "token_operator": "0x0"
            }
        },
        {
            "stake_holder": {
                "blockchain_id": 102,
                "staker": "0xC4f3BFE7D69461B7f363509393D44357c084404c",
                "amount_pending_for_approval": 30000000000,
                "amount_approved": 0,
                "auto_renewal": true,
                "block_no_created": 12346
            },
            "stake_window": {
                "blockchain_id": 102,
                "start_period": 1575210187,
                "submission_end_period": 1575469387,
                "approval_end_period": 1575728587,
                "request_withdraw_start_period": 1577283787,
                "end_period": 1577715787,
                "min_stake": 200000000,
                "max_stake": 2000000000000,
                "window_max_cap": 200000000000000,
                "open_for_external": true,
                "total_stake": 0,
                "reward_amount": 200000,
                "token_operator": "0x0"
            }
        }
    ],
    "error": {}
}

*/
