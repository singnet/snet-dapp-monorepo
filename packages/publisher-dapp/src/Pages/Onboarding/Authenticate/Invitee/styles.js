export const useStyles = MUITheme => ({
  box: {
    width: 845,
    borderRadius: 4,
    margin: "48px auto 0",
    backgroundColor: MUITheme.palette.background.white,
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.2)",
    "& > h6": {
      padding: "13px 22px",
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      borderBottomColor: "#f5f7f9",
    },
    [MUITheme.breakpoints.down("sm")]: {
      width: "auto",
      margin: "48px 25px 0",
    },
  },
  acceptedInvitationContent: {
    padding: "16px 24px 37px",
    "& h6": { paddingBottom: 14 },
  },
  actionContainer: {
    marginTop: 15,
    display: "flex",
    alignItems: "center",
    "& button": { marginLeft: 30 },
    [MUITheme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  metamaskField: {
    "& > div": {
      "& > div": {
        maxWidth: "100%",
        flexBasis: "100%",
      },
    },
    [MUITheme.breakpoints.down("sm")]: { width: "100%" },
  },
  buttonsContainer: {
    marginTop: 40,
    textAlign: "center",
  },
  metamaskAddTxtField: {
    "& > div": {
      "& > div": {
        maxWidth: "100%",
        flexBasis: "100%",
      },
    },
    [MUITheme.breakpoints.down("sm")]: { width: "100%" },
  },
  metamaskAddBtn: {
    "& button": { marginTop: -15 },
  },
});
