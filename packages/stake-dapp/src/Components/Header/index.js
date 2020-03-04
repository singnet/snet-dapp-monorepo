import React from "react";
import { useSelector } from "react-redux";

import SNETHeader from "shared/dist/components/SNETHeader";
import NavigationBar from "./NavigationBar";
import LoggedInActions from "./LoggedInActions";
import LoggedOutActions from "./LoggedOutActions";

const Header = () => {
  const { isLoggedIn } = useSelector(state => state.user);

  return (
    <SNETHeader
      isLoggedIn={isLoggedIn}
      portalName="AGI Staking"
      color="purple"
      NavigationBar={NavigationBar}
      LoggedInActions={LoggedInActions}
      LoggedOutActions={LoggedOutActions}
    />
  );
};

export default Header;
