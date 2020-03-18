"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStyles = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useStyles = function useStyles(MUITheme) {
  return {
    statusBannerContainer: {
      padding: "45px 35px",
      marginTop: 40,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#F1F1F1",
      borderRadius: 4,
      display: "flex",
      backgroundColor: MUITheme.palette.text.secondary
    },
    statusBannerMedia: _defineProperty({
      "& img": _defineProperty({
        width: "100%"
      }, MUITheme.breakpoints.down("xs"), {
        width: 302
      })
    }, MUITheme.breakpoints.down("xs"), {
      marginBottom: 25,
      textAlign: "center"
    }),
    statusBannerContent: {
      paddingLeft: 70,
      "& p": {
        paddingRight: 50,
        margin: "24px 0 32px",
        color: MUITheme.palette.text.primary,
        fontSize: 14,
        lineHeight: "21px"
      },
      "& button": {
        "&:first-of-type": {
          padding: "13px 18px 11px",
          marginRight: 22
        },
        "&:last-of-type": {
          padding: "13px 23px 11px"
        }
      },
      "& a": {
        fontFamily: MUITheme.typography.fontFamily,
        fontSize: 14,
        fontWeight: 600,
        lineHeight: "16px",
        letterSpacing: 1.25,
        textTransform: "uppercase"
      }
    },
    PENDING: {
      color: MUITheme.palette.warning.main
    },
    REJECTED: {
      color: MUITheme.palette.text.red
    }
  };
};

exports.useStyles = useStyles;