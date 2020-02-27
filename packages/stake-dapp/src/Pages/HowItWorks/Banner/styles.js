import BannerBgImg from "shared/dist/assets/images/stakeBanner.png";

export const useStyles = MUITheme => ({
  bannerContainer: {
    backgroundImage: `url(${BannerBgImg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  bannerDesFormContainer: {
    maxWidth: "1230px",
    margin: "24px auto",
    display: "flex",
    "& > div": {
      [MUITheme.breakpoints.down("md")]: {
        maxWidth: "100%",
        flexBasis: "100%",
      },
    },
    [MUITheme.breakpoints.down("md")]: {
      maxWidth: "100%",
      padding: "24px 15px",
      flexDirection: "column",
    },
  },
  bannerTitle: {
    color: MUITheme.palette.text.white,
    fontSize: 36,
    fontWeight: 600,
    letterSpacing: -0.56,
    lineHeight: "48px",
  },
  bannerDescPara1: {
    paddingTop: 44,
    color: MUITheme.palette.text.white,
    fontSize: 22,
    fontWeight: 600,
    lineHeight: "32px",
    [MUITheme.breakpoints.down("md")]: { paddingTop: 15 },
  },
  bannerDescPara2: {
    paddingTop: 48,
    color: MUITheme.palette.text.white,
    fontSize: 22,
    fontWeight: 200,
    lineHeight: "32px",
    textShadow: "0 2px 2px rgba(0,0,0,0.3)",
    [MUITheme.breakpoints.down("md")]: { paddingTop: 15 },
  },
  bannerForm: {
    paddingLeft: 24,
    [MUITheme.breakpoints.down("md")]: {
      maxWidth: "100%",
      paddingLeft: 0,
      marginTop: 25,
      display: "flex",
      justifyContent: "center",
      flexBasis: "100%",
    },
  },
  form: {
    backgroundColor: MUITheme.palette.background.white,
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
    [MUITheme.breakpoints.down("md")]: { width: 628 },
    "@media(max-width: 675px)": { width: "100%" },
  },
  formHeader: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: MUITheme.palette.border.primary,
    textAlign: "center",
    "& p": {
      color: MUITheme.palette.text.darkGrey,
      fontSize: 20,
      fontWeight: 600,
      lineHeight: "50px",
    },
  },
  stakedRewardAmt: {
    padding: "24px 22px 0",
    display: "flex",
    alignItems: "flex-start",
    "& > div": {
      width: 240,
      "& > div": {
        maxWidth: "100%",
        flexBasis: "100%",
        "& .MuiTextField-root": { marginTop: 0 },
      },
    },
    "& svg": {
      padding: "13px 33px 0",
      color: "#d6d6d6",
      fontSize: 33,
      "@media(max-width: 640px)": { padding: "13px 5px 0" },
    },
  },
  stakingDetails: {
    padding: "0 22px",
    display: "flex",
    "& svg": {
      color: "#d6d6d6",
      fontSize: 20,
    },
    "@media(max-width: 640px)": {
      flexDirection: "column",
      "& > div": { marginTop: 15 },
    },
  },
  iconTitlContainer: {
    display: "flex",
    "& p": {
      padding: "0 0 8px 8px",
      color: MUITheme.palette.text.darkGrey,
      fontSize: 16,
      lineHeight: "20px",
    },
  },
  valuesConatiner: {
    width: 175,
    padding: "15px 0",
    border: "1px solid #828282",
    borderRadius: 4,
    marginRight: 17,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  values: {
    color: MUITheme.palette.text.darkGrey,
    fontSize: 16,
    lineHeight: "20px",
  },
  unit: {
    paddingLeft: 8,
    color: MUITheme.palette.text.darkGrey,
    fontSize: 12,
    lineHeight: "15px",
  },
  incubationValuesConatiner: {
    padding: "15px 44px",
    border: "1px solid #828282",
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F8F8",
    "@media(max-width: 640px)": {
      width: 180,
      padding: "15px 0",
    },
  },
  formBtnContainer: {
    padding: "31px 0 29px",
    display: "flex",
    justifyContent: "center",
  },
  countDownContainer: {
    padding: "11px 15px",
    borderRadius: "0 4px 4px 4px",
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    backgroundColor: "rgba(34,13,58,0.6)",
    [MUITheme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  countDownTitle: {
    paddingRight: 61,
    display: "flex",
    alignItems: "center",
    "& svg": {
      paddingRight: 15,
      color: MUITheme.palette.text.white,
      fontSize: 22,
    },
    "& p": {
      color: MUITheme.palette.text.white,
      fontSize: 28,
      lineHeight: "35px",
      "&:first-of-type": { fontWeight: 200 },
      "&:last-of-type": {
        paddingLeft: 5,
        fontWeight: 600,
      },
      "@media(max-width:480px)": { fontSize: 24 },
    },
    "@media(max-width:480px)": {
      paddingRight: 0,
      marginBottom: 15,
    },
  },
  countDownValue: {
    color: MUITheme.palette.text.white,
    fontSize: 50,
    lineHeight: "63px",
    "@media(max-width:480px)": { fontSize: 42 },
  },
  countDownUnit: {
    color: MUITheme.palette.text.white,
    fontSize: 14,
    lineHeight: "21px",
    textTransform: "uppercase",
    "@media(max-width:480px)": { fontSize: 12 },
  },
  countDown: {
    display: "flex",
    "& > div": {
      padding: "0 31px",
      borderRightWidth: 0.5,
      borderRightStyle: "solid",
      borderRightColor: MUITheme.palette.text.white,
      textAlign: "center",
      "&:first-of-type": { paddingLeft: 0 },
      "&:last-of-type": {
        paddingRight: 0,
        borderRight: "none",
      },
      "@media(max-width:480px)": { padding: "0 15px" },
    },
  },
});