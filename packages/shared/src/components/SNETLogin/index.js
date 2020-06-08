import React, { useState } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

import { useStyles } from "./styles";
import SNETButton from "../SNETButton";
import AlertBox from "../AlertBox";
import validator from "../../utils/validator";
import { validationConstraints } from "./validationConstraints";

const SNETLogin = props => {
  const classes = useStyles();
  const { title, forgotPasswordLink, onSubmit, loginError } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErr, setValidationErr] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    const isNotValid = validator({ email, password }, validationConstraints);
    if (isNotValid) {
      setValidationErr(isNotValid[0]);
      return;
    }
    onSubmit(email, password);
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.loginDetails}>
        <Typography variant="h2">{title}</Typography>
        <form noValidate autoComplete="off" className={classes.loginForm}>
          <TextField
            id="outlined-user-name"
            label="Email"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            value={email}
            autoFocus
            onChange={e => setEmail(e.target.value)}
          />
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
          <div className={classes.checkboxAndLink}>
            <div className={classes.checkBox} />
            <Link to={forgotPasswordLink}>Forgot password?</Link>
          </div>
          <AlertBox type="error" message={validationErr || loginError} />
          <SNETButton color="primary" variant="contained" children="login" type="submit" onClick={handleSubmit} />
        </form>
      </Grid>
    </Grid>
  );
};

SNETLogin.propTypes = {
  title: PropTypes.string,
  forgotPasswordLink: PropTypes.string,
  loginError: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default SNETLogin;
