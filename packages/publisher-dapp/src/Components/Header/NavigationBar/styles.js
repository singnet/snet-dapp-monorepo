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
      marginRight: 49,
      "&:last-of-type": { marginRight: 0 },
    },
  },
  navLink: {
    fontFamily: MUITheme.typography.fontFamily,
    textDecoration: "none",
    color: MUITheme.palette.text.lightGrey,
  },
  navLinkActive: {
    borderBottom: `2px solid ${MUITheme.palette.primary.main}`,
    color: MUITheme.palette.primary.main,
    fontWeight: 600,
    "&: visited": {
      borderBottom: `2px solid ${MUITheme.palette.primary.main}`,
      paddingBottom: 3,
      color: MUITheme.palette.primary.main,
      fontWeight: 600,
    },
  },
  serviceNameDropdown: {
    marginLeft: 24,
    "& > div": {
      width: "auto",
      paddingLeft: 9,
    },
    "& fieldset": { border: "none" },
    "& svg": { right: -20 },
    "&::before": {
      content: '" "',
      width: 1,
      height: 36,
      display: "inline-block",
      background: "rgba(155,155,155,0.4)",
      position: "absolute",
    },
    "& .MuiSelect-selectMenu": {
      color: MUITheme.palette.text.lightGrey,
      fontSize: 20,
    },
    "& > span": {
      marginLeft: 24,
      color: MUITheme.palette.text.lightGrey,
      fontSize: 20,
    },
  },
}));
