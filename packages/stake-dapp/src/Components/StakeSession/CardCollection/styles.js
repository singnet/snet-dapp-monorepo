import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(MUITheme => ({
  CardCollectionContainer: {
    margin: "16px 32px 32px",
  },
  cardCollection: {
    "& > div": {
      display: "flex",
      alignItems: "flex-end",
    },
    "& svg": {
      color: MUITheme.palette.text.disabled,
      fontSize: 18,
    },
    "@media(max-width: 760px)": {
      width: "50%",
      "&:nth-child(3)": { paddingBottom: 34 },
    },
    [MUITheme.breakpoints.down("xs")]: {
      paddingBottom: 34,
      "&:last-of-type": { paddingBottom: 0 },
    },
  },
  header: {
    paddingBottom: 8,
    marginTop: 16,
    color: MUITheme.palette.text.darkGrey,
    fontSize: 18,
    lineHeight: "23px",
  },
  grayBox: {
    padding: 16,
    border: "1px solid #F1F1F1",
    borderRadius: 6,
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: MUITheme.palette.background.mainContent,
    [MUITheme.breakpoints.down("xs")]: { flexDirection: "column" },
  },
  title: {
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
  iconTooltipContainer: {
    display: "flex",
    alignItems: "center !important",
    justifyContent: "end !important",
    position: "relative",
  },
  toolTipContainer: {
    "& > svg": {
      paddingRight: 12,
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
      bottom: 45,
      left: "50%",
      background: MUITheme.palette.text.lightGrey,
      boxShadow: "0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.2)",
      color: MUITheme.palette.text.white,
      fontSize: 16,
      lineHeight: "20px",
      transform: "translateX(-50%)",
    },
    "&:hover": {
      "& svg": { color: MUITheme.palette.primary.main },
      "& p": { display: "block" },
    },
  },
}));
