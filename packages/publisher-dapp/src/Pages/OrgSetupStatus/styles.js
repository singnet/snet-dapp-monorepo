export const useStyles = MUITheme => ({
  OrgSetupStatusContainer: {
    width: 845,
    margin: "0 auto",
    padding: "40px 0 0",
    [MUITheme.breakpoints.down("sm")]: { width: "auto" },
  },
  description: {
    "& p": {
      marginTop: 8,
      color: MUITheme.palette.text.darkGrey,
      fontSize: 22,
      fontWeight: 200,
      lineHeight: "28px",
    },
  },
  relatedLinksContainer: {
    "& a": {
      marginBottom: 10,
      display: "block",
      "&:last-of-type": { marginBottom: 0 },
    },
  },
  iconTitleContainer: {
    marginBottom: 15,
    display: "flex",
    "& svg": { color: MUITheme.palette.text.primary },
    "& p": {
      paddingLeft: 3,
      marginLeft: 8,
      color: MUITheme.palette.text.primary,
      fontSize: 16,
      fontWeight: 600,
    },
  },
});
