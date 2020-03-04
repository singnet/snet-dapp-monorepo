import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MoodIcon from "@material-ui/icons/Mood";
import CheckIcon from "@material-ui/icons/Check";
import DeviceHubIcon from "@material-ui/icons/DeviceHub";

import { useStyles } from "./styles";
import UserProfileCard from "shared/dist/components/UserProfileCard";
import { Modal } from "@material-ui/core";
import { userActions } from "../../../Services/Redux/actionCreators";
import { GlobalRoutes } from "../../../GlobalRouter/Routes";

const UserProfilePopUp = ({ classes, show, handleClose }) => {
  const { nickname, orgName, orgUuid } = useSelector(state => ({
    orgUuid: state.organization.uuid,
    nickname: state.user.nickname,
    orgName: state.organization.name,
  }));
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignout = () => {
    dispatch(userActions.loginActions.signout);
    //testing
  };

  const handleEdit = () => {
    history.push(GlobalRoutes.ORGANIZATION_SETUP.path.replace(":orgUuid", orgUuid));
  };

  return (
    <Modal open={show} onClose={handleClose}>
      <div className={classes.UserProfilePopUpContainer}>
        <UserProfileCard nickName={nickname} />
        <ul className={classes.userProfileMenuList}>
          {orgUuid ? (
            <Fragment>
              <li>
                <MoodIcon />
                <span>{orgName}</span>
                <CheckIcon />
              </li>
              <li onClick={handleEdit}>
                <DeviceHubIcon />
                <span>Edit</span>
              </li>
            </Fragment>
          ) : null}

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
