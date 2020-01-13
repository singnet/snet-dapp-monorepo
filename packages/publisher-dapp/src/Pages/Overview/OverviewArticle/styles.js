export const useStyles = MUITheme => ({
  overviewArticleContainer: {
    padding: "40px 60px 68px !important",
    display: "flex",
    background: MUITheme.palette.background.mainContent,
    [MUITheme.breakpoints.down("sm")]: {
      padding: "40px 20px !important",
      flexDirection: "column",
    },
  },
  overviewArticleContent: {
    marginRight: 24,
    [MUITheme.breakpoints.down("sm")]: {
      marginRight: 0,
      marginBottom: 25,
    },
    "& a": { textDecoration: "none" },
  },
  description: {
    color: MUITheme.palette.text.primary,
    fontSize: 20,
    lineHeight: "28px",
  },
  reverseDirection: {
    flexDirection: "row-reverse",
    backgroundColor: MUITheme.palette.background.white,
    "& > div:first-of-type": {
      marginRight: 0,
      marginLeft: 24,
    },
  },
  checkCircleIcon: {
    width: 24,
    marginRight: 16,
    color: MUITheme.palette.success,
  },
});
