export const useStyles = MUITheme => ({
  basicDetailsContainer: { padding: "16px 21px 0 24px" },
  description: {
    paddingBottom: 14,
    "& + div": {
      padding: "0 30px",
      marginBottom: 16,
      "& + div": {
        padding: "0 30px",
        marginBottom: 16,
      },
    },
  },
  basicDetailsTextfield: { backgroundColor: "red" },
  orgWebsiteUrl: { padding: "0 30px" },
});
