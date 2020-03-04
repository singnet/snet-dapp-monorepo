import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(MUITheme => ({
  appBar: {
    padding: "8px 15px",
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1110,
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    "& img": { width: 172 },
    "& h5": {
      marginLeft: 8,
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
