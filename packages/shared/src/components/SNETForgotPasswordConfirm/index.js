import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useStyles } from "./styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AlertBox from "../AlertBox";
import SNETButton from "../SNETButton";
import validator from "../../utils/validator";
import { forgotPassworSubmitConstraints } from "./validationConstraints";

const SNETForgotPasswordConfirm = ({ email, forgotPasswordConfirmError, onSubmit }) => {
  const classes = useStyles();
  const [localEmail, setLocalEmail] = useState(email);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErr, setValidationErr] = useState("");

  useEffect(() => {
    setLocalEmail(email);
  }, [email]);

  const handleSubmit = event => {
    event.preventDefault();
    setValidationErr("");
    const isNotValid = validator({ password, confirmPassword, code, localEmail }, forgotPassworSubmitConstraints);
    if (isNotValid) {
      setValidationErr(isNotValid[0]);
      return;
    }
    // Assuming the user state has the email, no need to explicitly pass it to this component
    onSubmit(localEmail, code, password);
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.forgotPwdContent}>
        <Typography variant="h3">Reset your password</Typography>
        <Typography>
          Thanks for confirming your email.<span>Input your new password</span>
        </Typography>
        <form className={classes.forgotPwdForm} noValidate="">
          <TextField
            id="outlined-email-input"
            label="Email"
            className={classes.textField}
            autoComplete="off"
            type="email"
            name="email"
            margin="normal"
            variant="outlined"
            value={localEmail}
            required
            onChange={e => setLocalEmail(e.target.value)}
          />
          <TextField
            id="outlined-code-input"
            label="Code"
            className={classes.textField}
            autoComplete="off"
            type="code"
            name="code"
            margin="normal"
            variant="outlined"
            value={code}
            onChange={e => setCode(e.target.value)}
          />
          <TextField
            id="outlined-new-password-input"
            label="New Password"
            className={classes.textField}
            autoComplete="off"
            type="password"
            name="email"
            margin="normal"
            variant="outlined"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <TextField
            id="outlined-confirm-password-input"
            label="Confirm Password"
            className={classes.textField}
            autoComplete="off"
            type="password"
            name="email"
            margin="normal"
            variant="outlined"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <AlertBox type="error" message={validationErr || forgotPasswordConfirmError} />
          <SNETButton
            color="primary"
            variant="contained"
            children="reset password"
            type="submit"
            onClick={handleSubmit}
          />
        </form>
      </Grid>
    </Grid>
  );
};

SNETForgotPasswordConfirm.propTypes = {
  title: PropTypes.string,
  forgotPasswordConfirmError: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default SNETForgotPasswordConfirm;
