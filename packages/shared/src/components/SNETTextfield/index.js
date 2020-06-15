import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import InfoIcon from "@material-ui/icons/Info";

import { useStyles } from "./styles";
import StyledTextField from "shared/dist/components/StyledTextField";

const SNETTextfield = ({
  classes,
  name,
  label,
  helperText,
  value,
  onChange,
  maxCount,
  minCount,
  disabled,
  description,
  icon,
  onKeyUp,
  extraInfo,
  inputRef,
  InputProps,
  error,
  ...rest
}) => {
  return (
    <Grid container className={error ? classes.errorField : ""}>
      <Grid item sx={12} sm={12} md={6} lg={6} className={classes.basicTextFieldGrid}>
        {icon ? (
          <div className={classes.infoIconContainer}>
            <InfoIcon />
          </div>
        ) : null}
        <div className={classes.textFieldWithExtraText}>
          <StyledTextField
            name={name}
            label={label}
            helperText={helperText}
            variant="outlined"
            value={value}
            onChange={onChange}
            fullWidth
            onKeyUp={onKeyUp}
            disabled={disabled}
            inputRef={inputRef}
            InputProps={InputProps}
            {...rest}
          />

          {maxCount ? (
            <span className={classes.charLength}>
              {minCount}/{maxCount} char
            </span>
          ) : null}
          {extraInfo ? <span className={classes.extraInfo}>{extraInfo}</span> : null}
        </div>
      </Grid>

      {description ? (
        <Grid item sx={12} sm={12} md={6} lg={6} className={classes.description}>
          <Typography>{description}</Typography>
        </Grid>
      ) : null}
    </Grid>
  );
};

SNETTextfield.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  helperText: PropTypes.string,
  description: PropTypes.string,
  onChange: PropTypes.func,
};

export default withStyles(useStyles)(SNETTextfield);
