export const useStyles = MUITheme => ({
  workingContentContainer: {
    display: "flex",
    alignItems: "center",
    "& > div": {
      "&:first-of-type": {
        display: "flex",
        position: "relative",
        "&::after": {
          content: "' '",
          display: "block",
          width: 5,
          height: 335,
          position: "absolute",
          top: "13%",
          right: -7,
          background: MUITheme.palette.text.disabled,
          transform: "rotate(-75deg)",
          "@media(max-width:745px)": { display: "none " },
        },
      },
    },
    "&:last-of-type": {
      "& > div": {
        "&:first-of-type": {
          "&::after": { display: "none" },
        },
      },
    },
    "@media(max-width:540px)": {
      marginBottom: 25,
      flexDirection: "column",
    },
  },
  reverseDirection: {
    flexDirection: "row-reverse",
    "& > div": {
      "&:first-of-type": {
        justifyContent: "flex-end",
        "&::after": { display: "none" },
        "&::before": {
          content: "' '",
          display: "block",
          width: 5,
          height: 335,
          position: "absolute",
          top: "13%",
          left: -7,
          background: MUITheme.palette.text.disabled,
          transform: "rotate(75deg)",
          "@media(max-width:745px)": { display: "none " },
        },
      },
    },
    "@media(max-width:540px)": { flexDirection: "column" },
  },
  textContent: {
    width: "100%",
    textAlign: "left",
    "@media(max-width:540px)": { marginTop: 20 },
    "& a": {
      paddingTop: 5,
      display: "inline-block",
      color: MUITheme.palette.primary.main,
      fontSize: 14,
      fontWeight: 600,
      lineHeight: "21px",
      letterSpacing: 1.25,
      textTransform: "uppercase",
    },
  },
  workingTitle: {
    color: MUITheme.palette.text.primary,
    fontSize: 24,
    fontWeight: 600,
    letterSpacing: 0.3,
    lineHeight: "30px",
  },
  workingDesc: {
    padding: "8px 0 3px",
    color: MUITheme.palette.text.primary,
    fontSize: 16,
    letterSpacing: 0.29,
    lineHeight: "20px",
  },
});
