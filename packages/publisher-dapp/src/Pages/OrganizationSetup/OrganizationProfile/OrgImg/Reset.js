import React from "react";
import SNETButton from "shared/dist/components/SNETButton";

const Reset = ({ onReset, disabled }) => {
  return <SNETButton children="reset" onClick={onReset} color="secondary" variant="text" disabled={disabled} />;
};

export default Reset;
