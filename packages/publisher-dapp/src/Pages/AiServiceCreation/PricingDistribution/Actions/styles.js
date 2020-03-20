import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(MUITheme => ({
  buttonsContainer: {
    margin: "70px auto",
    display: "flex",
    justifyContent: "center",
    "& button": {
      padding: " 13px 50px 11px",
    },
    [MUITheme.breakpoints.down("xs")]: { flexDirection: "column" },
  },
}));
