import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import { useStyles } from "./styles";
import GetInTouch from "./GetInTouch";
import OverviewArticle from "./OverviewArticle";
import { overViewArticles } from "./content";

const Overview = ({ classes }) => {
  return (
    <Grid container className={classes.overiewMainContainer}>
      {overViewArticles.map((item, index) => (
        <OverviewArticle
          key={item.title}
          title={item.title}
          description={item.description}
          list={item.list}
          media={item.media}
          btnDetails={item.btnDetails}
          rightAlign={(index + 1) % 2 === 0}
        />
      ))}
      <GetInTouch />
    </Grid>
  );
};

export default withStyles(useStyles)(Overview);
