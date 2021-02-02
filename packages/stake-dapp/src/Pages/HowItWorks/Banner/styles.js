import BannerBgImg from "shared/dist/assets/images/stakeBanner.png";

export const useStyles = MUITheme => ({
  bannerContainer: {
    backgroundImage: `url(${BannerBgImg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  bannerDesFormContainer: {
    maxWidth: "1400px",
    padding: "35px 60px",
    margin: "0 auto",
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
    letterSpacing: -0.56,
    lineHeight: "48px",
  },
  bannerDescPara1: {
    padding: "32px 35px 0 0",
    color: MUITheme.palette.text.white,
    fontSize: 22,
    lineHeight: "32px",
    [MUITheme.breakpoints.down("md")]: { padding: "15px 0 0" },
  },
  bannerDescPara2: {
    padding: "32px 60px 0 0",
    color: MUITheme.palette.text.white,
    fontSize: 22,
    fontWeight: 200,
    lineHeight: "28px",
    textShadow: "0 2px 2px rgba(0,0,0,0.3)",
    [MUITheme.breakpoints.down("md")]: { paddingTop: 15 },
  },
  bannerForm: {
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
    width: "90%",
    margin: "0 0 0 auto",
    borderRadius: 4,
    backgroundColor: MUITheme.palette.background.white,
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
    "@media(max-width: 1365px)": { width: "97%" },
    [MUITheme.breakpoints.down("lg")]: {
      width: "auto",
      margin: "0 auto",
    },
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
        "& .MuiTextField-root": {
          marginTop: 0,
          "& + span": { marginLeft: 10 },
        },
      },
    },
    "& img": {
      width: 35,
      padding: "13px 33px 0",
      "@media(max-width: 640px)": { padding: "13px 5px 0" },
    },
    "& .MuiInputAdornment-root": {
      "& p": {
        paddingLeft: 8,
        color: MUITheme.palette.text.darkGrey,
        fontSize: 12,
        lineHeight: "15px",
        textTransform: "uppercase",
      },
    },
  },
  stakingDetails: {
    padding: "17px 22px 0",
    display: "flex",
    "& > div": {
      width: "34.42%",
      "@media(max-width:640px)": { width: "100%" },
      "&:last-of-type": {
        width: "31%",
        "@media(max-width:640px)": { width: "100%" },
      },
    },
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
  valuesContainer: {
    padding: "9px 0",
    border: "1px solid #828282",
    borderRadius: 4,
    marginRight: 17,
    "& > div": {
      width: "100%",
      alignItems: "center",
      "& > div": { width: "100%" },
      "& input": {
        fontSize: 16,
        textAlign: "center",
      },
    },
    "& .MuiInput-underline": {
      "&::before": { display: "none" },
    },
    "& .MuiInputAdornment-root": {
      "& p": {
        paddingLeft: 8,
        color: MUITheme.palette.text.darkGrey,
        fontSize: 12,
        lineHeight: "15px",
        textTransform: "uppercase",
      },
    },
    "@media(max-width:640px)": { marginRight: 0 },
  },
  incubationValuesConatiner: {
    padding: "15px 0",
    border: "1px solid #e2e2e2",
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f8f8f8",
    color: "#212121",
    "@media(max-width: 640px)": {
      width: "100%",
      padding: "15px 0",
    },
  },
  incubationValue: {
    fontSize: 16,
    lineHeight: "20px",
  },
  incubationUnit: {
    paddingLeft: 5,
    fontSize: 12,
    lineHeight: "15px",
  },
  formBtnContainer: {
    padding: "31px 0 29px",
    display: "flex",
    justifyContent: "center",
  },
  countDownContainer: {
    padding: "23px 15px",
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
  label: {
    paddingBottom: 8,
    display: "flex",
    alignItems: "center",
    position: "relative",
    "& span": {
      color: MUITheme.palette.text.darkGrey,
      fontFamily: MUITheme.typography.fontFamily,
      fontSize: 16,
      lineHeight: "20px",
    },
  },
  iconTooltipContainer: {
    width: "auto !important",
    "& > svg": {
      paddingRight: 8,
      color: MUITheme.palette.text.disabled,
      cursor: "pointer",
      fontSize: 18,
      verticalAlign: "middle",
    },
    "& p": {
      width: 377,
      padding: 16,
      borderRadius: 4,
      display: "none",
      position: "absolute",
      bottom: 25,
      left: "50%",
      background: MUITheme.palette.text.lightGrey,
      boxShadow: "0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.2)",
      color: MUITheme.palette.text.white,
      fontSize: 16,
      lineHeight: "20px",
      transform: "translateX(-70%)",
    },
    "&:hover": {
      "& svg": { color: MUITheme.palette.primary.main },
      "& p": { display: "block" },
    },
  },
  metricsValue: {
    color: MUITheme.palette.text.white,
    fontSize: 50,
    fontWeight: 200,
    lineHeight: "38px",
    "@media(max-width:480px)": { fontSize: 42 },
  },
  metricsUnit: {
    paddingTop: 20,
    color: MUITheme.palette.text.white,
    fontSize: 14,
    fontWeight: 200,
    lineHeight: "14px",
    textTransform: "uppercase",
    "@media(max-width:480px)": { fontSize: 12 },
  },
  metrics: {
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
