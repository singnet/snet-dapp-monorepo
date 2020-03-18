export const useStyles = MUITheme => ({
  technicalInfoContainer: {
    padding: "31px 0 0",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: MUITheme.palette.border.grey,
    margin: "24px 24px 0",
    "& h6": {
      padding: "0 !important",
      border: "none !important",
      fontWeight: "normal",
      lineHeight: "23px",
    },
  },
  alertBoxBtnContainer: {
    marginTop: 23,
    alignItems: "flex-end",
  },
  technicalInfo: {
    marginTop: 8,
    alignItems: "baseline",
    [MUITheme.breakpoints.down("sm")]: { marginBottom: 25 },
  },
  btnContainer: {
    paddingLeft: 30,
    marginBottom: 15,
    [MUITheme.breakpoints.down("xs")]: {
      paddingLeft: 0,
      marginBottom: 0,
    },
  },
  owmnerMMTextfield: {
    "& div": {
      "& div": {
        maxWidth: "100%",
        flexBasis: "100%",
        "& + div": { display: "none" },
      },
    },
  },
});
