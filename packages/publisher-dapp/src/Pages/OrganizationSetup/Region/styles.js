export const useStyles = MUITheme => ({
  box: {
    width: 845,
    paddingBottom: 25,
    borderRadius: 4,
    margin: "48px auto",
    backgroundColor: MUITheme.palette.background.white,
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.2)",
    "& h6": {
      padding: "13px 24px",
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      borderBottomColor: MUITheme.palette.border.primary,
      fontWeight: 400,
    },
    "& .MuiTypography-subtitle2": {
      borderBottom: "none",
      marginBottom: 24,
    },
    [MUITheme.breakpoints.down("sm")]: { width: "100%" },
  },
  alertContainer: { margin: "23px 42px 0 23px" },
  buttonsContainer: {
    marginTop: 40,
    marginBottom: 64,
    display: "flex",
    justifyContent: "center",
    "& button": {
      padding: " 13px 60px 11px",
      "&:first-of-type": {
        paddingRight: 0,
        [MUITheme.breakpoints.down("xs")]: { paddingRight: 60 },
      },
    },
    [MUITheme.breakpoints.down("xs")]: {
      margin: "0 25px 40px",
      flexDirection: "column",
    },
  },
});
