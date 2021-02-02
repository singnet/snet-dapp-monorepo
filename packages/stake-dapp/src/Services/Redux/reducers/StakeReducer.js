import { stakeActions } from "../actionCreators";

const InitialRequestDetails = {
  stakeBalance: 0,
  stakeSummary: {
    incubatingCount: 0,
    readyToClaimCount: 0,
  },
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
    myStakeProcessed: 0,
    autoRenewal: true,
    myStakeAutoRenewed: 0,
    totalAutoRenewAmount: 0,
  },
  incubationStakes: [],
  claimStakes: [],
  claimStakesActions: { 0: { disableClaim: false, disableWithdraw: false, disableRestake: false } },
  myTransactions: [],
  recentStakeWindow: {
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
    windowRewardAmount: 0,
    totalPendingApprovalStake: 0,
    totalAutoRenewAmount: 0,
  },
  stakeOverallSummary: {
    overallStake: 0,
    totalUniqueStakers: 0,
    totalReward: 0,
  },
  stakeWindowsSummary: [],
};

const stakeReducer = (state = InitialRequestDetails, action) => {
  switch (action.type) {
    case stakeActions.UPDATE_STAKE_BALANCE: {
      return { ...state, stakeBalance: action.payload };
    }
    case stakeActions.UPDATE_STAKE_SUMMARY: {
      return { ...state, stakeSummary: { ...state.stakeSummary, ...action.payload } };
    }
    case stakeActions.UPDATE_ACTIVE_STAKE_WINDOW: {
      return { ...state, activeStake: action.payload };
    }
    case stakeActions.UPDATE_ACTIVE_STAKE_WINDOW_BLOCKCHAIN: {
      return {
        ...state,
        activeStake: {
          ...state.activeStake,
          myStake: action.payload.myStake,
          autoRenewal: action.payload.autoRenewal,
          userExist: action.payload.userExist,
        },
      };
    }
    case stakeActions.UPDATE_ACTIVE_STAKES: {
      return { ...state, incubationStakes: action.payload };
    }
    case stakeActions.UPDATE_CLAIM_STAKES: {
      return { ...state, claimStakes: action.payload };
    }
    case stakeActions.UPDATE_STAKE_TRANSACTIONS: {
      return { ...state, myTransactions: action.payload };
    }
    case stakeActions.UPDATE_RECENT_STAKE_WINDOW_BLOCKCHAIN: {
      return { ...state, recentStakeWindow: action.payload };
    }
    case stakeActions.UPDATE_ACTIVE_STAKE_AUTO_RENEWAL: {
      return { ...state, activeStake: { ...state.activeStake, autoRenewal: action.payload.autoRenewal } };
    }
    case stakeActions.UPDATE_INCUBATING_STAKE_AUTO_RENEWAL: {
      const _stakeMapIndex = action.payload.stakeMapIndex;
      const _autoRenewal = action.payload.autoRenewal;
      const _currentIncubatingStakes = state.incubationStakes;
      const updatedStakes = _currentIncubatingStakes.map(s =>
        s.stakeMapIndex === _stakeMapIndex ? { ...s, autoRenewal: _autoRenewal } : s
      );

      return { ...state, incubationStakes: updatedStakes };
    }
    case stakeActions.UPDATE_CLAIM_STAKES_ACTIONS: {
      return { ...state, claimStakesActions: { ...state.claimStakesActions, ...action.payload } };
    }
    case stakeActions.UPDATE_STAKE_OVERALL_SUMMARY: {
      return { ...state, stakeOverallSummary: action.payload };
    }
    case stakeActions.UPDATE_STAKE_WINDOWS_SUMMARY: {
      return { ...state, stakeWindowsSummary: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default stakeReducer;
