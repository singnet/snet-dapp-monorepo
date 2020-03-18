export const useStyles = MUITheme => ({
  basicTextFieldGrid: {
    display: "flex",
    alignItems: "center",
    "& label": {
      color: MUITheme.palette.text.darkGrey,
      fontSize: 12,
      letterSpacing: 0.4,
      "&.MuiFormLabel-root.Mui-focused": { color: MUITheme.palette.text.darkGrey },
    },
    [MUITheme.breakpoints.down("xs")]: { width: "100%" },
  },
  textFieldWithExtraText: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  description: {
    paddingLeft: 40,
    "& p": {
      marginTop: 20,
      color: MUITheme.palette.text.lightGrey,
      fontSize: 14,
      letterSpacing: 0.25,
      lineHeight: "20px",
      [MUITheme.breakpoints.down("sm")]: { marginTop: 0 },
    },
    [MUITheme.breakpoints.down("sm")]: {
      paddingLeft: 0,
      marginTop: 0,
      marginBottom: 10,
    },
  },
  infoIconContainer: {
    "& svg": {
      padding: "5px 10px 0 0",
      fontSize: 20,
      color: "#d6d6d6",
    },
  },
  charLength: {
    marginBottom: 25,
    display: "block",
    paddingLeft: 14,
    color: MUITheme.palette.text.primary,
    fontSize: 12,
    letterSpacing: 0.39,
    [MUITheme.breakpoints.down("sm")]: { marginBottom: 10 },
  },
  extraInfo: {
    marginLeft: 17,
    color: MUITheme.palette.text.primary,
    fontFamily: MUITheme.typography.fontFamily,
    fontSize: 12.17,
    letterSpacing: 0.4,
    lineHeight: "16px",
  },
  errorField: {
    "& .MuiOutlinedInput-notchedOutline": { borderColor: MUITheme.palette.border.alertBox },
  },
});
