export const useStyles = MUITheme => ({
  faqContainer: {
    "& h2": {
      padding: "52px 82px 32px",
      lineHeight: "48px",
    },
  },
  appBar: {
    paddingLeft: "10%",
    background: MUITheme.palette.background.mainContent,
    boxShadow: "none",
    "& .MuiTab-wrapper": {
      padding: "27px 0",
      "& p": {
        margin: 0,
        "& span": {
          display: "block",
          "@media(max-width: 480px)": { display: "inline-block" },
        },
      },
      [MUITheme.breakpoints.down("xs")]: { padding: 0 },
    },
    [MUITheme.breakpoints.down("sm")]: {
      display: "flex",
      alignItems: "center",
      padding: "0 15px",
    },
  },
  tabs: {
    "& .MuiTabs-flexContainer": {
      "@media(max-width: 480px)": {
        flexDirection: "column",
        alignItems: "flex-start",
      },
    },
  },
  tab: {
    width: 194,
    borderRadius: 4,
    marginRight: 24,
    background: MUITheme.palette.background.white,
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.2)",
    color: MUITheme.palette.text.darkGrey,
    fontSize: 20,
    lineHeight: "25px",
    textTransform: "capitalize",
    "&:last-of-type": { marginRight: 0 },
    "&:first-of-type img": { width: 45 },
    "& img": {
      width: 70,
      marginBottom: 0,
      [MUITheme.breakpoints.down("xs")]: { display: "none" },
    },
    [MUITheme.breakpoints.down("sm")]: {
      width: "20%",
      minWidth: "auto",
    },
    "@media(max-width: 730px)": {
      padding: "0 25px",
      fontSize: 16,
    },
    [MUITheme.breakpoints.down("xs")]: {
      width: "auto",
      padding: 0,
      background: MUITheme.palette.background.mainContent,
      boxShadow: "none",
    },
    "@media(max-width: 480px)": { marginRight: 0 },
  },
  accordionContainer: {
    padding: "32px 10% 0",
  },
  // Learn and Share Community
  learnAndShareContainer: {
    "& a": { textDecoration: "none" },
    "& h2": { textAlign: "center" },
    "& ul": {
      padding: "0 25px 64px",
      margin: 0,
      display: "flex",
      justifyContent: "center",
      textAlign: "center",
      "& li": {
        boxSizing: "border-box",
        width: 330,
        padding: "34px 22px 33px",
        borderRadius: 4,
        marginRight: 24,
        backgroundColor: MUITheme.palette.background.white,
        boxShadow: "0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.2)",
        cursor: "pointer",
        listStyle: "none",
        "&:hover": {
          "& h6": { color: MUITheme.palette.primary.main },
        },
        "& img": { width: 96 },
        "& h6": {
          padding: "30px 0 26px",
          fontWeight: "normal",
        },
        "& p": {
          color: MUITheme.palette.text.primary,
          fontSize: 16,
          lineHeight: "21px",
        },
        "&:last-of-type": {
          marginRight: 0,
          [MUITheme.breakpoints.down("sm")]: { marginBottom: 0 },
        },
        [MUITheme.breakpoints.down("xs")]: { margin: "0 0 25px 0" },
        "@media(max-width: 420px)": { width: "100%" },
      },
      [MUITheme.breakpoints.down("xs")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
  },
});
