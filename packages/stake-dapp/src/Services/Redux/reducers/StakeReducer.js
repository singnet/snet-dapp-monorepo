import { stakeActions } from "../actionCreators";

const InitialRequestDetails = {
  activeStake: {
    stakeMapIndex: 0,
    startPeriod: 0,
    submissionEndPeriod: 0,
    approvalEndPeriod: 0,
    requestWithdrawStartPeriod: 0,
    endPeriod: 0,
    minStake: 0,
    maxStake: 0,
    windowMaxCap: 0,
    openForExternal: false,
    windowTotalStake: 0,
    rewardAmount: 0,
    tokenOperator: "0x0",
    totalStakers: 0,
    totalStakedAmount: 0,
    myStake: 0,
  },
  incubationStakes: [],
  claimStakes: [],
  myTransactions: [],
};

const stakeReducer = (state = InitialRequestDetails, action) => {
  switch (action.type) {
    case stakeActions.UPDATE_ACTIVE_STAKE_WINDOW: {
      return { ...state, activeStake: action.payload };
    }
    case stakeActions.UPDATE_ACTIVE_STAKES: {
      return { ...state, incubationStakes: action.payload };
    }
    case stakeActions.UPDATE_CLAIM_STAKES: {
      return { ...state, claimStakes: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default stakeReducer;
