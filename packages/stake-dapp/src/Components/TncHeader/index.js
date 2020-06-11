import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import SnetSvgLogo from "shared/dist/components/SnetSvgLogo";
import { useStyles } from "./styles";
import { userActions } from "../../Services/Redux/actionCreators";

const TncHeader = ({ classes, headerTitle, headerLinkText, headerLinkTo }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignout = () => {
    dispatch(userActions.loginActions.signout);
    history.push(headerLinkTo);
  };

  return (
    <div className={classes.tncHeaderContainer}>
      <Grid container className={classes.tncHeaderWrapper}>
        <Grid item xs={12} sm={6} md={6} lg={6} className={classes.logoContainer}>
          <h1>
            <SnetSvgLogo />
          </h1>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} className={classes.headerLink}>
          <p>
            {headerTitle} &nbsp; <span onClick={handleSignout}>{headerLinkText}</span>
          </p>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(useStyles)(TncHeader);
