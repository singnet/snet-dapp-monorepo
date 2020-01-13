import OrganizationProfile from "../OrganizationProfile";
import Region from "../Region";
import PublishToBlockchain from "../PublishToBlockchain";
import { GlobalRoutes } from "../../../GlobalRouter/Routes";
import Default from "../_default";

const basePath = GlobalRoutes.ORGANIZATION_SETUP.basePath;

const fullPath = path => `${basePath}${path}`;

export const OrganizationSetupRoutes = {
  DEFAULT_PAGE: {
    name: "default",
    path: fullPath("/"),
    exact: true,
    component: Default,
  },
  ORGANIZATION_PROFILE: {
    name: "organizationprofile",
    path: fullPath("/profile"),
    component: OrganizationProfile,
  },
  REGION: {
    name: "region",
    path: fullPath("/region"),
    component: Region,
  },
  PUBLISH_TO_BLOCKCHAIN: {
    name: "publishtoblockchain",
    path: fullPath("/publish"),
    component: PublishToBlockchain,
  },
};
