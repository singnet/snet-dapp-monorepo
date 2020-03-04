import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { useStyles } from "./styles";
import StakeSession from "../StakeSession";

import {
  sortByCategories,
  firstCardDetails,
  firstIncubationProgressDetails,
  secondIncubationProgressDetails,
  secondCardDetails,
} from "./content";

import StyledDropdown from "shared/dist/components/StyledDropdown";

const UserStake = ({ incubatingCount }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.userStakeContainer}>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.toolBar}>
        <div className={classes.sortBySection}>
          <span className={classes.sortbyTxt}>Sort by:</span>
          <StyledDropdown list={sortByCategories} labelTxt="select" />
        </div>
        <div className={classes.incubatingCount}>
          <Typography>{incubatingCount} incubating</Typography>
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <StakeSession
          incubationProgressDetails={firstIncubationProgressDetails}
          cardDetails={firstCardDetails}
          date="Jan 2020"
          id="#5555"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.bottomBox}>
        <StakeSession
          incubationProgressDetails={secondIncubationProgressDetails}
          cardDetails={secondCardDetails}
          date="Dec 2019"
          id="#9283"
        />
      </Grid>
    </Grid>
  );
};

export default UserStake;
