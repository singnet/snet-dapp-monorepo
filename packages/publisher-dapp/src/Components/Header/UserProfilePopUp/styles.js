export const useStyles = MUITheme => ({
  UserProfilePopUpContainer: {
    width: 400,
    borderRadius: 4,
    mrgin: 0,
    position: "absolute",
    top: 10,
    right: 60,
    backgroundColor: MUITheme.palette.background.white,
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
    zIndex: 1,
  },
  userProfileMenuList: {
    padding: 0,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: MUITheme.palette.border.grey,
    margin: 0,
    "& li": {
      padding: "12px 20px",
      display: "flex",
      cursor: "pointer",
      listStyle: "none",
      "& svg": {
        paddingRight: 15,
        color: "#757575",
        verticalAlign: "middle",
      },
      "& span": {
        color: MUITheme.palette.text.darkGrey,
        fontFamily: MUITheme.typography.fontFamily,
        fontSize: 16,
        lineHeight: "28px",
        letterSpacing: 0.5,
      },
    },
  },
  signoutLink: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: MUITheme.palette.text.disabled,
  },
});
