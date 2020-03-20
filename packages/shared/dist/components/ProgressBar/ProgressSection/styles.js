"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStyles = void 0;

var _styles = require("@material-ui/styles");

var useStyles = (0, _styles.makeStyles)(function (MUITheme) {
  return {
    numberContaienr: {
      borderRadius: 25,
      padding: "3px 10px",
      backgroundColor: MUITheme.palette.text.lightGrey,
      color: MUITheme.palette.text.white,
      "& span": {
        "&::after": {
          content: '""',
          width: 150,
          height: 1,
          margin: "15px 0 0 20px",
          display: "inline-block",
          position: "absolute",
          backgroundColor: MUITheme.palette.background.grey,
          "@media (max-width:660px)": {
            width: "18%"
          },
          "@media (max-width:540px)": {
            width: "16%",
            marginTop: 11
          },
          "@media (max-width:470px)": {
            display: "none"
          }
        }
      },
      "@media(max-width:480px)": {
        padding: "4px 9px",
        fontSize: 12
      }
    },
    TabTitle: {
      paddingTop: 10,
      color: MUITheme.palette.text.lightGrey,
      fontFamily: MUITheme.typography.fontFamily,
      fontSize: 14,
      letterSpacing: 0.13
    },
    completedIcon: {
      "&::after": {
        marginLeft: "10px !important"
      },
      "& svg": {
        color: MUITheme.palette.success.main,
        fontSize: 28,
        "@media(max-width:480px)": {
          fontSize: 25
        }
      },
      "@media(max-width:480px)": {
        padding: "0 !important"
      }
    },
    active: {
      "& div": {
        backgroundColor: MUITheme.palette.primary.main,
        "& span": {
          color: MUITheme.palette.text.white
        }
      },
      "& > span": {
        color: MUITheme.palette.text.darkGrey
      }
    },
    completed: {
      "& > div": {
        background: "transparent"
      },
      "& span": {
        "&:last-of-type": {
          paddingTop: 0,
          color: MUITheme.palette.text.darkGrey
        }
      }
    },
    clickableSection: {
      cursor: "pointer"
    }
  };
});
exports.useStyles = useStyles;