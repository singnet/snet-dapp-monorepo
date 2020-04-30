export const useStyles = MUITheme => ({
  stakingRulesContainer: {
    borderRadius: 4,
    backgroundColor: MUITheme.palette.background.white,
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
  },
  header: {
    padding: "0 15px 0 22px",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: MUITheme.palette.border.primary,
    "& p": {
      color: MUITheme.palette.text.darkGrey,
      fontSize: 20,
      lineHeight: "50px",
    },
  },
  stakingData: {
    padding: "16px 26px 40px 22px",
    "& ul": {
      padding: 0,
      margin: 0,
      "& li": {
        paddingBottom: 25,
        listStyle: "none",
        "&:last-of-type": { paddingBottom: 0 },
        "& p": {
          color: MUITheme.palette.text.primary,
          fontSize: 16,
          lineHeight: "24px",
          "& span": {
            color: MUITheme.palette.text.darkGrey,
            fontWeight: "bold",
          },
        },
      },
    },
  },
});
