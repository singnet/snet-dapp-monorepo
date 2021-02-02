export const useStyles = MUITheme => ({
  singularityAccContainer: {
    width: 845,
    margin: "48px auto 0",
    [MUITheme.breakpoints.down("sm")]: { width: "100%" },
  },
  box: {
    paddingBottom: 33,
    borderRadius: 4,
    marginBottom: 27,
    backgroundColor: MUITheme.palette.background.white,
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.2)",
    "& > h6": {
      padding: "0 24px",
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      borderBottomColor: MUITheme.palette.border.primary,
      fontWeight: 400,
      lineHeight: "50px !important",
    },
    "& > div": {
      [MUITheme.breakpoints.down("sm")]: {
        boxSizing: "border-box",
        width: "100%",
        padding: "0 24px",
      },
    },
  },
  singularityAccDescription: {
    padding: "19px  20px 34px 24px",
    color: MUITheme.palette.text.primary,
    fontSize: 14,
    lineHeight: "21px",
  },
  signInBtns: {
    marginTop: 15,
    [MUITheme.breakpoints.down("xs")]: { textAlign: "center" },
    "& a": {
      textDecoration: "none",
      "&:last-of-type": {
        "& button": { padding: "12px 18px 11px" },
      },
    },
  },
  signInContent: {
    padding: "30px 24px 0",
    display: "flex",
    justifyContent: "center",
    [MUITheme.breakpoints.down("xs")]: { flexDirection: "column" },
  },
  signInMedia: {
    marginRight: 10,
    display: "flex",
    wordBreak: "break-word",
    "& img": { width: 260 },
  },
  avatar: {
    width: 70,
    height: 70,
  },
  userDetails: {
    paddingLeft: 11,
    "& h6": { whiteSpace: "normal" },
  },
  signInRightContent: {
    "& p": {
      marginLeft: 30,
      fontSize: 14,
      lineHeight: "21px",
    },
    [MUITheme.breakpoints.down("xs")]: { marginTop: 25 },
  },
  signInSubtitle: {
    marginBottom: 25,
    color: MUITheme.palette.text.darkGrey,
    fontWeight: 600,
  },
  checkboxContainer: {
    padding: "23px 58px 0",
    "& label": {
      marginRight: 0,
      "& span": {
        fontSize: 14,
        letterSpacing: 0.25,
        lineHeight: "20px",
        "&:last-of-type": { color: MUITheme.palette.text.primary },
        "&.MuiCheckbox-colorPrimary": { color: MUITheme.palette.text.primary },
        "&.MuiCheckbox-colorPrimary.Mui-checked": { color: MUITheme.palette.primary.main },
      },
    },
  },
  btnContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  verifyInvitationContainer: {
    padding: "0 24px",
    alignItems: "center",
    "& > div": {
      "& > div": {
        "& > div": {
          maxWidth: "100%",
          flexBasis: "91%",
          "& > div": {
            "& > div": { marginBottom: 0 },
          },
          [MUITheme.breakpoints.down("sm")]: { flexBasis: "100%" },
        },
      },
    },
    "& > span": {
      padding: "3px 0 0 16px",
      fontFamily: MUITheme.typography.fontFamily,
      fontSize: 12.17,
      letterSpacing: 0.4,
      lineHeight: "17px",
    },
    "& button": { marginTop: 15 },
  },
  dropDownContainer: {
    paddingRight: 29,
    display: "flex",
    "& > div": {
      "& > p": {
        paddingLeft: 20,
        color: MUITheme.palette.text.lightGrey,
        fontSize: 14,
        letterSpacing: 0.25,
        lineHeight: "20px",
      },
    },
  },
  infoBoxContainer: {
    padding: "16px 22px 0",
  },
});
