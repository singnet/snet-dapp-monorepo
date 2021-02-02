import React, { Fragment } from "react";
import ReactGA from "react-ga";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { withStyles } from "@material-ui/core/styles";
import CheckIcon from "@material-ui/icons/CheckCircle";

import { GAEventsContent } from "../../../Utils/GAEvents";
import { useStyles } from "./styles";
import SNETButton from "shared/dist/components/SNETButton";

const OverviewArticle = ({ classes, title, description, list, media, btnDetails, rightAlign }) => {
  const handleGetStarted = () => {
    ReactGA.event(GAEventsContent.GET_STARTED);
  };

  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={12}
      lg={12}
      className={`${classes.overviewArticleContainer} ${rightAlign ? classes.reverseDirection : null}`}
    >
      <Grid item xs={12} sm={12} md={12} lg={6} className={classes.overviewArticleContent}>
        <Typography variant="h2">{title}</Typography>
        {description ? (
          <Fragment>
            <Typography className={classes.description}>{description[0]}</Typography>
            <Typography className={classes.description}>{description[1]}</Typography>
          </Fragment>
        ) : null}
        {list ? (
          <List>
            {list.map((item, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <CheckIcon className={classes.checkCircleIcon} />
                </ListItemIcon>
                <Typography className={classes.listItemText}>
                  <span>{item.title}</span>
                  {item.description}
                </Typography>
              </ListItem>
            ))}
          </List>
        ) : null}
        {btnDetails.linkTo ? (
          <Link to={btnDetails.linkTo}>
            <SNETButton
              children={btnDetails.text}
              color={btnDetails.color}
              variant={btnDetails.variant}
              onClick={btnDetails.text === "get started" ? handleGetStarted : null}
            />
          </Link>
        ) : null}
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={6} className={classes.mediaContainer}>
        <img src={media} alt="media" />
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(OverviewArticle);
