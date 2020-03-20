export const useStyles = MUITheme => ({
  demoContainer: {
    width: 845,
    margin: "48px auto 0",
    [MUITheme.breakpoints.down("sm")]: {
      width: "100%",
      padding: "0 30px 0",
    },
  },
  box: {
    paddingBottom: 33,
    borderRadius: 4,
    backgroundColor: MUITheme.palette.background.white,
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.2)",
    "& > h6": {
      padding: "0 23px",
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      borderBottomColor: MUITheme.palette.border.primary,
      fontWeight: 400,
      lineHeight: "50px !important",
    },
    [MUITheme.breakpoints.down("sm")]: { width: "100%" },
  },
  wrapper: {
    padding: "21px 23px 21px",
    "& h6": {
      fontWeight: 400,
      "& a": {
        color: MUITheme.palette.primary.main,
        textDecoration: "none",
      },
    },
    "& hr": {
      margin: 0,
      backgroundColor: MUITheme.palette.text.lightGrey,
      opacity: 0.5,
    },
  },
  demoPageDescription: {
    marginBottom: 28,
    color: MUITheme.palette.text.primary,
    fontSize: 16,
    lineHeight: "24px",
    "& span": {
      marginTop: 35,
      display: "block",
    },
  },
  downloadBtn: {
    padding: "40px 0 54px",
    textAlign: "center",
    "& a": {
      textDecoration: "none",
    },
  },
  stepsHeading: { paddingBottom: 16 },
  stepOneContainer: { paddingBottom: 32 },
  stepTwoContainer: {
    paddingBottom: 27,
    "& ul": {
      margin: 0,
      "& li": {
        paddingTop: 24,
        listStyle: "none",
        wordBreak: "break-word",
        "& span": { fontWeight: "bold" },
      },
    },
  },
  stepTwoBtnsContaier: {
    padding: "24px 40px 32px",
    "& h6": {
      display: "inline",
      fontWeight: "bold",
      letterSpacing: 0.25,
      [MUITheme.breakpoints.down("sm")]: {
        marginBottom: 10,
        display: "block",
      },
    },
    "& button": {
      "&:first-of-type": {
        [MUITheme.breakpoints.down("sm")]: { paddingLeft: 0 },
      },
      [MUITheme.breakpoints.down("xs")]: {
        paddingLeft: 0,
        display: "block",
      },
    },
  },
  title: {
    color: MUITheme.palette.text.lightGrey,
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 0.25,
    lineHeight: "20px",
  },
  value: {
    color: MUITheme.palette.text.lightGrey,
    fontSize: 14,
    letterSpacing: 0.25,
    lineHeight: "20px",
  },
  uploadStatusContainer: {
    display: "flex",
    fontSize: 18,
    lineHeight: "23px",
    "& svg": {
      color: "#6D7278",
      fontSize: 41,
    },
    "& p": {
      marginLeft: 10,
      color: "rgba(0,0,0,0.25)",
    },
  },
  successfullUpload: {
    display: "flex",
    alignItems: "center",
    "& svg": {
      color: MUITheme.palette.success,
      fontSize: 41,
    },
    "& p": {
      marginLeft: 10,
      color: MUITheme.palette.success,
    },
  },
  imgUploaderContainer: {
    display: "flex",
    "& > div": {
      "&:first-of-type": {
        width: 377,
        [MUITheme.breakpoints.down("sm")]: { width: "100%" },
      },
    },
    [MUITheme.breakpoints.down("sm")]: { flexDirection: "column" },
  },
  uploadDetails: {
    paddingTop: 60,
    marginLeft: 27,
    "& > div": { marginBottom: 8 },
    [MUITheme.breakpoints.down("sm")]: { paddingTop: 25 },
  },
  stepThreeContainer: {
    "& > div": { marginTop: 20 },
  },
  buttonsContainer: {
    margin: "50px auto 92px",
    display: "flex",
    justifyContent: "center",
    "& button": {
      padding: " 13px 60px 11px",
    },
    [MUITheme.breakpoints.down("xs")]: { flexDirection: "column" },
  },
});
