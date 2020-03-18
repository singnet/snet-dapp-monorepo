import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import SettingIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Modal } from "@material-ui/core";
import UserProfileCard from "shared/dist/components/UserProfileCard";
import { useStyles } from "./styles";
import { userActions } from "../../../Services/Redux/actionCreators";

import { GlobalRoutes } from "../../../GlobalRouter/Routes";

const UserProfilePopUp = ({ classes, show, handleClose }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { nickname } = useSelector(state => ({
    nickname: state.user.nickname,
  }));

  const handleSignout = () => {
    dispatch(userActions.loginActions.signout);
  };

  const handleAccountclick = () => {
    history.push(`${GlobalRoutes.USER_PROFILE.path}/account`);
  };

  const handleSettingsclick = () => {
    history.push(`${GlobalRoutes.USER_PROFILE.path}/setting`);
  };

  return (
    <Modal open={show} onClose={handleClose}>
      <div className={classes.UserProfilePopUpContainer}>
        <UserProfileCard nickName={nickname} />
        <ul className={classes.userProfileMenuList}>
          <li>
            <AccountCircleIcon />
            <span onClick={handleAccountclick}>Account</span>
          </li>
          <li>
            <SettingIcon />
            <span onClick={handleSettingsclick}>Settings</span>
          </li>
          <li className={classes.signOutLink}>
            <ExitToAppIcon />
            <span onClick={handleSignout}>Sign Out</span>
          </li>
        </ul>
      </div>
    </Modal>
  );
};

export default withStyles(useStyles)(UserProfilePopUp);
