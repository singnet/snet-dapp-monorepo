import React from "react";
import { withStyles } from "@material-ui/styles";

import UserProfileCard from "shared/dist/components/UserProfileCard";
import StyledButton from "shared/dist/components/StyledButton";

import { useStyles } from "./styles";

const UserProfileHeader = ({ classes, nickname }) => {
  return (
    <div className={classes.userProfileHeader}>
      <UserProfileCard nickName={nickname} />
      <StyledButton type="transparentBlueBorder" btnText="request developer's account" />
    </div>
  );
};

export default withStyles(useStyles)(UserProfileHeader);
