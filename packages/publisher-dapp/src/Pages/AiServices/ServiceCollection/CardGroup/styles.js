import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(MUITheme => ({
  circularProgressContainer: {
    paddingTop: 20,
    textAlign: "center",
    height: 500,
    display: "table",
    width: "100%",
    "& div": {
      color: MUITheme.palette.text.primary,
    },
  },
  loaderChild: {
    display: "table-cell",
    verticalAlign: "middle",
    margin: "0 auto",
  },
  circularProgress: {
    display: "inline-block",
    width: 48,
    height: 48,
  },
  loaderText: {
    color: MUITheme.palette.text.lightShadedGray,
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: 0.25,
  },
  NoResultContainer: {
    height: "calc(100vh - 699px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    "& span": {
      color: MUITheme.palette.text.lightShadedGray,
      fontSize: 16,
      lineHeight: "20px",
    },
  },
  gridViewCardCollection: {
    padding: "22px 8px 20px 23px",
    borderRadius: 4,
    marginBottom: 24,
    display: "flex",
    flexWrap: "nowrap",
    background: MUITheme.palette.background.white,
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
    "& a": {
      width: "100%",
      textDecoration: "none ",
      display: "inline-block",
      verticalAlign: "top",
      "&:nth-child(2n) > div": {
        "@media(max-width: 1280px)": { marginRight: 0 },
      },
      "&:nth-child(3n) > div": {
        "@media(min-width: 1281px)": { marginRight: 0 },
      },
      "@media(max-width: 1024px)": { textAlign: "center" },
      "& > div": {
        "@media(max-width: 768px)": { marginRight: 0 },
      },
      "@media(max-width: 768px)": { textAlign: "center" },
    },
    [MUITheme.breakpoints.down("sm")]: { flexDirection: "column" },
  },
  serviceDetailCard: {
    minWidth: 302,
    [MUITheme.breakpoints.down("sm")]: {
      minWidth: "auto",
      width: 302,
      margin: "0 auto",
    },
  },
  serviceStatusDetails: {
    padding: "0 26px",
    [MUITheme.breakpoints.down("sm")]: { padding: "50px 26px" },
  },
  noServicesFoundContainer: {
    margin: "25px auto",
    "& h6": { marginBottom: 25 },
  },
}));
