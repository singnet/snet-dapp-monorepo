export const useStyles = MUITheme => ({
  pricingContainer: {
    width: 845,
    margin: "48px auto 0",
    [MUITheme.breakpoints.down("sm")]: {
      width: "100%",
      padding: "0 30px 100px",
    },
  },
  box: {
    borderRadius: 4,
    backgroundColor: MUITheme.palette.background.white,
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.2)",
    "& > h6": {
      padding: "0 23px",
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      borderBottomColor: MUITheme.palette.border.primary,
      lineHeight: "50px !important",
    },
    "& .MuiTypography-subtitle1": { fontWeight: "normal" },
    [MUITheme.breakpoints.down("sm")]: { width: "100%" },
  },
  wrapper: { padding: "21px 22px 70px" },
  description: {
    margin: 0,
    color: MUITheme.palette.text.primary,
    fontSize: 16,
    lineHeight: "21px",
  },
});
