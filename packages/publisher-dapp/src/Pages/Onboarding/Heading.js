import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { useStyles } from "./styles";

const Heading = ({ classes, title, description }) => {
  return (
    <div className={classes.topSection}>
      <Typography variant="h3">{title}</Typography>
      <span>{description}</span>
    </div>
  );
};

Heading.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default withStyles(useStyles)(Heading);
