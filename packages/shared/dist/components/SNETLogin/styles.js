"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStyles = void 0;

var _styles = require("@material-ui/styles");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useStyles = (0, _styles.makeStyles)(function (MUITheme) {
  return {
    loginDetails: {
      height: "100vh",
      textAlign: "center",
      backgroundColor: MUITheme.palette.background.mainContent,
      fontFamily: MUITheme.typography.fontFamily
    },
    loginForm: _defineProperty({
      boxSizing: "border-box",
      width: 410,
      padding: "19px 20px 30px",
      borderRadius: 4,
      margin: "40px auto 0",
      backgroundColor: MUITheme.palette.background.white,
      boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
      "& h3": {
        margin: "0 0 11px",
        color: MUITheme.palette.text.darkGrey,
        fontSize: 16,
        letterSpacing: "0.29px",
        textTransform: "uppercase"
      },
      "& button": {
        width: "100%",
        marginTop: 17
      }
    }, MUITheme.breakpoints.down("xs"), {
      width: "auto",
      margin: "40px 30px 0"
    }),
    textField: {
      width: "100%",
      "& label": {
        color: MUITheme.palette.text.darkGrey,
        fontSize: 14,
        letterSpacing: 0.4,
        lineHeight: "16px"
      },
      "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
        transform: "translate(14px, -6px) scale(0.90)"
      },
      "& fieldset": {
        borderColor: "#828282 !important"
      },
      "& div": {
        color: "#212121 !important"
      }
    },
    checkboxAndLink: {
      marginTop: 10,
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      "& a": {
        color: MUITheme.palette.text.primary,
        fontSize: 14,
        letterSpacing: "0.25px",
        textDecoration: "none",
        "&:hover": {
          color: MUITheme.palette.primary.main
        }
      },
      "@media (max-width:400px)": {
        flexDirection: "column"
      }
    },
    checkBox: {
      "& label": {
        "& span:last-of-type": {
          color: MUITheme.palette.text.primary,
          fontSize: 14,
          letterSpacing: 0.25,
          lineHeight: "20px"
        },
        "& span": {
          "&:last-of-type": {
            color: MUITheme.palette.text.primary
          },
          "&.MuiCheckbox-colorPrimary": {
            color: MUITheme.palette.text.primary
          },
          "&.MuiCheckbox-colorPrimary.Mui-checked": {
            color: MUITheme.palette.primary.main
          }
        }
      }
    }
  };
});
exports.useStyles = useStyles;