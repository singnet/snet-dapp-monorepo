export const useStyles = MUITheme => ({
  howItWorksContainer: {
    padding: "0 60px 88px",
    "@media(max-width:1280px)": { paddingTop: 70 },
    [MUITheme.breakpoints.down("sm")]: { padding: "63px 15px 88px" },
  },
  topSection: {
    display: "flex",
    [MUITheme.breakpoints.down("sm")]: { flexDirection: "column" },
  },
  topSectionContent: {
    padding: "70px 62px 0 0",
    "@media(max-width:1280px)": { padding: 0 },
  },
  topSectionMedia: {
    textAlign: "right",
    "& img": {
      transform: "translateY(-51px)",
      [MUITheme.breakpoints.down("lg")]: { width: "100%" },
    },
    "@media(max-width:1280px)": { paddingTop: 40 },
  },
  description: {
    marginTop: 32,
    color: MUITheme.palette.text.primary,
    fontSize: 20,
    lineHeight: "28px",
    "& span": {
      display: "block",
      "&:last-of-type": { marginTop: 28 },
    },
  },
  workingContainer: {
    maxWidth: 680,
    padding: "18px 0 94px",
    margin: "0 auto",
    textAlign: "center",
    "& h2": { marginBottom: 40 },
    "& > button": {
      padding: "13px 96px 11px",
      marginTop: 73,
    },
  },
  relatedContentContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  cardGroup: {
    paddingTop: 56,
    display: "flex",
    "@media(max-width: 1006px)": { flexDirection: "column" },
  },
});
