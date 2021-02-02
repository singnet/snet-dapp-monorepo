import React, { useCallback, useState } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useLocation } from "react-router-dom";

import UserProfilePopUp from "./UserProfilePopUp";
import { useStyles } from "./styles";
import { GlobalRoutes } from "../../GlobalRouter/Routes";
import { useSelector } from "react-redux";
import { userRoles } from "../../Utils/user";

const selectState = state => ({
  orgName: state.organization.name,
  userNickname: state.user.nickname,
  orgOwnerEmail: state.organization.owner,
  userEmail: state.user.email,
});

const LoggedInActions = ({ classes, headerType }) => {
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const location = useLocation();
  const { orgName, userNickname, orgOwnerEmail, userEmail } = useSelector(selectState);

  const handleProfileIconClick = () => {
    setShowProfilePopup(!showProfilePopup);
  };

  const userRole = useCallback(() => (orgOwnerEmail === userEmail ? userRoles.OWNER : userRoles.MEMBER), [
    orgOwnerEmail,
    userEmail,
  ]);

  if (location.pathname.includes(location.pathname.match(GlobalRoutes.AI_SERVICE_CREATION.match))) {
    return (
      <div className={classes.loggedInActionsContainer} onClick={handleProfileIconClick}>
        <AccountCircleIcon fontSize="large" className={classes.AccountCircleIcon} />
        <UserProfilePopUp
          show={showProfilePopup}
          handleClose={() => setShowProfilePopup(false)}
          headerType={headerType}
        />
        <div className={classes.orgNameContainer}>
          <Typography className={classes.orgName}>{orgName}</Typography>
          {/*<Typography className={classes.role}>Owner</Typography>*/}
        </div>
      </div>
    );
  }

  return (
    <div className={classes.loggedInActionsContainer} onClick={handleProfileIconClick}>
      <AccountCircleIcon fontSize="large" className={classes.AccountCircleIcon} />
      <UserProfilePopUp
        show={showProfilePopup}
        handleClose={() => setShowProfilePopup(false)}
        headerType={headerType}
        userRole={userRole()}
      />
      <div className={classes.orgNameContainer}>
        <Typography className={classes.orgName}>{userNickname}</Typography>
        <Typography className={classes.role}>{userRole()}</Typography>
      </div>
    </div>
  );
};

export default withStyles(useStyles)(LoggedInActions);
