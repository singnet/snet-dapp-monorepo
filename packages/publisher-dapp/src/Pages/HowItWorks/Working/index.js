import React from "react";
import ReactGA from "react-ga";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import AnchorLink from "shared/dist/components/AnchorLink";

import { GAEventsContent } from "../../../Utils/GAEvents";
import { useStyles } from "./styles";

const Working = ({ classes, rightAlign, icon, title, description, btnTitle, linkTo }) => {
  const handleClick = () => {
    ReactGA.event(GAEventsContent.LEARN_MORE);
  };

  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={12}
      lg={12}
      className={`${classes.workingContentContainer} ${rightAlign ? classes.reverseDirection : null}`}
    >
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <img src={icon} alt={title} />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} className={classes.textContent}>
        <Typography className={classes.workingTitle}>{title}</Typography>
        <Typography className={classes.workingDesc}>{description}</Typography>
        <AnchorLink label={btnTitle} href={linkTo} newTab={true} onClick={handleClick} />
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(Working);
