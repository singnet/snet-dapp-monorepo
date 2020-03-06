export const useStyles = MUITheme => ({
  profileContainer: {
    width: 845,
    paddingBottom: 144,
    margin: "48px auto 0",
    [MUITheme.breakpoints.down("sm")]: {
      width: "100%",
      padding: "0 30px 100px",
    },
  },
  box: {
    paddingBottom: 33,
    borderRadius: 4,
    marginBottom: 27,
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
  wrapper: {
    padding: "0 22px",
    "& .MuiTextField-root + span": {
      marginBottom: 0,
    },
  },
  description: {
    margin: "7px 0 15px",
    color: MUITheme.palette.text.primary,
    fontSize: 16,
    lineHeight: "21px",
  },
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
  profileImgContainer: { padding: "30px 0 41px" },
  uploaderContentConatiner: {
    display: "flex",
    [MUITheme.breakpoints.down("sm")]: { flexDirection: "column" },
  },
  profileImgContent: {
    paddingTop: 60,
    marginLeft: 28,
    "& h6:first-of-type": { marginBottom: 25 },
    [MUITheme.breakpoints.down("sm")]: {
      paddingTop: 20,
      marginLeft: 0,
      marginBottom: 25,
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
    paddingTop: 30,
    display: "flex",
    position: "relative",
    "& svg": {
      color: MUITheme.palette.text.disabled,
      padding: "5px 10px 0 0",
      fontSize: 20,
    },
  },
  card: {
    boxSizing: "border-box",
    width: "100%",
    minHeight: 100,
    boxShadow: "none",
    padding: 15,
    border: "1px solid #828282",
    borderRadius: 4,
  },
  chip: { marginLeft: 10 },
  projUrlContainer: { paddingLeft: 29 },
  alertTextContainer: {
    paddingTop: 25,
    "& span": {
      padding: "10px 45px 20px",
      display: "inline-block",
    },
  },
});
