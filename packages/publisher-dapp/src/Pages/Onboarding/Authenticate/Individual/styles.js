export const useStyles = MUITheme => ({
  individualContainer: {
    width: 845,
    margin: "48px auto 0",
    [MUITheme.breakpoints.down("sm")]: { width: "100%" },
  },
  box: {
    paddingBottom: 33,
    borderRadius: 4,
    marginBottom: 27,
    backgroundColor: MUITheme.palette.background.white,
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.2)",
    "& > h6": {
      padding: "0 22px",
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      borderBottomColor: MUITheme.palette.border.primary,
      fontWeight: 400,
      lineHeight: "50px !important",
    },
  },
  descriptionLogoSection: {
    padding: "16px 24px 17px",
    display: "flex",
    alignItems: "center",
    [MUITheme.breakpoints.down("xs")]: { flexDirection: "column" },
  },
  description: {
    "& p": {
      paddingRight: 30,
      color: MUITheme.palette.text.primary,
      fontSize: 14,
      lineHeight: "21px",
      "& span": { color: MUITheme.palette.primary.main },
      [MUITheme.breakpoints.down("xs")]: { paddingBottom: 15 },
    },
  },
  jumioLogo: { textAlign: "center" },
  docListSection: {
    padding: "0 25px 29px",
    "& > p": {
      paddingBottom: 8,
      color: MUITheme.palette.text.darkGrey,
      fontSize: 14,
      fontWeight: 600,
      lineHeight: "26px",
    },
    "& ul": {
      padding: 0,
      margin: 0,
      "& li": {
        width: 250,
        display: "inline-block",
        color: MUITheme.palette.text.primary,
        fontSize: 14,
        lineHeight: "26px",
        listStyle: "none",
        "&::before": {
          content: "'-'",
          width: 10,
          height: 10,
          paddingRight: 5,
          display: "inline-block",
        },
      },
    },
  },
  btnContainer: {
    display: "flex",
    justifyContent: "center",
  },
});
