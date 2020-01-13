import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(MUITheme => ({
  confirmOtp: {
    height: "calc(100vh - 116px)",
    background: MUITheme.palette.background.mainContent,
    "& h3": {
      marginBottom: 40,
      textAlign: "center",
    },
  },
  confirmOtpWrapper: {
    width: 410,
    margin: "0 auto",
    [MUITheme.breakpoints.down("xs")]: {
      boxSizing: "border-box",
      width: "100%",
      padding: "0 30px",
    },
  },
  signupForm: {
    boxSizing: "border-box",
    padding: "20px 20px 30px",
    borderRadius: 4,
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
    "& > div": { width: "100%" },
    "& button": { width: "100%" },
    "& label": {
      color: MUITheme.palette.text.darkGrey,
      fontSize: 14,
      letterSpacing: 0.4,
      lineHeight: "16px",
    },
  },
  buttonsContainer: {
    marginTop: 10,
    display: "flex",
    "& button": {
      padding: " 13px 0 11px",
      marginTop: 10,
      "&:first-of-type": { marginRight: 10 },
    },
  },
  signupconfirmDetail: {
    color: MUITheme.palette.text.primary,
    fontFamily: MUITheme.typography.fontFamily,
    fontSize: 13,
    lineHeight: "21px",
    "& span": {
      marginBottom: 15,
      display: "block",
      color: MUITheme.palette.text.darkGrey,
      fontWeight: 600,
    },
  },
}));
