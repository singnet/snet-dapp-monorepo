export const useStyles = MUITheme => ({
  inviteModal: {
    width: 600,
    borderRadius: 4,
    margin: "0 auto",
    "& h4": {
      padding: "10px 22px",
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      borderBottomColor: MUITheme.palette.border.primary,
      marginBottom: 35,
      fontWeight: 400,
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
      "& > div": { width: "100%" },
    },
  },
  btnContainer: {
    padding: "31px 22px",
    justifyContent: "center",
  },
  alertContainer: { padding: "15px 22px 0" },
});
