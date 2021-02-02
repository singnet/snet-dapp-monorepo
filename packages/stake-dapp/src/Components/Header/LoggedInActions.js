import React, { useState } from "react";

// import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { withStyles } from "@material-ui/core/styles";

import { GlobalRoutes } from "../../GlobalRouter/Routes";
import UserProfilePopUp from "./UserProfilePopUp";
import { useStyles } from "./styles";

const LoggedInActions = ({ classes }) => {
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  const handleProfileIconClick = () => {
    setShowProfilePopup(!showProfilePopup);
  };

  return (
    <div className={classes.loggedInActionsContainer}>
      {/*<NotificationsIcon fontSize="large" className={classes.NotificationsIcon} /> */}
      <div className={classes.faqLink}>
        <a href={GlobalRoutes.FAQ.path} alt="FAQ Help" target="_blank" rel="noopener noreferrer">
          FAQ Help <HelpOutlineIcon />
        </a>
      </div>
      <AccountCircleIcon fontSize="large" onClick={handleProfileIconClick} className={classes.AccountCircleIcon} />
      <UserProfilePopUp show={showProfilePopup} handleClose={() => setShowProfilePopup(false)} />
    </div>
  );
};

export default withStyles(useStyles)(LoggedInActions);
