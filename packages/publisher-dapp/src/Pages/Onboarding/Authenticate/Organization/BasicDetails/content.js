export const basicDetailsFormData = {
  ORG_ID: {
    id: "Organization id",
    name: "id",
    label: "Org id",
    description: "The org id is unique identification for the company.",
  },
  ORGANIZATION_NAME: {
    id: "organization Name - 15/50 char",
    name: "name",
    label: "Organization Name",
    description: `The organization name will be displayed on the AI Marketplace.`,
  },
  DUNS: {
    id: "DUNS Number",
    name: "duns",
    label: "DUNS Number",
    helperText: "",
    description: `The Dun & Bradstreet D‑U‑N‑S Number is a unique nine-digit identifier for businesses. Enter your DUNS number in the field provided. Please note that DUNS Number verification may take up to 5 days.`,
  },
  WEBSITE: {
    id: "Organization Website URL",
    name: "website",
    label: "Organization Website URL",
    helperText: "",
    description: `Your organization’s website must be publicly available and the domain name must be associated with your organization.`,
  },
  PHONE: {
    id: "Phone Number - 15/50 char",
    name: "phone",
    label: "Phone Number",
    description: `Please include your country code. For example +1-800-555-1234.`,
  },
  REGISTRATION_ID_TYPE: {
    id: "Identity Type - 15/50 char",
    name: "registrationType",
    label: "Identity ID Type",
    description: `Please mention the type of the proof for identification`,
  },
  REGISTRATION_ID: {
    id: "ID Number - 15/50 char",
    name: "registrationId",
    label: "Identity Number",
    description: `Please provide the number of the Identity proof mentioned above.`,
  },
};
export const orgIdAvailability = {
  AVAILABLE: "AVAILABLE",
  UNAVAILABLE: "UNAVAILABLE",
};
