export const useStyles = theme => ({
  parentUpdateNotificationBar: {
    backgroundColor: "#fff",
  },
  updateNotificationBar: {
    padding: "2px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "#800080",
    color: theme.palette.text.white,
    zIndex: 9999,
    "& img": { marginRight: 12 },
    "& p": {
      margin: 0,
      fontSize: 14,
      letterSpacing: "0.25px",
      lineHeight: "18px",
      textAlign: "center",
      "& span": { fontWeight: "bold" },
      "& a": {
        color: "#fff",
        fontWeight: 200,
        textDecoration: "none",
      },
      "& svg": { fontSize: 12 },
    },
  },
  closeIcon: {
    position: "absolute",
    right: 95,
    cursor: "pointer",
  },
});
