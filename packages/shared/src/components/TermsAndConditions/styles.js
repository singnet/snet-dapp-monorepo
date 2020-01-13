export const useStyles = MUITheme => ({
  onboardingContainer: {
    padding: "1px 0 40px",
    backgroundColor: MUITheme.palette.background.mainContent,
  },
  termsAndConditionsContainer: {
    width: 846,
    paddingBottom: 30,
    margin: "40px auto 0",
    backgroundColor: MUITheme.palette.background.white,
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.2)",
    textAlign: "center",
    "& h3": {
      padding: "15px 0 15px 25px",
      margin: 0,
      color: MUITheme.palette.text.darkGrey,
      fontSize: 20,
      fontWeight: 400,
      textAlign: "left",
    },
    "@media (max-width:724px)": {
      width: "90%",
    },
  },
  termsAndConditions: {
    height: 247,
    margin: "0 12px",
    padding: "9px 7px",
    borderRadius: 4,
    overflow: "auto",
    fontSize: 14,
    textAlign: "left",
    borderColor: "#f1f1f1",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: MUITheme.palette.background.mainContent,
    "& p": {
      color: MUITheme.palette.text.lightGrey,
      lineHeight: "21px",
    },
    "& span": {
      color: MUITheme.palette.text.lightGrey,
    },
    "& a": {
      color: MUITheme.palette.primary.main,
      fontWeight: 600,
    },
  },
  checkboxAndButton: {
    padding: "30px 15px 0",
    display: "flex",
    justifyContent: "space-between",
    "& label": {
      "& span:last-of-type": {
        color: MUITheme.palette.text.primary,
        fontSize: 14,
        letterSpacing: 0.25,
        lineHeight: "20px",
      },
      "& span": {
        "&:last-of-type": { color: MUITheme.palette.text.primary },
        "&.MuiCheckbox-colorPrimary": { color: MUITheme.palette.text.primary },
        "&.MuiCheckbox-colorPrimary.Mui-checked": { color: MUITheme.palette.primary.main },
      },
    },
    "& button": { padding: "13px 61px 11px" },
    [MUITheme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
});
