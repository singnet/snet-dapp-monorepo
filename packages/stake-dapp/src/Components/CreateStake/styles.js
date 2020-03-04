import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(MUITheme => ({
  rightSideSection: {
    "& > div": { marginLeft: 23 },
  },
  noDataFoundSection: {
    textAlign: "center",
    "& p": {
      color: MUITheme.palette.text.primary,
      fontSize: 24,
      fontWeight: 200,
      lineHeight: "30px",
      "& span": { fontWeight: 400 },
    },
  },
}));
