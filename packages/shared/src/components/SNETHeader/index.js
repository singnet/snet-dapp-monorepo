import React from "react";
import PropTypes from "prop-types";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import SNETAppBar from "../SNETAppBar";
import SnetSvgLogo from "../../assets/images/BlackLogo.svg";
import WhiteSnetLogo from "../../assets/images/WhiteLogo.svg";
import { useStyles } from "./styles";
import HeaderActions from "./HeaderActions";
import Navbar from "./Navbar";
import MobileHeader from "./MobileHeader";

const SNETHeader = ({
  isLoggedIn,
  color,
  NavigationBar,
  LoggedInActions,
  LoggedOutActions,
  portalName,
  mobileNavLinks,
  mobileDropDown,
  onLogoClick,
}) => {
  const classes = useStyles();
  return (
    <div>
      <header>
        <SNETAppBar
          position="fixed"
          color={color}
          className={`${classes.appBar} ${color === "purple" ? classes.purple : null}`}
        >
          <div className={classes.logoContainer} onClick={onLogoClick}>
            <MobileHeader
              mobileNavLinks={mobileNavLinks}
              mobileDropDown={mobileDropDown}
              isLoggedIn={isLoggedIn}
              LoggedInActions={LoggedInActions}
              LoggedOutActions={LoggedOutActions}
              color={color}
            />
            <CardMedia component="img" image={color === "purple" ? WhiteSnetLogo : SnetSvgLogo} alt="SingularityNET" />
            <Typography variant="h5">{portalName}</Typography>
          </div>
          <div className={classes.navContainer}>
            <Navbar NavigationBar={NavigationBar} />
          </div>
          <div className={classes.headerActionsContainer}>
            <HeaderActions
              isLoggedIn={isLoggedIn}
              LoggedInActions={LoggedInActions}
              LoggedOutActions={LoggedOutActions}
              headerType="desktop"
            />
          </div>
        </SNETAppBar>
      </header>
    </div>
  );
};

SNETHeader.propTypes = {
  isLoggedIn: PropTypes.bool,
  color: PropTypes.string,

  LoggedInActions: PropTypes.elementType,
  LoggedOutActions: PropTypes.elementType,
  onLogoClick: PropTypes.func,
};

SNETHeader.defaultProps = {
  isLoggedIn: PropTypes.bool,
  onLogoClick: PropTypes.func,
};
export default SNETHeader;
