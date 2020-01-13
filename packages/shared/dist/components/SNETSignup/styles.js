"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStyles = void 0;

var _styles = require("@material-ui/styles");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useStyles = (0, _styles.makeStyles)(function (MUITheme) {
  return {
    signupContainer: {
      background: MUITheme.palette.background.mainContent
    },
    signupWrapper: _defineProperty({
      width: '71%',
      margin: '0 auto'
    }, MUITheme.breakpoints.down('sm'), {
      width: '90%'
    }),
    signupInfo: {
      fontFamily: MUITheme.typography.fontFamily,
      "@media (max-width:960px)": {
        paddingRight: 0
      },
      "& h2": {
        margin: 0,
        color: MUITheme.palette.text.darkGrey,
        fontSize: 32,
        letterSpacing: -0.5,
        lineHeight: "48px",
        fontWeight: 600
      },
      "& p": {
        margin: "23px 0 24px",
        color: MUITheme.palette.text.primary,
        fontSize: 20,
        lineHeight: "30px"
      },
      "& ul": {
        margin: 0,
        padding: 0
      },
      "& li": {
        marginBottom: 15,
        display: "flex",
        alignItems: "center",
        listStyle: "none",
        "& svg": {
          marginRight: 15,
          color: MUITheme.palette.success,
          fontSize: 20
        },
        "& p": {
          color: MUITheme.palette.text.primary,
          fontSize: 16,
          letterSpacing: "0.29px",
          display: "inline-block",
          margin: 0,
          width: "84%",
          verticalAlign: "top"
        }
      }
    }
  };
});
exports.useStyles = useStyles;