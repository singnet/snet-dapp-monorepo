import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";
import DummyGetStartedCard from "../../../assets/images/dummy-card.png";
import CategoryDetails from "./CategoryDetails";

const Category = ({ classes, title, content, rightAlign, media }) => {
  return (
    <Grid container className={`${classes.CategoryWrapper} ${rightAlign ? classes.reverseDirection : null}`}>
      <Grid item xs={12} sm={6} md={6} lg={6} className={classes.CategoryMedia}>
        <img src={media || DummyGetStartedCard} alt="DummyImage" className={classes.FullWidth} />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6} className={classes.CategoryContent}>
        <h3>{title}</h3>
        {content.map(item => (
          <CategoryDetails type={item.type} value={item.value} key={item.type} />
        ))}
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(Category);
