import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SnetSvgLogo from "../../assets/images/BlackLogo.svg";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";

import { useStyles } from "./styles";
import HeaderActions from "./HeaderActions";
import Navbar from "./Navbar";

const SNETHeader = ({ isLoggedIn, color, navbar, actions }) => {
  const classes = useStyles();
  return (
    <div>
      <header>
        <AppBar position="fixed" color="default">
          <Toolbar>
            <Container className={classes.logoContainer}>
              <CardMedia component="img" image={SnetSvgLogo} alt="SingularityNET" />
            </Container>
            <Container className={classes.navContainer}>
              <Navbar {...navbar} />
            </Container>
            <Container className={classes.actionsContainer}>
              <HeaderActions actions={actions} isLoggedIn={isLoggedIn} />
            </Container>
          </Toolbar>
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
        to: PropTypes.oneOf(PropTypes.string, PropTypes.object),
      })
    ),
  }),
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      color: PropTypes.string,
      vaiant: PropTypes.string,
      handler: PropTypes.func,
    })
  ),
};

export default SNETHeader;
