"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStyles = void 0;

var _styles = require("@material-ui/styles");

var useStyles = (0, _styles.makeStyles)(function (MuiTheme) {
  return {
    errorMsg: {
      margin: 0,
      fontSize: 12.17,
      lineHeight: "16px",
      letterSpacing: 0.4
    },
    error: {
      color: MuiTheme.palette.error.main
    },
    success: {
      color: MuiTheme.palette.success.main
    },
    warning: {
      color: MuiTheme.palette.text.warningBorder
    },
    info: {
      color: MuiTheme.palette.primary.main
    }
  };
});
exports.useStyles = useStyles;