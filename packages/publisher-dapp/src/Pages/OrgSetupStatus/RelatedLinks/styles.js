export const useStyles = MUITheme => ({
  relatedLinksContainer: {
    marginTop: 40,
    display: "flex",
    flexDirection: "column",
    "& a": {
      fontSize: 14,
      marginBottom: 10,
      display: "block",
      "&:last-of-type": { marginBottom: 0 },
    },
  },
  iconTitleContainer: {
    marginBottom: 15,
    display: "flex",
    alignItems: "center",
    "& svg": {
      fontSize: 13.5,
      color: MUITheme.palette.text.primary,
    },
    "& p": {
      marginLeft: 8,
      color: MUITheme.palette.text.primary,
      fontSize: 16,
      fontWeight: 600,
    },
  },
});
