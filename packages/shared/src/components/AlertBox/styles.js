export const useStyles = MUITheme => ({
  alertBoxContainer: {
    padding: 14,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
  },
  content: {
    textAlign: "left",
    "& p": {
      margin: "0 !important",
      color: MUITheme.palette.text.primary,
      fontFamily: MUITheme.typography.fontFamily,
      fontSize: 14,
      lineHeight: "18px",
    },
  },
  messageBox: {
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 4,
    padding: "13px 20px",
    marginTop: "20px ",
    color: MUITheme.palette.text.darkGrey,
    fontSize: "14px !important",
    lineHeight: "20px",
    letterSpacing: 0.25,
    textAlign: "left",
    wordBreak: "break-all",
  },
  error: {
    borderColor: MUITheme.palette.border.alertBox,
    backgroundColor: MUITheme.palette.background.alertBox,
  },
  success: {
    borderColor: MUITheme.palette.success.main,
    backgroundColor: MUITheme.palette.background.succesBox,
  },
  warning: {
    borderColor: MUITheme.palette.border.warningBox,
    backgroundColor: MUITheme.palette.background.warningBox,
    "& a": {
      color: MUITheme.palette.infoBoxLink,
      fontWeight: 600,
    },
    "& svg": {
      paddingRight: 16,
      color: "#FFC200 ",
    },
  },
  info: {
    borderColor: MUITheme.palette.primary.main,
    backgroundColor: MUITheme.palette.background.infoBox,
    "& a": {
      color: MUITheme.palette.infoBoxLink,
      fontWeight: 600,
    },
  },
});
