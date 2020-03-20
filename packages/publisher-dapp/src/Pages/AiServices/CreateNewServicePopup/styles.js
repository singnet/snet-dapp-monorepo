export const useStyles = MUITheme => ({
  createServiceModal: {
    width: 600,
    borderRadius: 4,
    margin: "0 auto",
    "& h4": {
      padding: "10px 22px",
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      borderBottomColor: MUITheme.palette.border.primary,
    },
    [MUITheme.breakpoints.down("xs")]: {
      width: "auto",
      margin: "0 25px",
    },
  },
  card: { marginTop: 110 },
  cardHeader: {
    padding: 0,
    "& button": { padding: 22 },
  },
  popupContent: {
    padding: "0 22px",
    "& > div": {
      "& > div": {
        maxWidth: "100%",
        flexBasis: "100%",
        alignItems: "baseline",
        "& svg": { marginTop: 10 },
      },
    },
  },
  popupDescription: {
    margin: "32px 0 35px",
    color: MUITheme.palette.text.primary,
    fontSize: 16,
    lineHeight: "24px",
  },
  btnContainer: {
    padding: "0 22px 40px",
    justifyContent: "center",
  },
});
