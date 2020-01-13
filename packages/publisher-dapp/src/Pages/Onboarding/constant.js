export const onboardingSections = {
  SINGULARITY_ACCOUNT: {
    key: 1,
    heading: {
      title: "Lets Get Started",
      description: "You will need to log in or create your SingularityNet account",
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

export const verificationStatuses = {
  NOT_STARTED: "NOT_STARTED",
  SELECTED_ENTITY: "SELECTED_ENTITY",
  ACCEPTED_AGREEMENT: "ACCEPTED_AGREEMENT",
  VERIFICATION_PENDING: "VERIFICATION_PENDING",
};
