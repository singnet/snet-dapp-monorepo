import Profile from "../Profile";
import Demo from "../Demo";
import PricingDistribution from "../PricingDistribution";
import Submit from "../Submit";
import { GlobalRoutes } from "../../../GlobalRouter/Routes";
import Default from "../_default";

const basePath = GlobalRoutes.AI_SERVICE_CREATION.path;

const fullPath = path => `${basePath}${path}`;

const matchRegexPattern = path => {
  const patternString = `org\\/[^]*\\/service\\/[^]*\\/create\\${path}`;
  return new RegExp(patternString, "gi");
};

export const ServiceCreationRoutes = {
  DEFAULT_PAGE: {
    name: "default",
    path: fullPath("/"),
    exact: true,
    component: Default,
    match: matchRegexPattern("/"),
  },
  PROFILE: {
    name: "profile",
    path: fullPath("/profile"),
    component: Profile,
    match: matchRegexPattern("/profile"),
  },
  DEMO: {
    name: "demo",
    path: fullPath("/demo"),
    component: Demo,
    match: matchRegexPattern("/demo"),
  },
  PRICING_AND_DISTRIBUTION: {
    name: "pricinganddistribution",
    path: fullPath("/pricing"),
    component: PricingDistribution,
    match: matchRegexPattern("/pricing"),
  },
  SUBMIT: {
    name: "submit",
    path: fullPath("/submit"),
    component: Submit,
    match: matchRegexPattern("/submit"),
  },
};
