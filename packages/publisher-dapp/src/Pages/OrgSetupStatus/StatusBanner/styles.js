export const useStyles = MUITheme => ({
  statusBannerContainer: {
    padding: "38px 14px",
    marginTop: 40,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F1F1F1",
    borderRadius: 4,
    display: "flex",
    backgroundColor: MUITheme.palette.text.secondary,
  },
  statusBannerMedia: {
    "& img": {
      width: "100%",
      [MUITheme.breakpoints.down("xs")]: { width: 302 },
    },
    [MUITheme.breakpoints.down("xs")]: {
      marginBottom: 25,
      textAlign: "center",
    },
  },
  statusBannerContent: {
    paddingLeft: 24,
    "& p": {
      margin: "24px 0 0",
      color: MUITheme.palette.text.primary,
      fontSize: 14,
      lineHeight: "21px",
    },
    "& button": {
      marginTop: 24,
      "&:first-of-type": { marginRight: 40 },
    },
  },
  pendingtitle: {
    color: MUITheme.palette.warning,
  },
});
