export const useStyles = MUITheme => ({
  appBar: {
    marginTop: 84,
  },
  appBarTitle: {
    flexGrow: 1,
  },
  serviceCreationContainer: {
    paddingTop: 60,
    "& h3": { lineHeight: "48px" },
    "& > div": {
      "&:nth-child(2)": {
        width: 700,
        "& span": {
          "&:after": {
            "@media(max-width:720px)": { width: 80 },
            "@media(max-width:580px)": { width: 50 },
          },
        },
        "@media(max-width:720px)": { width: "90%" },
      },
    },
    "& ul": {
      "& li": {
        "& div": {
          "& span": {
            "&::after": { width: 125 },
          },
        },
      },
    },
  },
  topSection: {
    width: 600,
    padding: "0 10px",
    margin: "0 auto",
    textAlign: "center",
    "& span": {
      marginTop: 16,
      display: "inline-block",
      color: MUITheme.palette.text.primary,
      fontFamily: MUITheme.typography.fontFamily,
      fontSize: 20,
      lineHeight: "28px",
    },
    "& + div": { paddingTop: 33 },
    [MUITheme.breakpoints.down("xs")]: {
      boxSizing: "border-box",
      width: "100%",
      padding: "0 20px",
    },
  },
  description: {
    paddingTop: 15,
    color: MUITheme.palette.text.primary,
    fontSize: 20,
    fontWeight: 300,
    lineHeight: "28px",
  },
});
