import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import SnetSvgLogo from "../../assets/images/BlackLogo.svg";
import { useStyles } from "./styles";
import HeaderActions from "./HeaderActions";
import Navbar from "./Navbar";

const SNETHeader = ({ isLoggedIn, color, NavigationBar, LoggedInActions, LoggedOutActions, portalName }) => {
  const classes = useStyles();
  return (
    <div>
      <header>
        <AppBar position="fixed" color={color} className={classes.appBar}>
          <div className={classes.logoContainer}>
            <CardMedia component="img" image={SnetSvgLogo} alt="SingularityNET" />
            <Typography variant="h5">{portalName}</Typography>
          </div>
          <div className={classes.navContainer}>
            <Navbar NavigationBar={NavigationBar} />
          </div>
          <div>
            <HeaderActions
              isLoggedIn={isLoggedIn}
              LoggedInActions={LoggedInActions}
              LoggedOutActions={LoggedOutActions}
            />
          </div>
        </AppBar>
      </header>
    </div>
  );
};

SNETHeader.propTypes = {
  isLoggedIn: PropTypes.bool,
  color: PropTypes.string,
  navbar: PropTypes.shape({
    navbarItems: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
        activeLinks: PropTypes.arrayOf(PropTypes.string),
        label: PropTypes.string,
        openInNewTab: PropTypes.bool,
        to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      })
    ),
  }),

  LoggedInActions: PropTypes.elementType,
  LoggedOutActions: PropTypes.elementType,
};

export default SNETHeader;
