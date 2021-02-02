import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";

import GetStartedDescription from "./GetStartedDescription";
import Category from "./Category";
import StyledButton from "../StyledButton";
import { useStyles } from "./styles";
import { Link } from "react-router-dom";

const GetStarted = ({ classes, CTAType, pageBtnRoute, GetStartedDetails, GetStartedCategories }) => {
  return (
    <Grid container spacing={24} className={classes.GetStartedMainContaienr}>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.TopSection}>
        <GetStartedDescription title={GetStartedDetails.title} description={GetStartedDetails.description} />
      </Grid>
      {GetStartedCategories.map((item, index) => (
        <Category
          key={item.categoryTitle}
          title={item.title}
          content={item.content}
          media={item.media}
          rightAlign={(index + 1) % 2 === 0}
        />
      ))}
      {CTAType ? (
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.btnContainer}>
          <Link to={pageBtnRoute} className={classes.createRequestLink}>
            <StyledButton type="blue" btnText="Create new Request" />
          </Link>
        </Grid>
      ) : null}
    </Grid>
  );
};

export default withStyles(useStyles)(GetStarted);
