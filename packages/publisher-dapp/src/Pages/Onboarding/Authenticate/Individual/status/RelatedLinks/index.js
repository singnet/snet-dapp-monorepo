import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";
import LaunchIcon from "@material-ui/icons/Launch";

import { relatedLinks } from "./content";
import AnchorLink from "shared/dist/components/AnchorLink";
import { useStyles } from "./styles";

const RelatedLinks = ({ classes, show }) => {
  if (show) {
    return (
      <Grid container spacing={24} className={classes.relatedLinksContainer}>
        <div className={classes.iconTitleContainer}>
          <LaunchIcon />
          <Typography>Related Links</Typography>
        </div>
        {relatedLinks.map(item => (
          <AnchorLink label={item.label} href={item.linkTo} key={item.label} newTab={item.newTab} />
        ))}
      </Grid>
    );
  }

  return null;
};

export default withStyles(useStyles)(RelatedLinks);
