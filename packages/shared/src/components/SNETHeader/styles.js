import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(MUITheme => ({
  logoContainer: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    "& img": { width: 172 },
    [MUITheme.breakpoints.down("md")]: { padding: 0 },
  },
  portalName: {
    marginLeft: 8,
    color: MUITheme.palette.text.darkGrey,
    fontSize: 22,
    fontWeight: 300,
    lineHeight: "30px",
  },
  navContainer: {
    flexGrow: 1,
    [MUITheme.breakpoints.down("md")]: { padding: 0 },
  },
  actionsContainer: {
    flexGrow: 1,
    "& *": { marginLeft: 5 },
    textAlign: "end",
    [MUITheme.breakpoints.down("md")]: { padding: 0 },
  },
}));
