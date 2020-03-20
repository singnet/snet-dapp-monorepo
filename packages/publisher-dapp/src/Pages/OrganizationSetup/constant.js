import { OrganizationSetupRoutes } from "./OrganizationSetupRouter/Routes";

export const organizationSetupSections = {
  ORGANIZATION_PROFILE: {
    key: 1,
    heading: {
      title: "Organization Setup",
      description: "Users will see your organization’s profile information on the AI Marketplace",
    },
    route: OrganizationSetupRoutes.ORGANIZATION_PROFILE,
  },
  REGION: {
    key: 2,
    heading: {
      title: "Organization Setup",
      description: "You can configure how all AI services are optimized by regions",
    },
    route: OrganizationSetupRoutes.REGION,
  },
  PUBLISH_TO_BLOCKCHAIN: {
    key: 3,
    heading: { title: "Organization Setup", description: "The final step will publish your company to the blockchain" },
    route: OrganizationSetupRoutes.PUBLISH_TO_BLOCKCHAIN,
  },
};

export const progressText = ["Organization Profile", "Region / Group", "Publish To Blockchain"];
