export const useStyles = MUITheme => ({
  box: {
    width: 845,
    paddingBottom: 38,
    borderRadius: 4,
    margin: "48px auto 0",
    backgroundColor: MUITheme.palette.background.white,
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.2)",
    "& h6": {
      padding: "13px 22px",
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      borderBottomColor: MUITheme.palette.border.primary,
    },
    "& hr": {
      height: 1,
      border: "none",
      margin: "31px 23px",
      backgroundColor: MUITheme.palette.background.grey,
    },
    [MUITheme.breakpoints.down("sm")]: { width: "auto" },
  },
  buttonsContainer: {
    marginTop: 40,
    marginBottom: 64,
    display: "flex",
    justifyContent: "center",
    "& button": { padding: " 13px 60px 11px" },
    [MUITheme.breakpoints.down("xs")]: { flexDirection: "column" },
  },
});
