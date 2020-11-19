export const useStyles = MUITheme => ({
  NotificationBar: {
    paddingLeft: "0 !important",
    paddingRight: "0 !important",
  },
  notificationText: {
    padding: "8px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& span": {
      fontSize: 14.2,
      letterSpacing: 0.25,
      lineHeight: "20px",
    },
  },
  WARNING: {
    backgroundColor: MUITheme.palette.background.warningBox,
    color: MUITheme.palette.text.primary,
    "& svg": {
      marginRight: 17,
      color: MUITheme.palette.border.warningBox,
    },
    "& span": {
      "& button": {
        border: "none",
        background: "none",
        color: MUITheme.palette.primary.main,
        fontSize: 14.2,
        letterSpacing: 0.25,
        lineHeight: "20px",
        cursor: "pointer",
      },
    },
  },
  INFORMATION: {
    backgroundColor: MUITheme.palette.background.infoBox,
    color: MUITheme.palette.text.white,
    "& svg": { marginRight: 21 },
  },
  REMINDER: {
    backgroundColor: "#EBE2EB",
    border: "1px solid #6F106A",
    color: "#666",
    borderRadius: 4,
    justifyContent: "flex-start",
    padding: 12,
    "& > span": {
      "& p": { margin: 0 },
      "& > span": { fontWeight: "bold" },
      "& a": {
        color: MUITheme.palette.primary.main,
        textDecoration: "none",
        fontWeight: 600,
      },
    },
    "& svg": {
      color: "#6F106A",
      paddingRight: 10,
    },
  },
});
