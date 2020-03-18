export const useStyles = MUITheme => ({
  orgImgContainer: { padding: "0 54px" },
  title: {
    margin: "16px 0 12px",
    color: MUITheme.palette.text.darkGrey,
    fontSize: 18,
    lineHeight: "23px",
  },
  profileImgContainer: {
    display: "flex",
    [MUITheme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  },
  previewText: {
    margin: "65px 0 22px",
    color: MUITheme.palette.text.lightGrey,
    fontSize: 14,
    letterSpacing: 0.25,
    lineHeight: "20px",
  },
  previewLargeImg: {
    "& p": {
      marginBottom: 13,
      color: MUITheme.palette.text.darkGrey,
      fontSize: 16,
    },
  },
  previewImg: {
    width: 250,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  largePreviewImg: {
    width: 72,
    height: 72,
  },
  orgProfileImg: {
    width: 334,
    textAlign: "center",
    "& > div": {
      minWidth: "100% !important",
      width: "100% !important",
      "& > div": {
        "& > div:first-of-type": { display: "none" },
      },
    },
    "& > button": { marginTop: 10 },
    [MUITheme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      width: "100%",
      marginBottom: 20,
    },
  },
  previewContainer: {
    paddingLeft: 40,
    [MUITheme.breakpoints.down("sm")]: { maxWidth: "100%" },
  },
});
