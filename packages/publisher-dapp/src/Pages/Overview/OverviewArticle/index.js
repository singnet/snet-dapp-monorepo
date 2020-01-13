import React from "react";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { withStyles } from "@material-ui/core/styles";
import CheckIcon from "@material-ui/icons/CheckCircle";

import { useStyles } from "./styles";
import StyledButton from "shared/dist/components/StyledButton";

const OverviewArticle = ({ classes, title, description, list, media, btnDetails, rightAlign }) => {
  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={12}
      lg={12}
      className={`${classes.overviewArticleContainer} ${rightAlign ? classes.reverseDirection : null}`}
    >
      <Grid item xs={12} sm={12} md={12} lg={7} className={classes.overviewArticleContent}>
        <Typography variant="h2">{title}</Typography>
        {description ? <Typography className={classes.description}>{description}</Typography> : null}
        {list ? (
          <List>
            {list.map((item, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <CheckIcon className={classes.checkCircleIcon} />
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        ) : null}
        <Link to={btnDetails.linkTo}>
          <StyledButton btnText={btnDetails.text} type={btnDetails.type} />
        </Link>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={5}>
        <img src={media} alt="media" />
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(OverviewArticle);
