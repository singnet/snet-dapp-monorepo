export const useStyles = MUITheme => ({
  tabsContainer: {
    padding: "0 60px",
    marginTop: 100,
    "& .PrivateTabIndicator-root": {
      background: "blue !important",
    },
    [MUITheme.breakpoints.down("md")]: { padding: "0 25px" },
  },
  tab: {
    color: MUITheme.palette.primary.main,
    fontSize: 20,
    fontWeight: 600,
    lineHeight: "25px",
    textTransform: "capitalize",
  },
});
