"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStyles = void 0;

var useStyles = function useStyles(MUITheme) {
  return {
    NotificationBar: {
      paddingLeft: "0 !important",
      paddingRight: "0 !important"
    },
    notificationText: {
      padding: "8px 0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "& span": {
        fontSize: 14.2,
        letterSpacing: 0.25,
        lineHeight: "20px"
      }
    },
    WARNING: {
      backgroundColor: MUITheme.palette.background.warningBox,
      color: MUITheme.palette.text.primary,
      "& svg": {
        marginRight: 17,
        color: MUITheme.palette.border.warningBox
      },
      "& span": {
        "& button": {
          border: "none",
          background: "none",
          color: MUITheme.palette.primary.main,
          fontSize: 14.2,
          letterSpacing: 0.25,
          lineHeight: "20px",
          cursor: "pointer"
        }
      }
    },
    INFORMATION: {
      backgroundColor: MUITheme.palette.background.infoBox,
      color: MUITheme.palette.text.white,
      "& svg": {
        marginRight: 21
      }
    }
  };
};

exports.useStyles = useStyles;