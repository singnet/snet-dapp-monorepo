import React, { Fragment } from "react";
import PropTypes from "prop-types";

const Info = props => {
  const { title, description } = props;

  return (
    <Fragment>
      <p>
        <strong>{title}</strong>
      </p>
      <p>{description}</p>
    </Fragment>
  );
};

Info.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default Info;
