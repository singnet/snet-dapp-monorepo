import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(MUITheme => ({
  appBar: {
    padding: "14px 60px",
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1110,
  },
  purple: {
    "& h5": { color: `${MUITheme.palette.text.white} !important` },
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    "& img": { width: 172 },
    "& h5": {
      marginLeft: 11,
      fontWeight: 300,
      lineHeight: "30px",
    },
    [MUITheme.breakpoints.down("md")]: { padding: 0 },
  },
  navContainer: {
    flexGrow: 1,
    [MUITheme.breakpoints.down("md")]: { padding: 0 },
  },
}));
