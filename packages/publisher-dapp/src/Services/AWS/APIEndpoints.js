export const APIEndpoints = {
  REGISTRY: {
    name: "Registry",
    endpoint: process.env.REACT_APP_REGISTRY_ENDPOINT,
  },
  USER: {
    name: "User",
    endpoint: process.env.REACT_APP_USER_ENDPOINT,
  },
  SIGNER: {
    name: "signer",
    endpoint: process.env.REACT_APP_SIGNER_ENDPOINT,
  },
  UTILITY: {
    name: "utility",
    endpoint: process.env.REACT_APP_UTILITY_ENDPOINT,
  },
  VERIFICATION: {
    name: "verification",
    endpoint: process.env.REACT_APP_VERIFICATION_ENDPOINT,
  },
};

export const APIPaths = {
  USER_PREFERENCES: "/user/preference",
  ORG_SETUP: "/org",
  CREATE_ORG: "/org/create",
  GET_MEMBERS: orgUuid => `/org/${orgUuid}/member`,
  GET_MEMBER_STATUS: (orgUuid, username) => `/org/${orgUuid}/member/${username}`,
  INVITE_MEMBERS: orgUuid => `/org/${orgUuid}/member/invite`,
  PUBLISH_MEMBERS: orgUuid => `/org/${orgUuid}/member/publish`,
  PUBLISH_TO_IPFS: orgUuid => `/org/${orgUuid}/ipfs_publish`,
  SAVE_TRANSACTION: orgUuid => `/org/${orgUuid}/transaction`,
  ACCEPT_INVITATION: "/org/member/register",
  VERIFY_INIVITATION: "/org/member/verify",
  AI_SERVICE_LIST: orgUuid => `/org/${orgUuid}/services`,
  AI_CREATE_SERVICE: orgUuid => `/org/${orgUuid}/service`,
  SAVE_AI_SERVICE: (orgUuid, serviceUuid) => `/org/${orgUuid}/service/${serviceUuid}/save`,
  SUBMIT_AI_SERVICE: (orgUuid, serviceUuid) => `/org/${orgUuid}/service/${serviceUuid}/submit`,
  PUBLISH_TO_BLOCKCHAIN: (orgUuid, serviceUuid) => `/org/${orgUuid}/service/${serviceUuid}/ipfs_publish`,
  FETCH_AI_SERVICE: (orgUuid, serviceUuid) => `/org/${orgUuid}/service/${serviceUuid}`,
  AI_SERVICE_ID_VALIDATE: (orgUuid, serviceId) => `/org/${orgUuid}/verify?service_id=${serviceId}`,
  SAVE_SERVICE_TRANSACTION: (orgUuid, serviceUuid) => `/org/${orgUuid}/service/${serviceUuid}/transaction`,
  FREE_CALL_SIGNER_ADDRESS: "/freecall/signer_address",
  UPLOAD_FILE: "/upload",
  USER_VERIFICATION_INITIATE: "/initiate",
  USER_VERIFICATION_STATUS: "/status",
};
