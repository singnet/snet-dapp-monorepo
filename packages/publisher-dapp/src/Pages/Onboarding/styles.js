export const useStyles = MUITheme => ({
  onboardingContainer: {
    paddingTop: 40,
    backgroundColor: MUITheme.palette.background.mainContent,
    "& ul": {
      justifyContent: "center",
      "& li": {
        "&:before": { marginLeft: 16 },
      },
    },
  },
  topSection: {
    textAlign: "center",
    "& h3": { marginBottom: 15 },
    "& span": {
      color: MUITheme.palette.text.primary,
      fontSize: 20,
      fontWeight: 300,
      lineHeight: "28px",
    },
  },
});
