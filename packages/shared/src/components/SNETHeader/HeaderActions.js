import React, { Fragment } from "react";
import PropTypes from "prop-types";
import SNETButton from "../SNETButton";

import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const HeaderActions = ({ isLoggedIn, actions }) => {
  if (isLoggedIn) {
    return (
      <Fragment>
        <NotificationsIcon fontSize="large" />
        <AccountCircleIcon fontSize="large" />
      </Fragment>
    );
  }
  return actions.map(action => <SNETButton key={action.children} {...action} />);
};

HeaderActions.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      color: PropTypes.string,
      vaiant: PropTypes.string,
      handler: PropTypes.func,
    })
  ),
};

export default HeaderActions;
