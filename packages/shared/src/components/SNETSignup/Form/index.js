import React, { useState } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import isEmpty from "lodash/isEmpty";

import AlertText from "../../AlertText";
import AlertBox, { alertTypes } from "../../AlertBox";
import SNETButton from "../../SNETButton";
import PasswordInlineValidation from "./PasswordInlineValidation";
import { useStyles } from "./styles";
import validator from "../../../utils/validator";
import { signupFormConstraints } from "./validationConstraints";

const Form = props => {
  const { onSubmit, signupError } = props;
  const classes = useStyles();
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErr, setValidationErr] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    const isNotValid = validator({ nickname, email, password }, signupFormConstraints);
    if (isNotValid) {
      return setValidationErr(isNotValid[0]);
    }
    onSubmit(nickname, email, password);
  };

  const emailValidationMsg = () => {
    const isNotValid = validator({ email }, { email: signupFormConstraints.email });
    if (isNotValid && !isEmpty(email)) {
      return isNotValid[0];
    }
    return null;
  };

  return (
    <form noValidate autoComplete="off" className={classes.signupForm}>
      <TextField
        id="outlined-user-name"
        label="Nickname"
        className={classes.textField}
        value={nickname}
        onChange={e => setNickname(e.target.value)}
        margin="normal"
        variant="outlined"
        autoFocus
      />
      <div>
        <TextField
          id="outlined-email-input"
          label="Email"
          className={classes.textField}
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          variant="outlined"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <AlertText type={alertTypes.ERROR} message={emailValidationMsg()} />
      </div>
      <TextField
        id="outlined-password-input"
        label="Password"
        className={classes.textField}
        type="password"
        autoComplete="current-password"
        margin="normal"
        variant="outlined"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <div className={classes.passwordCriteriaContainer}>
        <p>Include:</p>
        <PasswordInlineValidation password={password} />
      </div>
      <AlertBox message={signupError || validationErr} />
      <div />
      <SNETButton color="primary" variant="contained" children="Create Account" onClick={handleSubmit} type="submit" />
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func,
  signupError: PropTypes.string,
};

export default Form;
