import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

import SnetSvgLogo from "shared/dist/components/SnetSvgLogo";
import { useStyles } from "./styles";

const RegistrationHeader = ({ classes, headerTitle, headerLinkText, headerLinkTo }) => {
  return (
    <div className={classes.registrationHeaderContainer}>
      <Grid container spacing={24} className={classes.registrationHeaderWrapper}>
        <Grid item xs={12} sm={6} md={6} lg={6} className={classes.logoContainer}>
          <h1>
            <Link to="">
              <SnetSvgLogo />
            </Link>
          </h1>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} className={classes.headerLink}>
          <p>
            {headerTitle} &nbsp; <Link to={headerLinkTo}>{headerLinkText}</Link>
          </p>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(useStyles)(RegistrationHeader);
