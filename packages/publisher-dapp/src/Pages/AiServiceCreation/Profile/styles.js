export const useStyles = MUITheme => ({
  profileContainer: {
    width: 845,
    paddingBottom: 144,
    margin: "50px auto 0",
    [MUITheme.breakpoints.down("sm")]: {
      width: "100%",
      padding: "0 30px 100px",
    },
  },
  box: {
    paddingBottom: 48,
    borderRadius: 4,
    marginBottom: 48,
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
    "& .MuiTypography-subtitle1": { fontWeight: "normal" },
    [MUITheme.breakpoints.down("sm")]: { width: "100%" },
  },
  wrapper: {
    padding: "0 22px",
    "& .MuiTextField-root + span": {
      marginBottom: 0,
    },
  },
  description: {
    margin: "21px 0 24px",
    color: MUITheme.palette.text.primary,
    fontSize: 14,
    lineHeight: "21px",
  },
  shortDescContainer: { marginTop: 25 },
  longDescContainer: { "& span": { marginBottom: 5 } },
  publishingCompanyContainer: {
    display: "flex",
    alignItems: "center",
    "& > div": {
      "& > div:first-of-type": {
        maxWidth: "100%",
        flexBasis: "100%",
      },
    },
    "& > div + div": { marginLeft: 30 },
    [MUITheme.breakpoints.down("xs")]: {
      marginBottom: 25,
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  profileImgContainer: { padding: "30px 0 0 30px !important" },
  uploaderContentConatiner: {
    marginTop: 12,
    display: "flex",
    [MUITheme.breakpoints.down("sm")]: { flexDirection: "column" },
  },
  profileImgContent: {
    paddingTop: 9,
    marginLeft: 37,
    "& h6": {
      color: MUITheme.palette.text.lightGrey,
      fontSize: 14,
      letterSpacing: 0.25,
      lineHeight: "20px",
      "&:first-of-type": { marginBottom: 25 },
    },
    [MUITheme.breakpoints.down("sm")]: {
      paddingTop: 20,
      marginLeft: 0,
      marginBottom: 25,
    },
  },
  imgUploader: {
    "& > div": {
      "& > div": {
        "& > div": {
          "&:first-of-type": { display: "none" },
        },
      },
    },
  },
  images: {
    display: "flex",
    marginTop: 12,
    "& img": { width: "100%" },
  },
  largeImg: { width: 302 },
  smallerImg: {
    width: 207,
    marginLeft: 20,
  },
  imgDimensionDetails: {
    marginTop: 12,
    display: "inline-block",
    color: MUITheme.palette.text.lightGrey,
    fontSize: 14,
    letterSpacing: 0.25,
    lineHeight: "20px",
  },
  galeryWrapper: {
    display: "flex",
    "& h6": {
      paddingTop: 60,
      marginLeft: 28,
      [MUITheme.breakpoints.down("sm")]: {
        paddingTop: 20,
        marginLeft: 0,
      },
    },
    [MUITheme.breakpoints.down("sm")]: { flexDirection: "column" },
  },
  btnContainer: {
    display: "flex",
    justifyContent: "center",
    "& button": {
      "&:nth-child(2)": { margin: "0 25px 0 35px" },
    },
  },
  addedTagsContainer: {
    paddingTop: 20,
    position: "relative",
    "& > div": {
      display: "flex",
    },
    "& svg": {
      color: MUITheme.palette.text.white,
      padding: "0 10px 0 0",
      fontSize: 20,
    },
  },
  addTagLabel: {
    padding: "0 20px 0 5px",
    position: "absolute",
    top: 13,
    left: 40,
    background: MUITheme.palette.text.white,
    color: MUITheme.palette.text.darkGrey,
    fontFamily: MUITheme.typography.fontFamily,
    fontSize: 12,
    letterSpacing: 0.4,
    lineHeight: "16px",
  },
  addTagExtraInfo: {
    paddingLeft: 45,
    color: MUITheme.palette.text.primary,
    fontFamily: MUITheme.typography.fontFamily,
    fontSize: 12,
    letterSpacing: 0.39,
  },
  card: {
    boxSizing: "border-box",
    width: "100%",
    minHeight: 100,
    boxShadow: "none",
    padding: 15,
    border: "1px solid rgba(25,25,25,.32)",
    borderRadius: 4,
    flexWrap: "wrap",
    "& > div:first-of-type": { marginLeft: 0 },
  },
  chip: { margin: "0 10px 10px 0" },
  projUrlContainer: {
    padding: "0 29px",
    [MUITheme.breakpoints.down("sm")]: { paddingRight: 0 },
  },
  contributorsContainer: {
    "& > div": {
      "& > div": {
        "&:last-of-type": {
          maxWidth: "100%",
          flexBasis: "100%",
        },
      },
    },
    "& + div": {
      padding: "0 29px",
      [MUITheme.breakpoints.down("sm")]: { paddingRight: 0 },
    },
  },
  alertTextContainer: {
    "& span": { paddingLeft: 45 },
  },
  alertContainer: { marginTop: 40 },
});
