import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(MUITheme => ({
  signupForm: {
    width: 410,
    margin: " 0 0 0 auto",
    boxSizing: "border-box",
    padding: "20px 20px 30px",
    borderRadius: 4,
    backgroundColor: MUITheme.palette.background.white,
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
    "& button": { width: "100%" },
    [MUITheme.breakpoints.down("xs")]: {
      width: "auto",
      margin: "40px 30px 0",
    },
    [MUITheme.breakpoints.down("sm")]: { margin: "35px auto 0" },
  },
  textField: {
    width: "100%",
    marginBottom: 0,
    display: "inline-block",
    "& label": {
      color: MUITheme.palette.text.darkGrey,
      fontSize: 14,
      letterSpacing: 0.4,
      lineHeight: "16px",
    },
    "& div": { width: "100%" },
  },
  passwordCriteriaContainer: {
    marginBottom: 99,
    color: MUITheme.palette.text.primary,
    fontSize: 12,
    letterSpacing: 0.39,
    lineHeight: "16px",
    "& p": { display: "inline-block", paddingRight: 4 },
  },
}));
