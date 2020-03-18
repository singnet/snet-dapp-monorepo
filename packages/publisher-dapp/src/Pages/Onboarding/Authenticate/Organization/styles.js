import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(MUITheme => ({
  box: {
    boxSizing: "border-box",
    width: 845,
    borderRadius: 4,
    margin: "48px auto 0",
    backgroundColor: MUITheme.palette.text.secondary,
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.2)",
    "& > h6": {
      padding: "13px 22px",
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      borderBottomColor: "#f5f7f9",
    },
    [MUITheme.breakpoints.down("sm")]: { width: "100%" },
  },
  wrapper: {
    padding: "0 24px 25px",
    "& > p": {
      margin: "15px 0 10px",
      color: MUITheme.palette.text.primary,
      fontSize: 14,
      lineHeight: "21px",
    },
  },
  buttonsContainer: {
    marginTop: 40,
    marginBottom: 64,
    display: "flex",
    justifyContent: "center",
    "& button": {
      padding: " 13px 60px 11px",
    },
    [MUITheme.breakpoints.down("xs")]: { flexDirection: "column" },
  },
  dunsContainer: {
    paddingTop: 16,
    "& > label": {
      padding: "0 0 10px 22px",
      "& span:last-of-type": {
        color: MUITheme.palette.text.darkGrey,
        fontSize: 14,
        letterSpacing: 0.25,
        lineHeight: "20px",
      },
      "& span": {
        "&.MuiCheckbox-colorPrimary": {
          padding: "0 16px 0 0",
          color: MUITheme.palette.text.primary,
        },
        "&.MuiCheckbox-colorPrimary.Mui-checked": { color: MUITheme.palette.primary.main },
      },
    },
    "& p": { marginTop: -33 },
  },
  alertBoxContainer: {
    "& > div": { marginTop: 24 },
  },
  websiteUrlContainer: {
    "& .MuiFormControl-marginNormal": { marginBottom: 0 },
    "& > span": {
      paddingLeft: 16,
    },
  },
}));
