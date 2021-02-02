import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { useStyles } from "./styles";
import { cogsToAgi } from "shared/dist/utils/Pricing";

const Pricing = ({ classes, groups }) => {
  const parsePrice = () => {
    const price = groups[0] && groups[0].pricing && groups[0].pricing[0] && groups[0].pricing[0].priceInCogs;
    if (price) {
      return cogsToAgi(price);
    }
    return null;
  };

  const parsePriceModel = () => {
    const priceModel = groups[0] && groups[0].pricing && groups[0].pricing[0] && groups[0].pricing[0].priceModel;
    if (priceModel) {
      return priceModel;
    }
    return null;
  };
  return (
    <Grid container className={classes.revenueContainer}>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.pendingClaimsAndTotalContainer}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <span className={classes.title}>Regions:</span>
          <span className={classes.value}>{groups.length}</span>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <span className={classes.title}>Price:</span>
          <span className={classes.value}>{parsePrice()} AGI</span>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.pendingClaimsAndTotalContainer}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <span className={classes.title}>Pricing Model</span>
          <span className={classes.value}>{parsePriceModel()}</span>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(Pricing);
