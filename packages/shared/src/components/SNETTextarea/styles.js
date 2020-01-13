export const useStyles = MUITheme => ({
  textareaIconContainer: { display: "flex" },
  infoIconContainer: {
    "& svg": {
      padding: "5px 10px 0 0",
      fontSize: 20,
      color: "#d6d6d6",
    },
  },
  textareaContainer: {
    position: "relative",
    "& textarea": {
      boxSizing: "border-box",
      width: "100%",
      padding: 10,
      borderRadius: 4,
      resize: "none",
    },
  },
  label: {
    position: "absolute",
    background: MUITheme.palette.background.white,
    top: -11,
    letterSpacing: 0.4,
    lineHeight: "16px",
    fontSize: 12,
    left: 10,
    padding: "0 10px 0 5px",
    color: MUITheme.palette.text.darkGrey,
  },
  charLength: {
    marginBottom: 25,
    display: "block",
    paddingLeft: 14,
    color: MUITheme.palette.text.primary,
    fontSize: 12,
    letterSpacing: 0.39,
  },
});
