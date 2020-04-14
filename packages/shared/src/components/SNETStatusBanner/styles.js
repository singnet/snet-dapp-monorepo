export const useStyles = MUITheme => ({
  statusBannerContainer: {
    padding: "45px 35px",
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
    paddingLeft: 70,
    "& p": {
      paddingRight: 50,
      margin: "24px 0 32px",
      color: MUITheme.palette.text.primary,
      fontSize: 14,
      lineHeight: "21px",
      "@media(max-width:600px)": { paddingRight: 0 },
    },
    "& button": {
      marginBottom: 10,
      "&:first-of-type": {
        padding: "13px 18px 11px",
        marginRight: 22,
      },
      "&:last-of-type": { padding: "13px 23px 11px" },
    },
    "& a": {
      fontFamily: MUITheme.typography.fontFamily,
      fontSize: 14,
      fontWeight: 600,
      lineHeight: "16px",
      letterSpacing: 1.25,
      textTransform: "uppercase",
    },
  },
  PENDING: { color: MUITheme.palette.warning.main },
  REJECTED: { color: MUITheme.palette.text.red },
});
