import React from "react";
import GetStarted from "shared/dist/components/GetStarted";
import { GetStartedDetails, GetStartedCategories } from "./content";

const HowItWorks = () => {
  return <GetStarted GetStartedDetails={GetStartedDetails} GetStartedCategories={GetStartedCategories} />;
};

export default HowItWorks;
