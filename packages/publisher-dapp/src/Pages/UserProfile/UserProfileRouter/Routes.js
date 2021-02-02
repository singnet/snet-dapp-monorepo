import { GlobalRoutes } from "../../../GlobalRouter/Routes";
import Settings from "../Settings";

const basePath = GlobalRoutes.USER_PROFILE.path;

const fullPath = path => `${basePath}${path}`;

export const UserProfileRoutes = {
  DEFAULT_PAGE: {
    name: "default",
    path: fullPath("/"),
    exact: true,
    component: Settings,
  },
  SETTINGS: {
    name: "default",
    path: fullPath("/settings"),
    component: Settings,
  },
};
