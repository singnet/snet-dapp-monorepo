import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import UserProfileSettings from "./UserProfileSettings";
import UserProfileHeader from "./UserProfileHeader";
import AccountBalance from "../../Components/AccountBalance";
import Notification from "../../Components/Notification";
import { useStyles } from "./styles";
import { GlobalRoutes } from "../../GlobalRouter/Routes";

const UserProfile = ({ history, location }) => {
  const classes = useStyles();

  const { nickname, email } = useSelector(state => state.user);

  const userProfileRoutes = {
    USER_PROFILE: { path: `${GlobalRoutes.USER_PROFILE.path}`, component: () => <AccountBalance /> },
    ACCOUNT: { path: `${GlobalRoutes.USER_PROFILE.path}/account`, component: () => <AccountBalance /> },
    SETTINGS: { path: `${GlobalRoutes.USER_PROFILE.path}/setting`, component: () => <UserProfileSettings /> },
  };

  const activeIndexEnum = {
    [`${userProfileRoutes.ACCOUNT.path}`]: 0,
    [`${userProfileRoutes.SETTINGS.path}`]: 1,
  };

  const tabs = [
    { name: "Account", activeIndex: 0, path: userProfileRoutes.ACCOUNT.path },
    { name: "Settings", activeIndex: 1, path: userProfileRoutes.SETTINGS.path },
  ];

  const onTabChange = (_activeTab, activePath) => {
    history.push(activePath);
  };

  const activeTab = () => {
    const { pathname } = location;
    const activeIndex = activeIndexEnum[`${pathname.toLowerCase()}`];
    if (activeIndex) {
      return activeIndex;
    }
    return 0;
  };

  const loadTabs = value => {
    return <Tab key={value.name} label={value.name} onClick={() => onTabChange(value.activeIndex, value.path)} />;
  };

  return (
    <Fragment>
      <Notification />
      <div className={classes.UserProfileContainer}>
        <UserProfileHeader nickname={nickname} email={email} />
        <div>
          <AppBar position="static" className={classes.tabsHeader}>
            <Tabs value={activeTab()}>{tabs.map(value => loadTabs(value))}</Tabs>
          </AppBar>
          <Switch>
            <Route path={userProfileRoutes.ACCOUNT.path} component={userProfileRoutes.ACCOUNT.component} />
            <Route path={userProfileRoutes.SETTINGS.path} component={userProfileRoutes.SETTINGS.component} />
            <Route path={userProfileRoutes.USER_PROFILE.path} component={userProfileRoutes.USER_PROFILE.component} />
          </Switch>
        </div>
      </div>
    </Fragment>
  );
};

export default UserProfile;
