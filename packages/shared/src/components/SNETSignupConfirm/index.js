import React, { useState } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { useStyles } from "./styles";
import AlertBox, { alertTypes } from "../AlertBox";
import SNETButton from "../SNETButton";
import Info from "./Info";
import validator from "../../utils/validator";
import { signupConfirmConstraints } from "./validationConstraints";

const SNETSignupConfirm = props => {
  const { info, onResendOtp, onSubmit, signupAlert } = props;
  const classes = useStyles();
  const [otp, setOtp] = useState();
  const [validationErr, setValidationErr] = useState();

  const handleSubmit = event => {
    event.preventDefault();
    setValidationErr();
    const isNotValid = validator({ otp }, signupConfirmConstraints);
    if (isNotValid) {
      return setValidationErr(isNotValid[0]);
    }
    onSubmit(otp);
  };

  const alert = () => ({
    type: validationErr ? alertTypes.ERROR : signupAlert.type,
    message: validationErr || signupAlert.message,
  });

  return (
    <div className={classes.confirmOtp}>
      <div className={classes.confirmOtpWrapper}>
        <Typography variant="h3">Validate your email </Typography>
        <form noValidate autoComplete="off" className={classes.signupForm}>
          <Info {...info} />
          <TextField
            id="outlined-confirm-otp"
            label="Verification Code"
            className={classes.textField}
            type="password"
            autoComplete="otp"
            margin="normal"
            variant="outlined"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            autoFocus
          />
          <AlertBox {...alert()} />
          <div className={classes.buttonsContainer}>
            <SNETButton variant="text" children="Resend code" onClick={onResendOtp} />
            <SNETButton color="primary" variant="contained" children="validate" onClick={handleSubmit} />
          </div>
        </form>
      </div>
    </div>
  );
};

SNETSignupConfirm.propTypes = {
  info: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  onResendOtp: PropTypes.func,
  onSubmit: PropTypes.func,
  signupAlert: PropTypes.shape({
    type: PropTypes.string,
    message: PropTypes.string,
  }),
};

export default SNETSignupConfirm;
