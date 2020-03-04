import React from "react";
import isEmpty from "lodash/isEmpty";

import AlertText from "shared/dist/components/AlertText";
import { alertTypes } from "shared/dist/components/AlertBox";

const ServiceIdAvailability = ({ classes, serviceDetails, loading }) => {
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
        type={serviceDetails.availability === "AVAILABLE" ? alertTypes.SUCCESS : alertTypes.ERROR}
        message={!isEmpty(serviceDetails.id) ? `Service Id is ${serviceDetails.availability}` : ""}
      />
    </div>
  );
};

export default ServiceIdAvailability;
