import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(MUITheme => ({
  sessionTimeContainer: {
    borderRadius: 4,
    marginBottom: 28,
    background: MUITheme.palette.background.white,
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
  },
  header: {
    padding: "0 18px 0 22px",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: MUITheme.palette.border.primary,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& h6": {
      fontWeight: 400,
      lineHeight: "50px",
    },
  },
  content: {
    padding: "10px 10px 10px",
    textAlign: "center",
    "& h6": {
      fontWeight: 600,
      lineHeight: "23px",
    },
  },
  time: {
    padding: "29px 0 46px",
    display: "flex",
    justifyContent: "center",
    "& div": {
      paddingRight: 35,
      "&:last-of-type": { paddingRight: 0 },
    },
  },
  number: {
    color: MUITheme.palette.text.darkGrey,
    fontSize: 28,
    lineHeight: "35px",
  },
  title: {
    color: MUITheme.palette.text.lightGrey,
    fontSize: 16,
    lineHeight: "20px",
    textTransform: "uppercase",
  },
  closingTime: {
    paddingBottom: 33,
    fontSize: 16,
    lineHeight: "20px",
  },
  checkbox: {
    "& > svg": {
      paddingRight: 14,
      color: MUITheme.palette.text.disabled,
      fontSize: 18,
      verticalAlign: "middle",
    },
    "& label": {
      "& svg": { width: 22 },
      "& > span": {
        color: MUITheme.palette.text.primary,
        fontSize: 14,
        letterSpacing: 0.25,
        lineHeight: "20px",
      },
    },
  },
}));
