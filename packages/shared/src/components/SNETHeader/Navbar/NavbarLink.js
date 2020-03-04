import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import { useStyles } from "./styles";

const NavbarLink = props => {
  const { activeLinks, label, openInNewTab, to } = props;
  const classes = useStyles(props);

  const isActive = (unused, { pathname }) => {
    return activeLinks.includes(pathname);
  };

  return (
    <NavLink
      children={label}
      to={to}
      isActive={isActive}
      target={openInNewTab ? "_blank" : ""}
      rel={openInNewTab ? "noreferrer noopener" : ""}
      className={classes.navLink}
      activeClassName={classes.navLinkActive}
    />
  );
};

NavbarLink.propTypes = {
  activeLinks: PropTypes.arrayOf(PropTypes.string),
  label: PropTypes.string,
  openInNewTab: PropTypes.bool,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default NavbarLink;
