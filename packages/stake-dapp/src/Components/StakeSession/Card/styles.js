import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(MUITheme => ({
  CardContainer: {
    width: "33%",
    display: "inline-block",
    "& > div": {
      display: "flex",
      alignItems: "center",
    },
    "& svg": { fontSize: 18 },
    "&:first-of-type": { paddingBottom: 34 },
    "@media(max-width: 760px)": {
      width: "50%",
    },
    [MUITheme.breakpoints.down("xs")]: { width: "100%" },
  },
  title: {
    paddingLeft: 12,
    fontSize: 16,
    lineHeight: "20px",
  },
  value: {
    color: MUITheme.palette.text.darkGrey,
    fontSize: 28,
    lineHeight: "35px",
  },
  unit: {
    paddingLeft: 10,
    color: MUITheme.palette.text.lightGrey,
    fontSize: 16,
    lineHeight: "20px",
  },
}));
