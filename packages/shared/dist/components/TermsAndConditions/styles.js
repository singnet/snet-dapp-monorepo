"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStyles = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useStyles = function useStyles(MUITheme) {
  return {
    onboardingContainer: {
      padding: "1px 0 40px",
      backgroundColor: MUITheme.palette.background.mainContent
    },
    termsAndConditionsContainer: _defineProperty({
      width: 846,
      paddingBottom: 30,
      margin: "40px auto 0",
      backgroundColor: MUITheme.palette.background.white,
      boxShadow: "0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.2)",
      textAlign: "center",
      "& h3": {
        padding: "12px 22px",
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        borderBottomColor: MUITheme.palette.border.primary,
        margin: 0,
        color: MUITheme.palette.text.darkGrey,
        fontFamily: MUITheme.typography.fontFamily,
        fontSize: 20,
        fontWeight: 400,
        textAlign: "left"
      }
    }, MUITheme.breakpoints.down("sm"), {
      width: "100%"
    }),
    termsAndConditions: {
      height: 280,
      padding: "0 18.5px 15.5px 19.5px",
      borderRadius: 4,
      margin: "15px 15px 0 13px",
      overflow: "auto",
      fontSize: 14,
      textAlign: "left",
      borderColor: "#f1f1f1",
      borderStyle: "solid",
      borderWidth: 1,
      backgroundColor: "#f6f6f6",
      "& p": {
        color: MUITheme.palette.text.lightGrey,
        fontFamily: MUITheme.typography.fontFamily,
        lineHeight: "21px"
      },
      "& span": {
        color: MUITheme.palette.text.lightGrey
      },
      "& a": {
        color: MUITheme.palette.primary.main,
        fontWeight: 600
      }
    },
    checkboxAndButton: _defineProperty({
      padding: "37px 15px 0",
      display: "flex",
      justifyContent: "space-between",
      "& label": {
        "& span:last-of-type": {
          color: MUITheme.palette.text.darkGrey,
          fontSize: 14,
          letterSpacing: 0.25,
          lineHeight: "20px"
        },
        "& span": {
          "&.MuiCheckbox-colorPrimary": {
            color: MUITheme.palette.text.primary
          },
          "&.MuiCheckbox-colorPrimary.Mui-checked": {
            color: MUITheme.palette.primary.main
          }
        }
      },
      "& button": {
        padding: "13px 61px 11px"
      }
    }, MUITheme.breakpoints.down("xs"), {
      flexDirection: "column"
    })
  };
};

exports.useStyles = useStyles;