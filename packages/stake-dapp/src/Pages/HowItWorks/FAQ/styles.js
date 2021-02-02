export const useStyles = MUITheme => ({
  // How It Works
  faqSection: {
    padding: "64px 11% 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& button": { marginBottom: 63 },
    [MUITheme.breakpoints.down("sm")]: { padding: "34px 15px" },
  },
  faqDesc: {
    padding: "32px 0 60px",
    color: "#616161",
    fontSize: 18,
    lineHeight: "28px",
    [MUITheme.breakpoints.down("sm")]: { width: "100%" },
  },
  fullViewText: {
    width: "100%",
    paddingTop: 16,
    color: MUITheme.palette.text.lightGrey,
    fontSize: 16,
    lineHeight: "20px",
    "& a": {
      color: MUITheme.palette.primary.main,
      textDecoration: "none",
    },
  },
});
