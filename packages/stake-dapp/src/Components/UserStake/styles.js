import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(MUITheme => ({
  userStakeContainer: {
    width: 844,
    margin: "0 auto",
    [MUITheme.breakpoints.down("sm")]: { width: "100%" },
  },
  bottomBox: { marginTop: 67 },
  toolBar: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    "& fieldset": { display: "none" },
    "& .MuiSelect-selectMenu": { color: MUITheme.palette.primary.main },
  },
  sortBySection: {
    display: "flex",
    alignItems: "center",
    "& > div": {
      width: "auto",
      paddingLeft: 0,
      "& svg": { color: MUITheme.palette.primary.main },
      "& .MuiSelect-selectMenu": { paddingRight: "40px !important" },
    },
  },
  sortbyTxt: {
    color: MUITheme.palette.text.lightShadedGray,
    fontSize: 16,
  },
  incubatingCount: {
    "& p": {
      color: MUITheme.palette.text.lightGrey,
      fontSize: 16,
      lineHeight: "20px",
    },
  },
}));
