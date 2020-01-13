export const useStyles = MUITheme => ({
  getInTouchContainer: { background: MUITheme.palette.background.mainContent },
  getInTouch: {
    maxWidth: 1175,
    padding: "40px 60px !important",
    margin: "0 auto",
    textAlign: "center",
    "& p": { textAlign: "initial" },
    "& form": {
      marginTop: 32,
      display: "flex",
      justifyContent: "center",
      "& > div": {
        width: 370,
        margin: "0 24px 0 0",
      },
      "& a": { marginTop: "0 !important" },
    },
    "& input": {
      width: 411,
      display: "block",
      [MUITheme.breakpoints.down("xs")]: { width: 300 },
    },
    "& button": { marginTop: "0 !important" },
    [MUITheme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      padding: "40px 20px !important",
    },
    "& a": {
      display: "inherit",
      textDecoration: "none",
    },
  },
});
