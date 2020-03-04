export const useStyles = MUITheme => ({
  loggedInActionsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  AccountCircleIcon: {
    marginRight: 10,
    color: "#4a4a4a",
    fontSize: 42,
    cursor: "pointer",
  },
  NotificationsIcon: {
    margin: "0px 40px 0 0",
    color: MUITheme.palette.text.lightGrey,
    cursor: "pointer",
    fontSize: 25,
    verticalAlign: "super",
  },
  orgName: {
    color: MUITheme.palette.text.darkGrey,
    fontSize: 16,
    lineHeight: "20px",
  },
  role: {
    color: MUITheme.palette.text.lightGrey,
    fontSize: 12,
    lineHeight: "15px",
  },
});
