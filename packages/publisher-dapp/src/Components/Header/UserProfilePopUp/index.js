import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PeopleIcon from "@material-ui/icons/People";
import CheckIcon from "@material-ui/icons/Check";
import DeviceHubIcon from "@material-ui/icons/DeviceHub";
import Avatar from "@material-ui/core/Avatar";
import { Modal } from "@material-ui/core";

import SingularityLogo from "shared/dist/assets/images/avatar.png";
import UserProfileCard from "shared/dist/components/UserProfileCard";

import { useStyles } from "./styles";
import { userActions } from "../../../Services/Redux/actionCreators";
import { GlobalRoutes } from "../../../GlobalRouter/Routes";
import { organizationSetupStatuses } from "../../../Utils/organizationSetup";

const selectState = state => ({
  status: state.organization.state.state,
  uuid: state.organization.uuid,
});

const UserProfilePopUp = ({ classes, show, handleClose, orgImg, headerType, userRole }) => {
  const { nickname, orgName, orgUuid } = useSelector(state => ({
    orgUuid: state.organization.uuid,
    nickname: state.user.nickname,
    orgName: state.organization.name,
  }));
  const dispatch = useDispatch();
  const { status } = useSelector(selectState);
  const history = useHistory();
  const rejectedStatuses = [
    organizationSetupStatuses.ONBOARDING,
    organizationSetupStatuses.ONBOARDING_REJECTED,
    organizationSetupStatuses.CHANGE_REQUESTED,
    organizationSetupStatuses.APPROVAL_PENDING,
    organizationSetupStatuses.REJECTED,
  ];

  const handleSignout = () => {
    dispatch(userActions.loginActions.signout);
    history.push(GlobalRoutes.OVERVIEW.path);
  };

  const handleEdit = () => {
    history.push(GlobalRoutes.ORGANIZATION_SETUP.path.replace(":orgUuid", orgUuid));
  };

  const handleTeamMembers = () => {
    history.push(GlobalRoutes.INVITE_MEMBERS.path.replace(":orgUuid", orgUuid));
  };

  return (
    <Modal open={show} onClose={handleClose}>
      <div
        className={`${classes.UserProfilePopUpContainer} ${headerType === "mobile" ? classes.mobUserProPopup : null}`}
      >
        <UserProfileCard nickName={nickname} />
        <ul className={classes.userProfileMenuList}>
          {orgUuid && !rejectedStatuses.includes(status) ? (
            <Fragment>
              <li className={classes.orgNameContainer}>
                <div>
                  <Avatar aria-label="recipe" className={classes.avatar} src={orgImg || SingularityLogo} />
                  <div className={classes.orgNameAndRole}>
                    <span>{orgName}</span>
                    <span>{userRole}</span>
                  </div>
                </div>
                <CheckIcon />
              </li>
              <li onClick={handleEdit}>
                <DeviceHubIcon />
                <span>Edit Companies</span>
              </li>
              <li onClick={handleTeamMembers}>
                <PeopleIcon />
                <span>Team</span>
              </li>
            </Fragment>
          ) : null}

          <li className={classes.signoutLink} onClick={handleSignout}>
            <ExitToAppIcon />
            <span>Sign Out</span>
          </li>
        </ul>
      </div>
    </Modal>
  );
};

export default withStyles(useStyles)(UserProfilePopUp);
