import { userPreferenceTypes } from "../../../Utils/user";

export const entityTypeDetails = {
  title: "Entity Type",
  description:
    "You will be able to choose publish and developed as Company Organization, Indivdual / Sole Proprietor / Single Person Business or join an existing approved entity with an invitation.  The first two options require certain amount of information to proceed. ",
};

export const loggedInDetails = {
  subtitle: "This is your Singularlity account that will be associated with your AI Publisher account.",
  description:
    "If you would like to use a different account, you can choose from the options below. If you are an organization, consider registeringa new Singularity account rather using a personal account.",
};

export const loggedOutDetails = {
  subtitle: "Please Login or Signup into Singularitynet to use the portal. ",
  description:
    "To use the portal, please sign up. Lorem ipsum dolor sit amet, per odio adipi scing ea, est an purto libris fastidii, dolor laboramus consectetuer ut eum. An debet expetendis scriptorem ius. Dolorem detracto accusamus mea cu. Nam hendrerit theophrastus ex, vix aeque solet cu.",
};

export const emailPreferencesList = [
  {
    type: userPreferenceTypes.FEATURE_RELEASE,
    description: "I’d like to get new feature annoucements and tips to help imporve my AI services",
  },
  {
    type: userPreferenceTypes.WEEKLY_SUMMARY,
    description: "I’d like to get weekly summary reports of my AI services and account acitivty.",
  },
  {
    type: userPreferenceTypes.COMMENTS_AND_MESSAGES,
    description: "I’d like to get email notifications when users leave comments or send messages ",
  },
];
