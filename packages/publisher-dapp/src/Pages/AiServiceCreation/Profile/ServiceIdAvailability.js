import React from "react";
import isEmpty from "lodash/isEmpty";

import AlertText from "shared/dist/components/AlertText";
import { alertTypes } from "shared/dist/components/AlertBox";
import { serviceIdAvailability } from "../constant";

const ServiceIdAvailability = ({ classes, id, availability, loading }) => {
  if (loading) {
    return (
      <div className={classes.alertTextContainer}>
        <AlertText type={alertTypes.INFO} message="validating..." />;
      </div>
    );
  }

  return (
    <div className={classes.alertTextContainer}>
      <AlertText
        type={availability === serviceIdAvailability.AVAILABLE ? alertTypes.SUCCESS : alertTypes.ERROR}
        message={!isEmpty(id) ? `Service Id is ${availability}` : ""}
      />
    </div>
  );
};

export default ServiceIdAvailability;
