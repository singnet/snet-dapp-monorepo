import React from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";

import validator from "../../../utils/validator";
import { passwordInlineConstraints } from "./validationConstraints";
import { passwordValidationMsgs } from "./constants";
import AlertText from "../../AlertText";
import { alertTypes } from "../../AlertBox";

const PasswordInlineValidation = props => {
  const { password } = props;
  const validationInputs = [
    {
      condition: isEmpty(validator.single(password, passwordInlineConstraints.upperCase)),
      message: `${passwordValidationMsgs.UPPER_CASE}, `,
    },
    {
      condition: isEmpty(validator.single(password, passwordInlineConstraints.lowerCase)),
      message: `${passwordValidationMsgs.LOWER_CASE}, `,
    },
    {
      condition: isEmpty(validator.single(password, passwordInlineConstraints.length)),
      message: `${passwordValidationMsgs.LENGTH}, `,
    },
    {
      condition: isEmpty(validator.single(password, passwordInlineConstraints.AWSSplChars)),
      message: `${passwordValidationMsgs.SPECIAL_CHAR}, `,
    },
    {
      condition: isEmpty(validator.single(password, passwordInlineConstraints.number)),
      message: passwordValidationMsgs.NUMBER,
    },
  ];

  return validationInputs.map(alert => (
    <AlertText
      key={alert.message}
      type={alert.condition ? alertTypes.SUCCESS : alertTypes.ERROR}
      message={alert.message}
    />
  ));
};

PasswordInlineValidation.propTypes = {
  password: PropTypes.string,
};

export default PasswordInlineValidation;
