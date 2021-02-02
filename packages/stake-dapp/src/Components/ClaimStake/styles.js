import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(MUITheme => ({
  stakeSessionBoxContainer: {
    paddingLeft: 24,
    marginBottom: "32px",
    "& > div": {
      marginTop: 35,
      "&:first-of-type": { marginTop: 0 },
    },
  },
  box: {
    paddingBottom: 33,
    borderRadius: 4,
    background: MUITheme.palette.background.white,
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
    "& > p": { margin: "0 91px 24px" },
  },
  header: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: MUITheme.palette.border.primary,
    "& h6": {
      padding: "0 22px",
      fontWeight: 400,
      lineHeight: "50px",
    },
  },
  cards: {
    padding: "15px 20px 21px",
    border: "1px solid #f1f1f1",
    borderRadius: 6,
    margin: 32,
    backgroundColor: MUITheme.palette.background.mainContent,
  },
  btnContainer: {
    marginTop: 24,
    textAlign: "center",
    "& button": {
      "&:first-of-type": { marginRight: 25 },
    },
  },
  noDataFoundSection: {
    textAlign: "center",
    "& p": {
      color: MUITheme.palette.text.primary,
      fontSize: 24,
      fontWeight: 200,
      lineHeight: "30px",
    },
  },
  infoBox: {
    padding: "0 30px",
    margin: "32px 0 15px",
    "& > div": {
      display: "flex",
      "& svg": {
        marginRight: 17,
        fontSize: 20,
      },
      "& p": {
        color: MUITheme.palette.text.primary,
        fontSize: 14,
        lineHeight: "18px",
      },
    },
  },
  circularProgressContainer: {
    paddingTop: 20,
    textAlign: "center",
    height: 500,
    display: "table",
    width: "100%",
    "& div": { color: MUITheme.palette.text.primary },
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
  alertBoxContainer: { margin: "0 30px" },
}));
