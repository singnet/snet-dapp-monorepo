export const useStyles = MUITheme => ({
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
    borderColor: MUITheme.palette.success,
    backgroundColor: MUITheme.palette.background.succesBox,
  },
  warning: {
    borderColor: MUITheme.palette.border.warningBox,
    backgroundColor: MUITheme.palette.background.warningBox,
    "& a": {
      color: MUITheme.palette.infoBoxLink,
      fontWeight: 600,
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
