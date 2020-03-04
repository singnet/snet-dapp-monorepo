import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(MUITheme => ({
  stakeSessionBoxContainer: {
    paddingLeft: 24,
    "& > div": {
      "&:last-of-type": { marginTop: 35 },
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
  cards: { padding: "30px 58px 11px" },
  btnContainer: { textAlign: "center" },
  noDataFoundSection: {
    textAlign: "center",
    "& p": {
      color: MUITheme.palette.text.primary,
      fontSize: 24,
      fontWeight: 200,
      lineHeight: "30px",
    },
  },
}));
