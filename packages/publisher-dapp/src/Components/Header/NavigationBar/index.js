import React from "react";
import ListItem from "@material-ui/core/ListItem";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

import SNETList from "shared/dist/components/SNETList";
import { useSelector } from "react-redux";

import { useStyles } from "./styles";
import NavbarLink from "./NavbarLink";
import { navbarItems } from "./constant";
import { GlobalRoutes } from "../../../GlobalRouter/Routes";

const selectState = state => ({
  isLoggedIn: state.user.isLoggedIn,
  serviceName: state.aiServiceDetails.name,
});

const NavigationBar = props => {
  const { headerColor } = props;
  const classes = useStyles(props);
  const location = useLocation();
  const { isLoggedIn, serviceName } = useSelector(selectState);

  if (location.pathname.match(GlobalRoutes.AI_SERVICE_CREATION.match)) {
    return (
      <nav>
        <SNETList display="inline" className={classes.navlist}>
          <div className={classes.serviceNameDropdown}>
            <span>{serviceName}</span>
          </div>
        </SNETList>
      </nav>
    );
  }

  return (
    !isLoggedIn && (
      <nav className={classes.navigationLinks}>
        <SNETList display="inline" className={classes.navlist}>
          {navbarItems.map(navbarItem => {
            if (navbarItem.type === "link") {
              return (
                <ListItem key={navbarItem.label} children={<NavbarLink {...navbarItem} headerColor={headerColor} />} />
              );
            }
            return null;
          })}
        </SNETList>
      </nav>
    )
  );
};

NavigationBar.propTypes = {
  navbarItems: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      activeLinks: PropTypes.arrayOf(PropTypes.string),
      label: PropTypes.string,
      openInNewTab: PropTypes.bool,
      to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    })
  ),
  headerColor: PropTypes.string,
};

export default NavigationBar;
