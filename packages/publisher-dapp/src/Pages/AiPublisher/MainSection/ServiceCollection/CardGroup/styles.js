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
    display: "flex",
    flexWrap: "nowrap",
    background: MUITheme.palette.background.white,
    "& a": {
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
    "@media(min-width: 768px) and (max-width: 1024px)": { justifyContent: "center" },
    "@media(max-width: 768px)": { flexDirection: "column" },
  },
  serviceStatusDetails: {
    padding: "0 26px",
  },
}));
