export const useStyles = MUITheme => ({
  teammembersContainer: {
    padding: "50px 60px 52px",
    background: MUITheme.palette.background.mainContent,
    [MUITheme.breakpoints.down("md")]: { padding: "40px 24px 52px" },
  },
  backToHomeLink: {
    marginLeft: 45,
    cursor: "pointer",
    "& svg": {
      marginRight: 7,
      color: MUITheme.palette.primary.main,
      verticalAlign: "middle",
    },
    "& span": {
      color: MUITheme.palette.primary.main,
      fontFamily: MUITheme.typography.fontFamily,
      fontSize: 16,
      "&:hover": { textDecoration: "underline" },
    },
  },
  rightSideSection: { padding: "0 50px" },
  topSection: {
    marginBottom: 48,
    display: "flex",
    [MUITheme.breakpoints.down("sm")]: { marginTop: 25 },
    [MUITheme.breakpoints.down("xs")]: { flexDirection: "column" },
  },
  topSectionContent: {
    marginRight: 51,
    "& h5": {
      marginTop: 21,
      fontWeight: 200,
      lineHeight: "28px",
    },
    [MUITheme.breakpoints.down("xs")]: { marginBottom: 20 },
  },
  description: {
    paddingTop: 30,
    color: MUITheme.palette.text.primary,
    fontSize: 18,
    fontWeight: 300,
    lineHeight: "26px",
  },
  topSectionMedia: {
    "& img": { width: 194 },
    [MUITheme.breakpoints.down("xs")]: { textAlign: "center" },
  },
  invitedAndAcceptedList: {
    display: "flex",
    justifyContent: "space-between",
    [MUITheme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  mobileTableHeader: {
    width: "50%",
    marginRight: 5,
    display: "none",
    color: MUITheme.palette.text.lightGrey,
    fontFamily: MUITheme.typography.fontFamily,
    fontSize: 13,
    textTransform: "uppercase",
  },
});
