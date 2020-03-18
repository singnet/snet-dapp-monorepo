export const useStyles = MUITheme => ({
  settingsContainer: {
    "& h6": {
      paddingTop: "27px !important",
      border: "none !important",
      fontWeight: "normal",
    },
  },
  dropDownBtn: {
    marginBottom: 13,
    display: "flex",
    alignItems: "center",
    "& button": {
      height: "100%",
      marginLeft: 24,
    },
  },
  grayBoxContainer: { padding: "0 24px" },
  grayBox: {
    padding: "24px 16px 25px",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F1F1F1",
    borderRadius: 4,
    backgroundColor: "#F6F6F6",
  },
  regionNameIdContainer: {
    padding: "0 30px",
    marginBottom: 24,
    display: "flex",
    justifyContent: "space-between",
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
  card: {
    width: "100%",
    minHeight: 100,
    boxShadow: "none",
    padding: 15,
    border: "1px solid rgba(25,25,25,.32)",
    borderRadius: 4,
  },
  cardContainer: {
    marginTop: 16,
    display: "flex",
  },
  infoIconContainer: {
    "& svg": {
      padding: "5px 10px 0 0",
      fontSize: 20,
      color: "#d6d6d6",
    },
  },
  chip: { marginLeft: 10 },
  btnContainer: {
    marginTop: 22,
    display: "flex",
    justifyContent: "space-between",
    "& button": {
      "&:first-of-type": { paddingLeft: 26 },
    },
  },
});
