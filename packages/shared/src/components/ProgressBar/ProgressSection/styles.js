import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(MUITheme => ({
  numberContaienr: {
    width: 28,
    borderRadius: 25,
    backgroundColor: MUITheme.palette.text.lightGrey,
    color: MUITheme.palette.text.white,
    lineHeight: "28px",
    "& span": {
      "&::after": {
        content: '""',
        width: 150,
        height: 1,
        margin: "15px 0 0 20px",
        display: "inline-block",
        position: "absolute",
        backgroundColor: MUITheme.palette.background.grey,
        "@media (max-width:660px)": { width: "18%" },
        "@media (max-width:540px)": {
          width: "16%",
          marginTop: 11,
        },
        "@media (max-width:470px)": { display: "none" },
      },
    },
  },
  TabTitle: {
    paddingTop: 10,
    color: MUITheme.palette.text.lightGrey,
    fontFamily: MUITheme.typography.fontFamily,
    fontSize: 14,
    letterSpacing: 0.13,
  },
  completedIcon: {
    "&::after": { marginLeft: "10px !important" },
    "& svg": {
      padding: 3,
      borderRadius: 25,
      background: MUITheme.palette.success.main,
      color: MUITheme.palette.text.white,
      fontSize: 22,
    },
    "@media(max-width:480px)": { padding: "0 !important" },
  },
  active: {
    "& div": {
      backgroundColor: MUITheme.palette.primary.main,
      "& span": {
        color: MUITheme.palette.text.white,
      },
    },
    "& > span": { color: MUITheme.palette.text.darkGrey },
  },
  completed: {
    "& > div": { background: "transparent" },
    "& span": {
      "&:last-of-type": {
        paddingTop: 0,
        color: MUITheme.palette.text.darkGrey,
      },
    },
  },
  clickableSection: {
    cursor: "pointer",
  },
}));
