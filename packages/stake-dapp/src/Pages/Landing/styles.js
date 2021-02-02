export const useStyles = MUITheme => ({
  LandingContainer: {
    backgroundColor: MUITheme.palette.text.offWhiteColor,
  },
  mainWrapper: {
    width: "92%",
    paddingTop: 30,
    margin: "0 auto",
    "@media(max-width:1280px)": { width: "98%" },
  },
  topSectionCotainer: {
    "& h3": {
      paddingLeft: 22,
      lineHeight: "48px",
    },
    "@media(max-width:768px)": {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  descriptionContainer: {
    "@media(max-width: 1024px)": {
      maxWidth: "100%",
      textAlign: "center  ",
    },
  },
  description: {
    margin: 0,
    color: MUITheme.palette.text.darkGrey,
    fontSize: 22,
    fontWeight: 600,
    lineHeight: "32px",
    "& p": {
      margin: "5px 0 0",
      fontWeight: 200,
      lineHeight: "28px",
    },
    "@media(max-width: 1280px)": {
      paddingRight: 0,
      paddingTop: 16,
    },
    "@media(max-width: 1024px)": { paddingTop: 0 },
  },
  btnContainer: { marginTop: 33 },
  signupLink: { textDecoration: "none" },
  loginContainer: {
    "& p": {
      color: MUITheme.palette.text.darkGrey,
      fontSize: 22,
      fontWeight: 200,
      lineHeight: "28px",
    },
    "& a": {
      color: MUITheme.palette.text.primary,
      fontWeight: 600,
      textDecoration: "none",
    },
  },
  notificationContainer: {
    marginTop: 74,
    "& svg": { fontSize: 25 },
  },
  divider: {
    height: 1,
    margin: 0,
    backgroundColor: MUITheme.palette.text.darkGrey,
    opacity: 0.12,
  },
});
