export const useStyles = MUITheme => ({
  headQuartersCompanyMailingContainer: { paddingTop: 48 },
  headquartersContainer: {
    "& h6": {
      marginBottom: 60,
      fontWeight: "normal",
    },
    "& .MuiTextField-root": {
      boxSizing: "border-box",
      paddingRight: 20,
    },
    "& label": {
      color: MUITheme.palette.text.darkGrey,
      fontSize: 12,
      letterSpacing: 0.4,
      "&.MuiFormLabel-root.Mui-focused": { color: MUITheme.palette.text.darkGrey },
    },
  },
  mailingAddressContainer: {
    "& h6": { fontWeight: "normal" },
    "& .MuiTextField-root": {
      boxSizing: "border-box",
      paddingLeft: 20,
      "& label": {
        paddingLeft: 20,
        color: MUITheme.palette.text.darkGrey,
        fontSize: 12,
        letterSpacing: 0.4,
        "&.MuiFormLabel-root.Mui-focused": { color: MUITheme.palette.text.darkGrey },
      },
    },
    [MUITheme.breakpoints.down("sm")]: { marginTop: 25 },
  },
  checkbox: {
    marginBottom: 18,
    "& .MuiCheckbox-root": { color: MUITheme.palette.text.darkGrey },
    "& .MuiCheckbox-colorPrimary.Mui-checked": { color: MUITheme.palette.primary.main },
    "& .MuiFormControlLabel-label": {
      color: MUITheme.palette.text.darkGrey,
      fontSize: 14,
      letterSpacing: 0.25,
    },
  },
});
