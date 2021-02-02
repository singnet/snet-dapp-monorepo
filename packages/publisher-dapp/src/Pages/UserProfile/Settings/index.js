import React from "react";
import { useSelector } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import SNETButton from "shared/dist/components/SNETButton";
import SNETTextfield from "shared/dist/components/SNETTextfield";

import { useStyles } from "./styles";
import { GlobalRoutes } from "../../../GlobalRouter/Routes";

const selectState = state => ({
  nickname: state.user.nickname,
  email: state.user.email,
});

const Settings = ({ history, classes }) => {
  const { nickname, email } = useSelector(selectState);

  const handleChangePassword = () => {
    history.push(GlobalRoutes.FORGOT_PASSWORD.path);
  };

  return (
    <div className={classes.settingContainer}>
      <Typography variant="h4">Settings</Typography>
      <div className={classes.settingsWrapper}>
        <SNETTextfield
          id="outlined-name"
          label="Nick Name (20 char max)"
          value={nickname}
          variant="outlined"
          disabled
          extraInfo="Your nickname will be visible to other users when you post comments."
        />
        <SNETTextfield id="outlined-name" label="Email" value={email} variant="outlined" disabled />
        <div className={classes.btnContainer}>
          <span>Password</span>
          <SNETButton color="primary" variant="outlined" children="Change Password" onClick={handleChangePassword} />
        </div>
      </div>
    </div>
  );
};

export default withStyles(useStyles)(Settings);
