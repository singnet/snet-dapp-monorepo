import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(MUITheme => ({
  box: {
    boxSizing: "border-box",
    width: 846,
    padding: "0 22px 30px",
    borderRadius: 4,
    margin: "48px auto 0",
    backgroundColor: MUITheme.palette.text.secondary,
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.2)",
    "& > h6": {
      padding: "13px 0",
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      borderBottomColor: "#f5f7f9",
    },
    "& > p": {
      margin: "16px 0 27px",
      color: MUITheme.palette.text.primary,
      fontSize: 14,
      lineHeight: "21px",
    },
    [MUITheme.breakpoints.down("sm")]: { width: "100%" },
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
}));
