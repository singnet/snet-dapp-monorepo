import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(MUITheme => ({
  dropDownBtn: {
    margin: "17px 0 22px",
    "& > div": {
      paddingLeft: 0,
      [MUITheme.breakpoints.down("xs")]: { width: "100%" },
    },
    "& button": { margin: "5px 0 0 11px" },
  },
  grayBox: {
    width: "auto",
    padding: "15px 45px 30px 16px",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F1F1F1",
    borderRadius: 4,
    margin: "0 0 67px",
    backgroundColor: "#F6F6F6",
  },
  regionNameIdContainer: {
    padding: "0 10px",
    display: "flex",
  },
  header: {
    color: MUITheme.palette.text.lightGrey,
    fontSize: 14,
    lineHeight: "18px",
  },
  value: {
    color: MUITheme.palette.text.darkGrey,
    fontSize: 20,
    lineHeight: "26px",
  },
  servicePriceModelContainer: {
    marginTop: 42,
    display: "flex",
    "& > div": {
      "& > div": {
        "& > div": {
          maxWidth: "100%",
          flexBasis: "100%",
          "& > div": {
            "&:last-of-type": {
              "& > div": { marginTop: 0 },
            },
          },
        },
      },
    },
    [MUITheme.breakpoints.down("sm")]: { flexDirection: "column" },
  },
  entityTypeDropDown: {
    "& > div": {
      width: "93%",
      "& label": { padding: "0 5px" },
      "& > div": {
        background: MUITheme.palette.text.white,
      },
      [MUITheme.breakpoints.down("sm")]: {
        boxSizing: "border-box",
        width: "100%",
        paddingLeft: 29,
        marginTop: 9,
      },
    },
  },
  cardContainer: {
    width: "100%",
    position: "relative",
  },
  label: {
    padding: "0 5px",
    position: "absolute",
    top: -9,
    left: 10,
    background: MUITheme.palette.background.white,
    color: MUITheme.palette.text.darkGrey,
    fontSize: 12,
  },
  card: {
    boxSizing: "border-box",
    width: "100%",
    minHeight: 100,
    boxShadow: "none",
    padding: 15,
    border: "1px solid rgba(25,25,25,.32)",
    borderRadius: 4,
    flexWrap: "wrap",
    "& > div:first-of-type": { marginLeft: 0 },
  },
  extraInfo: {
    padding: "10px 0 0 14px",
    color: MUITheme.palette.text.primary,
    fontSize: 12,
    letterSpacing: 0.39,
    lineHeight: "16px",
  },
  addedEndpointsContainer: {
    marginTop: 24,
    display: "flex",
  },
  infoIconContainer: {
    "& svg": {
      padding: "5px 10px 0 0",
      fontSize: 20,
      color: "#d6d6d6",
    },
  },
  addRegionBtn: {
    margin: "63px 0 67px",
    textAlign: "center",
    "& button": { padding: "45px 100px" },
  },
  alertContainer: { marginTop: 49 },
  btnContainer: { textAlign: "right" },
  chip: {
    margin: "0 10px 10px 0",
    [MUITheme.breakpoints.down("xs")]: {
      height: "auto",
      padding: "5px 0",
      "& > span": {
        wordBreak: "break-all",
        whiteSpace: "normal",
      },
    },
    "& svg": { color: MUITheme.palette.text.white },
  },
}));
