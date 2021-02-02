import React from "react";
import ReactGA from "react-ga";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import { GAEventsContent } from "../../../Utils/GAEvents";
import { getInTouch } from "../content";
import { useStyles } from "./styles";

import SNETTextfield from "shared/dist/components/SNETTextfield";
import SNETButton from "shared/dist/components/SNETButton";

const GetInTouch = ({ classes }) => {
  const handleGetInTouch = () => {
    ReactGA.event(GAEventsContent.GET_IN_TOUCH);
  };

  return (
    <Grid container className={classes.getInTouchContainer}>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.getInTouch}>
        <Typography variant="h2">{getInTouch.title}</Typography>
        <Typography variant="body2">{getInTouch.description}</Typography>
        <form
          action="https://singularitynet.us16.list-manage.com/subscribe/post?u=d74195510c25bf501caf3011d&id=a804df2efd"
          method="post"
          target="_blank"
          name="mc-embedded-subscribe-form"
          noValidate=""
        >
          <SNETTextfield name="EMAIL" label="email" type="email" />
          <SNETButton
            children="get in touch"
            color="primary"
            variant="contained"
            type="submit"
            value="Subscribe"
            name="subscribe"
            onClick={handleGetInTouch}
          />
        </form>
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(GetInTouch);
