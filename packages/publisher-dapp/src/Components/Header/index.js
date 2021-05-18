import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import SNETHeader from "shared/dist/components/SNETHeader";
import NavigationBar from "./NavigationBar";
import LoggedInActions from "./LoggedInActions";
import LoggedOutActions from "./LoggedOutActions";
import { GlobalRoutes } from "../../GlobalRouter/Routes";
import { navbarItems } from "./NavigationBar/constant.js";

const selectState = state => ({
  orgUuid: state.organization.uuid,
  orgFoundInBlockchain: state.organization.foundInBlockchain,
  isLoggedIn: state.user.isLoggedIn,
});

const Header = ({ showNotification, onCloseClick, ispageScrolled }) => {
  const { orgUuid, isLoggedIn, orgFoundInBlockchain } = useSelector(selectState);
  const history = useHistory();

  const handleLogoClick = () => {
    if (orgUuid) {
      if (orgFoundInBlockchain) {
        return history.push(GlobalRoutes.SERVICES.path.replace(":orgUuid", orgUuid));
      }
      return history.push(GlobalRoutes.ORG_SETUP_STATUS.path.replace(":orgUuid", orgUuid));
    }
    history.push(GlobalRoutes.OVERVIEW.path);
  };

  return (
    <SNETHeader
      isLoggedIn={isLoggedIn}
      onLogoClick={handleLogoClick}
      portalName="AI Publisher"
      color="white"
      NavigationBar={NavigationBar}
      LoggedInActions={LoggedInActions}
      LoggedOutActions={LoggedOutActions}
      mobileNavLinks={navbarItems}
      showNotification={showNotification}
      onCloseClick={onCloseClick}
      ispageScrolled={ispageScrolled}
    />
  );
};

export default Header;
