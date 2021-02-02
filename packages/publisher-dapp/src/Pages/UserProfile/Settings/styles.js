export const useStyles = MUITheme => ({
  settingContainer: {
    width: 845,
    borderRadius: 4,
    margin: "24px 0 60px 60px",
    backgroundColor: MUITheme.palette.background.white,
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
    "& h4": {
      padding: "10px 22px",
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      borderBottomColor: MUITheme.palette.border.primary,
      fontWeight: "normal",
    },
    [MUITheme.breakpoints.down("md")]: { margin: "24px 25px 60px" },
    [MUITheme.breakpoints.down("sm")]: { width: "auto" },
  },
  settingsWrapper: {
    padding: "21px 25px",
  },
  btnContainer: {
    "& > span": {
      margin: "24px 0",
      display: "block",
      color: "#4A4A4A",
      fontSize: 16,
      fontWeight: 600,
      lineHeight: "20px",
    },
  },
});
