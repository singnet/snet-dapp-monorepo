export const onboardingSections = {
  SINGULARITY_ACCOUNT: {
    key: 1,
    heading: {
      title: "Lets Get Started",
      description: "Log in or create your SingularityNET account",
    },
  },
  ACCEPT_SERVICE_AGREEMENT: {
    key: 2,
    heading: {
      title: "Singularity AI Publisher's Agreement",
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

export const progressText = ["Singularity Account", "Accept Service Agreement", "Authenticate ID"];

export const individualVerificationStatusList = {
  NOT_STARTED: undefined,
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  FAILED: "FAILED",
  ERROR: "ERROR",
};
