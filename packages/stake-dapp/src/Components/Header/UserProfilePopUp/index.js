import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { useStyles } from "./styles";
import UserProfileCard from "shared/dist/components/UserProfileCard";
import { Modal } from "@material-ui/core";
import { userActions } from "../../../Services/Redux/actionCreators";

const UserProfilePopUp = ({ classes, show, handleClose }) => {
  const { nickname } = useSelector(state => ({
    nickname: state.user.nickname,
    //orgName: state.organization.name,
  }));
  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch(userActions.loginActions.signout);
  };

  return (
    <Modal open={show} onClose={handleClose}>
      <div className={classes.UserProfilePopUpContainer}>
        <UserProfileCard nickName={nickname} />
        <ul className={classes.userProfileMenuList}>
          <li>
            <ExitToAppIcon />
            <span onClick={handleSignout}>Sign Out</span>
          </li>
        </ul>
      </div>
    </Modal>
  );
};

export default withStyles(useStyles)(UserProfilePopUp);
