import React from "react";
import PropTypes from "prop-types";

import { useStyles } from "./styles";

const Info = props => {
  const { title, description } = props;
  const classes = useStyles();

  return (
    <p className={classes.signupconfirmDetail}>
      <span>{title}</span>
      {description}
    </p>
  );
};

Info.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default Info;
