import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

import SNETButton from "shared/dist/components/SNETButton";
import { useStyles } from "./styles";

const StatusBanner = ({ classes, title, img, description, actions, pending }) => {
  return (
    <Grid container spacing={24} className={classes.statusBannerContainer}>
      <Grid item xs={12} sm={4} md={4} lg={4} className={classes.statusBannerMedia}>
        <img src={img} alt="Status-Media" />
      </Grid>
      <Grid item xs={12} sm={8} md={8} lg={8} className={classes.statusBannerContent}>
        <Typography variant="h6" className={pending ? classes.pendingtitle : null}>
          {title}
        </Typography>
        <Typography>{description}</Typography>
        {actions.map(action => (
          <SNETButton key={action.children} {...action} />
        ))}
      </Grid>
    </Grid>
  );
};

StatusBanner.propTypes = {
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  actions: PropTypes.array.isRequired,
};

export default withStyles(useStyles)(StatusBanner);
