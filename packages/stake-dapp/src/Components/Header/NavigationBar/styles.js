import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(MUITheme => ({
  navigationLinks: { marginLeft: 170 },
  navlist: {
    padding: 0,
    margin: 0,
    display: "flex",
    "& li": {
      width: "auto",
      padding: 0,
      marginRight: 25,
    },
  },
  navLink: {
    textDecoration: "none",
    color: MUITheme.palette.text.lightGrey,
  },
  navLinkActive: {
    borderBottom: `2px solid ${MUITheme.palette.text.white}`,
    paddingBottom: 3,
    color: MUITheme.palette.text.white,
    fontWeight: 400,
    "&: visited": {
      borderBottom: `2px solid ${MUITheme.palette.primary.main}`,
      paddingBottom: 3,
      color: MUITheme.palette.primary.main,
      fontWeight: 600,
    },
  },
  headerDropDown: {
    "& > div": {
      display: "flex",
      alignItems: "flex-start",
    },
    "& button": {
      padding: 0,
      "& span": {
        color: MUITheme.palette.text.lightGrey,
        fontSize: 16,
        "&:hover": { color: MUITheme.palette.primary.main },
      },
    },
    "& svg": {
      paddingTop: 2,
      color: MUITheme.palette.text.lightGrey,
      "&:hover": { color: MUITheme.palette.primary.main },
    },
  },
}));
