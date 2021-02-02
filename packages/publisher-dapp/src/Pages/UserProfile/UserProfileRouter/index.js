import React from "react";
import { Switch, Route } from "react-router";
import { UserProfileRoutes } from "./Routes";
import PageNotFound from "shared/dist/components/PageNotFound";

const UserProfileRouter = () => {
  return (
    <Switch>
      {Object.values(UserProfileRoutes).map(({ name, path, component, exact }) => (
        <Route key={name} path={path} component={component} exact={exact} />
      ))}
      <Route exact path={UserProfileRoutes.DEFAULT_PAGE.path} component={UserProfileRoutes.DEFAULT_PAGE.component} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

export default UserProfileRouter;
