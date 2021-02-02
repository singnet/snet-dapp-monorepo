import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(MUITheme => ({
  StakeSessionContainer: {
    paddingBottom: 40,
    borderRadius: 4,
    background: MUITheme.palette.background.white,
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
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
  incubationContainer: { padding: "32px 33px 0" },
  dayCountContainer: {
    paddingBottom: 5,
    display: "flex",
    alignItems: "center",
    "& > div": {
      display: "flex",
      alignItems: "center",
    },
    "& svg": {
      color: MUITheme.palette.text.disabled,
      fontSize: 18,
    },
  },
  incubationText: {
    marginLeft: 12,
    color: MUITheme.palette.text.lightGrey,
    fontSize: 16,
    lineHeight: "20px",
  },
  daysCount: {
    marginLeft: 24,
    alignItems: "baseline",
  },
  value: {
    color: MUITheme.palette.text.darkGrey,
    fontSize: 28,
    fontWeight: 600,
    lineHeight: "35px",
  },
  unit: {
    paddingLeft: 5,
    color: MUITheme.palette.text.lightGrey,
    fontSize: 16,
    lineHeight: "20px",
  },
  startFinishDate: {
    paddingBottom: 3,
    display: "flex",
    justifyContent: "space-between",
    "& p": {
      color: MUITheme.palette.text.lightGrey,
      fontSize: 12,
      lineHeight: "15px",
    },
  },
  linearProgress: { height: 15 },
  cards: {
    padding: "15px 20px 21px",
    border: "1px solid #f1f1f1",
    borderRadius: 6,
    margin: 32,
    backgroundColor: MUITheme.palette.background.mainContent,
  },
  checkboxContent: {
    padding: "0 33px",
    display: "flex",
    alignItems: "flex-start",
    "& label": {
      width: 845,
      marginRight: 56,
      display: "flex",
      alignItems: "flex-start",
      "& .MuiFormControlLabel-label.Mui-disabled": { color: MUITheme.palette.text.darkGrey },
      "& .MuiCheckbox-root": { paddingTop: 0 },
      "& > span": {
        color: MUITheme.palette.text.darkGrey,
        fontSize: 14,
        letterSpacing: 0.25,
        lineHeight: "20px",
      },
    },
    "& p": {
      color: MUITheme.palette.text.lightGrey,
      fontSize: 14,
      letterSpacing: 0.25,
      lineHeight: "20px",
    },
    [MUITheme.breakpoints.down("xs")]: {
      flexDirection: "column",
      "& p": { paddingLeft: 0 },
    },
  },
  alertBoxContainer: {
    padding: "0 33px 0",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    "& > div": {
      "&:first-of-type": {
        marginTop: 0,
        display: "flex",
      },
      "&:last-of-type": { marginTop: 20 },
    },
    "& svg": {
      marginRight: 17,
      color: MUITheme.palette.primary.main,
      fontSize: 20,
    },
    "& p": {
      color: MUITheme.palette.text.primary,
      fontSize: 14,
      lineHeight: "18px",
    },
  },
  btnContainer: {
    marginTop: 24,
    textAlign: "center",
  },
  label: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  iconTooltipContainer: {
    width: "auto !important",
    "& > svg": {
      paddingRight: 14,
      color: MUITheme.palette.text.disabled,
      cursor: "pointer",
      fontSize: 18,
      verticalAlign: "middle",
    },
    "& p": {
      width: 377,
      padding: 16,
      borderRadius: 4,
      display: "none",
      position: "absolute",
      bottom: 25,
      background: MUITheme.palette.text.lightGrey,
      boxShadow: "0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.2)",
      color: MUITheme.palette.text.white,
      fontSize: 16,
      lineHeight: "20px",
    },
    "&:hover": {
      "& svg": { color: MUITheme.palette.primary.main },
      "& p": { display: "block" },
    },
  },
  infoBox: {
    "& > div": {
      margin: "25px 33px 0",
      display: "flex",
    },
    "& svg": {
      marginRight: 17,
      color: MUITheme.palette.primary.main,
      fontSize: 20,
    },
    "& p": {
      color: MUITheme.palette.text.primary,
      fontSize: 14,
      lineHeight: "18px",
    },
  },
}));
