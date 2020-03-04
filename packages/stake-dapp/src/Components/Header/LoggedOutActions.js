import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import { useStyles } from "./styles";
import { GlobalRoutes } from "../../GlobalRouter/Routes";

const LoggedOutActions = ({ classes }) => {
  const history = useHistory();

  return (
    <Fragment>
      <Typography onClick={() => history.push(GlobalRoutes.LOGIN.path)} className={classes.loginBtn}>
        Login{" "}
      </Typography>
    </Fragment>
  );
};

export default withStyles(useStyles)(LoggedOutActions);
