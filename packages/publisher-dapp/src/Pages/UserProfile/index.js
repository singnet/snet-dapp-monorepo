import React, { useCallback } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles } from "@material-ui/core/styles";

import { useStyles } from "./styles";
import UserProfileRouter from "./UserProfileRouter";
import { UserProfileRoutes } from "./UserProfileRouter/Routes";

const tabs = [{ name: "Settings", activeIndex: 0, path: UserProfileRoutes.SETTINGS.path }];

const activeTabValue = {
  [UserProfileRoutes.DEFAULT_PAGE.path]: 0,
  [UserProfileRoutes.SETTINGS.path]: 0,
};

const UserProfile = ({ location, classes }) => {
  const activeTab = useCallback(() => {
    return activeTabValue[location.pathname] || 0;
  }, [location.pathname]);

  return (
    <div className={classes.userProfileContainer}>
      <Tabs value={activeTab()} className={classes.tabsContainer} indicatorColor="primary">
        {tabs.map(value => (
          <Tab key={value.name} label={value.name} className={classes.tab} />
        ))}
      </Tabs>
      <UserProfileRouter />
    </div>
  );
};

export default withStyles(useStyles)(UserProfile);
