import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(MuiTheme => ({
  errorMsg: {
    margin: 0,
    fontSize: 12.17,
    lineHeight: "16px",
    letterSpacing: 0.4,
  },
  error: { color: MuiTheme.palette.error.main },
  success: { color: MuiTheme.palette.success.main },
  warning: { color: MuiTheme.palette.text.warningBorder },
  info: { color: MuiTheme.palette.primary.main },
}));
