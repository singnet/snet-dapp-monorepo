import React from "react";
import { useSelector } from "react-redux";

import SNETHeader from "shared/dist/components/SNETHeader";
import NavigationBar from "./NavigationBar";
import LoggedInActions from "./LoggedInActions";
import LoggedOutActions from "./LoggedOutActions";
import { navbarItems, dropdowns } from "./NavigationBar/constant.js";

const Header = () => {
  const { isLoggedIn } = useSelector(state => state.user);

  return (
    <SNETHeader
      isLoggedIn={isLoggedIn}
      portalName="AGI Staking"
      color="secondary"
      NavigationBar={NavigationBar}
      LoggedInActions={LoggedInActions}
      LoggedOutActions={LoggedOutActions}
      mobileNavLinks={navbarItems}
      mobileDropDown={dropdowns}
    />
  );
};

export default Header;
