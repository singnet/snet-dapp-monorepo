import React from "react";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import { getInTouch } from "../content";
import { GlobalRoutes } from "../../../GlobalRouter/Routes";
import { useStyles } from "./styles";
import StyledButton from "shared/dist/components/StyledButton";

const GetInTouch = ({ classes }) => {
  return (
    <Grid container className={classes.getInTouchContainer}>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.getInTouch}>
        <Typography variant="h2">{getInTouch.title}</Typography>
        <Typography variant="body2">{getInTouch.description}</Typography>
        <form>
          <TextField
            id="outlined-number"
            label="Email"
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            variant="outlined"
          />
          <Link to={GlobalRoutes.ENROLL.path}>
            <StyledButton btnText="get in touch" type="blue" />
          </Link>
        </form>
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(GetInTouch);
