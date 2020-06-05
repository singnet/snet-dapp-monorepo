import React, { Fragment } from "react";

export default (invalidEndpoints, setShowDaemonConfigModal) => (
  <Fragment>
    <ul>
      {invalidEndpoints.map(endpoint => (
        <li key={endpoint}>{endpoint}</li>
      ))}
    </ul>
    <p>
      Please
      <span
        onClick={e => {
          e.preventDefault();
          setShowDaemonConfigModal(true);
        }}
      >
        click here
      </span>
      to see the production ready configuration
    </p>
  </Fragment>
);
