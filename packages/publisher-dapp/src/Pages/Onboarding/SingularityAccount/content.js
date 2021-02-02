import { userPreferenceTypes } from "../../../Utils/user";

export const entityTypeDetails = {
  title: "Entity Type",
  description:
    "You will be able to publish and develop as an Organization, Indivdual / Sole Proprietor / Single Person Business or join an existing approved entity with an invitation. The first two options require certain amount of information to proceed.",
};

export const loggedInDetails = {
  subtitle: "This is your Singularity account that will be associated with your AI Publisher account.",
  description:
    "If you are an organization, it is advisable to register a corresponding SingularityNET account rather using a personal account.",
};

export const loggedOutDetails = {
  subtitle: "Please Login or Signup into Singularitynet to use the portal.",
  description: "To use the portal, please sign in or sign up.",
};

export const emailPreferencesList = [
  {
    type: userPreferenceTypes.FEATURE_RELEASE,
    description: "I’d like to get new feature announcements and tips to help improve my AI services.",
  },
  {
    type: userPreferenceTypes.WEEKLY_SUMMARY,
    description: " I’d like to receive weekly summary reports of my AI services.",
  },
  {
    type: userPreferenceTypes.COMMENTS_AND_MESSAGES,
    description: "I’d like to receive email notifications when users leave comments.",
  },
];

export const verifyInvitationCodeForm = {
  id: "code",
  name: "code",
  label: "Invitation Code",
};
