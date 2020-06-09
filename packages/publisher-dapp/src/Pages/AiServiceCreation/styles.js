export const useStyles = MUITheme => ({
  serviceCreationContainer: {
    "& h3": { lineHeight: "48px" },
    "& > div": {
      "&:nth-child(2)": {
        width: 700,
        "& span": {
          "&:after": {
            "@media(max-width:720px)": { width: 80 },
            "@media(max-width:580px)": { width: 50 },
          },
        },
        "@media(max-width:720px)": { width: "90%" },
      },
    },
    "& ul": {
      "& li": {
        "& div": {
          "& span": {
            "&::after": { width: 125 },
          },
        },
      },
    },
  },
  topSection: {
    width: 600,
    padding: "60px 10px 0",
    margin: "0 auto",
    textAlign: "center",
    "& span": {
      marginTop: 16,
      display: "inline-block",
      color: MUITheme.palette.text.primary,
      fontFamily: MUITheme.typography.fontFamily,
      fontSize: 20,
      lineHeight: "28px",
    },
    "& + div": { paddingTop: 33 },
    [MUITheme.breakpoints.down(640)]: {
      boxSizing: "border-box",
      width: "auto",
      padding: "40px 20px",
    },
  },
  description: {
    paddingTop: 15,
    color: MUITheme.palette.text.primary,
    fontSize: 20,
    fontWeight: 300,
    lineHeight: "28px",
  },
  editHeaderContainer: {
    padding: "17px 60px",
    marginTop: 83,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#211D24",
    "& svg": {
      marginRight: 8,
      color: MUITheme.palette.text.disabled,
    },
    [MUITheme.breakpoints.down("sm")]: { padding: "17px 15px" },
    "@media(max-width:720px)": {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  editHeaderTitleContainer: { display: "flex" },
  editHeaderTitle: {
    color: "rgba(255,255,255,0.87)",
    fontSize: 24,
    lineHeight: "24px",
  },
  editHeaderBtns: {
    "& button": {
      "&:first-of-type": {
        color: MUITheme.palette.text.white,
        backgroundColor: "transparent",
        border: "2px solid #fff",
        "&:hover": {
          backgroundColor: MUITheme.palette.text.white,
          color: "#211D24",
        },
      },
      "&:last-of-type": {
        marginLeft: 40,
        border: "2px solid transparent",
        color: "#211D24",
        backgroundColor: MUITheme.palette.text.white,
        "&:disabled": {
          backgroundColor: MUITheme.palette.text.disabled,
          color: MUITheme.palette.text.lightGrey,
        },
        "&:hover": {
          border: "2px solid #fff",
          backgroundColor: "transparent",
          color: MUITheme.palette.text.white,
        },
      },
    },
    [MUITheme.breakpoints.down(720)]: { marginTop: 25 },
  },
});
