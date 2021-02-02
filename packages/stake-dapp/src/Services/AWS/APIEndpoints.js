export const APIEndpoints = {
  REGISTRY: {
    name: "Registry",
    endpoint: process.env.REACT_APP_REGISTRY_ENDPOINT,
  },
  USER: {
    name: "User",
    endpoint: process.env.REACT_APP_USER_ENDPOINT,
  },
  UTILITY: {
    name: "utility",
    endpoint: process.env.REACT_APP_UTILITY_ENDPOINT,
  },
  STAKE: {
    name: "STAKE",
    endpoint: process.env.REACT_APP_STAKE_ENDPOINT,
  },
  ORCHESTRATOR: {
    name: "Orchestrator",
    endpoint: process.env.REACT_APP_ORCHESTRATOR_ENDPOINT,
  },
};

export const APIPaths = {
  USER_PREFERENCES: "/user/preference",
  WALLET: "/wallet",
  REGISTER_WALLET: "/wallet/register",
  ACTIVE_STAKE_WINDOW: (status, staker) => `/stake-window?status=${status}&staker=${staker}`,
  ACTIVE_USER_STAKE: staker => `/stake-holder/active?address=${staker}`,
  CLAIM_STAKE: staker => `/stake-holder/claim?address=${staker}`,
  STAKE_TRANSACTIONS: staker => `/transactions?address=${staker}`,
  STAKE_OVERALL_SUMMARY: "/stake-summary",
  STAKE_WINDOWS_SUMMARY: "/stake-windows",
  STAKE_CALCULATOR: "/stake-calculator",
};
