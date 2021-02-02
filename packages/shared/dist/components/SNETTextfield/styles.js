"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStyles = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useStyles = function useStyles(MUITheme) {
  return {
    basicTextFieldGrid: _defineProperty({
      display: "flex",
      alignItems: "center",
      "& label": {
        color: MUITheme.palette.text.darkGrey,
        fontSize: 12,
        letterSpacing: 0.4,
        "&.MuiFormLabel-root.Mui-focused": {
          color: MUITheme.palette.text.darkGrey
        }
      }
    }, MUITheme.breakpoints.down("xs"), {
      width: "100%"
    }),
    textFieldWithExtraText: {
      width: "100%",
      display: "flex",
      flexDirection: "column"
    },
    description: _defineProperty({
      paddingLeft: 40,
      "& p": _defineProperty({
        marginTop: 20,
        color: MUITheme.palette.text.lightGrey,
        fontSize: 14,
        letterSpacing: 0.25,
        lineHeight: "20px",
        "& a": {
          color: MUITheme.palette.primary.main,
          textDecoration: "none"
        }
      }, MUITheme.breakpoints.down("sm"), {
        marginTop: 0
      })
    }, MUITheme.breakpoints.down("sm"), {
      paddingLeft: 0,
      marginTop: 0,
      marginBottom: 10
    }),
    infoIconContainer: {
      "& svg": {
        padding: "5px 10px 0 0",
        fontSize: 20,
        color: "#d6d6d6"
      }
    },
    charLength: _defineProperty({
      marginBottom: 25,
      display: "block",
      paddingLeft: 14,
      color: MUITheme.palette.text.primary,
      fontSize: 12,
      letterSpacing: 0.39
    }, MUITheme.breakpoints.down("sm"), {
      marginBottom: 10
    }),
    extraInfo: {
      marginLeft: 17,
      color: MUITheme.palette.text.primary,
      fontFamily: MUITheme.typography.fontFamily,
      fontSize: 12.17,
      letterSpacing: 0.4,
      lineHeight: "16px"
    },
    errorField: {
      "& .MuiOutlinedInput-notchedOutline": {
        borderWidth: 2,
        borderColor: MUITheme.palette.border.alertBox
      }
    }
  };
};

exports.useStyles = useStyles;