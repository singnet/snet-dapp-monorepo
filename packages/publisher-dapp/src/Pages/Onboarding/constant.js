export const onboardingSections = {
  SINGULARITY_ACCOUNT: {
    key: 2,
    heading: {
      title: "Let's Get Started",
      description: "Log in or create your SingularityNET account",
    },
  },
  ACCEPT_SERVICE_AGREEMENT: {
    key: 1,
    heading: {
      title: "SingularityNet AI Publisher's Agreement",
      description: "Please review and agree to the terms to continue",
    },
  },
  AUTHENTICATE_ID: {
    key: 3,
    heading: {
      title: "Authenticate Organization",
      description: "Please provide your information.",
    },
  },
};

export const progressText = ["Accept Service Agreement", "SingularityNet Account", "Authenticate ID"];

export const individualVerificationStatusList = {
  NOT_STARTED: undefined,
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  FAILED: "FAILED",
  ERROR: "ERROR",
  CHANGE_REQUESTED: "CHANGE_REQUESTED",
};
export const organizationIdAvailability = {
  AVAILABLE: "AVAILABLE",
  UNAVAILABLE: "UNAVAILABLE",
};

export const orgVerificationStatus = {
  NOT_STARTED: undefined,
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  CHANGE_REQUESTED: "CHANGE_REQUESTED",
};
