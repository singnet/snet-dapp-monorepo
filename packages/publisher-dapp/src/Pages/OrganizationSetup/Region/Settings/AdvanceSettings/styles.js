export const useStyles = MUITheme => ({
  heading: {
    paddingLeft: 32,
    margin: "32px 0",
    color: MUITheme.palette.text.darkGrey,
    fontSize: 16,
    lineHeight: "20px",
    "&::after": {
      content: "' '",
      width: 580,
      height: 1,
      marginLeft: 10,
      display: "inline-block",
      background: "#979797",
      verticalAlign: "middle",
    },
  },
});
