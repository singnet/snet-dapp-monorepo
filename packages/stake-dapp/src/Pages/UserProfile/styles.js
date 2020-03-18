import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  UserProfileContainer: {
    padding: "0 85px",
    backgroundColor: theme.palette.text.offWhiteColor,
    "@media(max-width:1280px)": { padding: "0 15px" },
  },
  tabsHeader: {
    marginBottom: 13,
    backgroundColor: "transparent",
    color: theme.palette.text.lightGrey,
    boxShadow: "none",
    "& button": {
      minWidth: "auto",
      padding: 0,
      marginRight: 40,
      fontSize: 20,
      textTransform: "none",
      color: theme.palette.text.lightShadedGray,
      fontFamily: theme.typography.fontFamily,
    },
    "& .Mui-selected": {
      color: theme.palette.text.primary,
      fontWeight: 600,
    },
    "& .MuiTabs-indicator": { backgroundColor: theme.palette.text.primary },
    "& + div": {
      maxWidth: 411,
      paddingBottom: 27,
      borderRadius: 4,
      marginBottom: 30,
      backgroundColor: theme.palette.text.white,
      boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
      flexBasis: "30%",
      "& h3": {
        padding: "0 22px",
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        borderBottomColor: theme.palette.text.gray1,
        margin: 0,
        color: theme.palette.text.darkShadedGray,
        fontSize: 20,
        fontWeight: 600,
        lineHeight: "50px",
      },
      "@media(max-width:960px)": {
        maxWidth: "100%",
        marginTop: 25,
        marginLeft: 0,
        flexBasis: "100%",
      },
    },
  },
}));
