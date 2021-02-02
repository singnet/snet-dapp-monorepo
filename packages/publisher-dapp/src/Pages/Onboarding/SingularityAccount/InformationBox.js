import React from "react";
import { useSelector } from "react-redux";

import { userEntities } from "../../../Utils/user";

import AlertBox, { alertTypes } from "shared/dist/components/AlertBox";

const InformationBox = () => {
  const userEntity = useSelector(state => state.user.entity);

  if (userEntity === userEntities.ORGANIZATION) {
    return (
      <AlertBox
        type={alertTypes.INFO}
        message="Please Note:  In order for your company organization name to be listed on AI Marketplace, your company must be recognized as a legal entity in your country.  You will need to provide a DUNS number to be validated for approval "
      />
    );
  }

  if (userEntity === userEntities.INDIVIDUAL) {
    return (
      <AlertBox
        type={alertTypes.INFO}
        message="Please Note:  Signing up as Individual / Sole Proprietor / Single Person Business requires you to verify your identity."
      />
    );
  }

  return null;
};

export default InformationBox;
