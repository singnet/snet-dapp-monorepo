export const serviceCreationSections = {
  PROFILE: {
    key: 1,
    heading: {
      title: "Create Your AI Service Profile",
      description: "Users will see this information about your service on the AI Marketplace",
    },
  },
  DEMO: {
    key: 2,
    heading: {
      title: "Setup Demo",
      description:
        "AI Marketplace allows users to demo your AI service. You will need to setup the  UI/UX demo experience for your service.",
    },
  },
  PRICING_AND_DISTRIBUTION: {
    key: 3,
    heading: {
      title: "Pricing & Distribution",
      description: "Now you will link to your AI service to the platform",
    },
  },
  SUBMIT: {
    key: 4,
    heading: {
      title: "Submit for Review",
      description: "You have completed the required steps for submission",
    },
  },
};

export const serviceCreationStatus = {
  NOT_STARTED: "",
  DRAFT: "DRAFT",
  APPROVAL_PENDING: "APPROVAL_PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  BLOCKCHAIN_SUBMITTED: "BLOCKCHAIN_SUBMITTED",
  PUBLISH_IN_PROGRESS: "PUBLISH_IN_PROGRESS",
  PUBLISHED: "PUBLISHED",
};

export const progressText = ["Ai Service Profile", "Setup Demo", "Pricing & Distribution", "Submit for Review"];

export const serviceData = [
  {
    status: "Submitted For Review",
    feedback: "",
  },
];

export const serviceIdAvailability = {
  AVAILABLE: "AVAILABLE",
  UNAVAILABLE: "UNAVAILABLE",
};
