export const useStyles = MUITheme => ({
  card: {
    width: 322,
    marginLeft: "3%",
    "&:first-of-type": { marginLeft: 0 },
    [MUITheme.breakpoints.down("sm")]: {
      margin: "25px 0 0",
      "&:first-of-type": { marginTop: 0 },
    },
    "@media(max-width:340px)": { width: "100%" },
  },
  cardHeader: { padding: "0 13px 0 16px" },
  cardTitle: {
    padding: "8px 16px 0",
    color: MUITheme.palette.text.darkGrey,
    fontSize: 18,
    fontWeight: 600,
    letterSpacing: 0.23,
    lineHeight: "23px",
  },
  CardMedia: { height: 168 },
  cardContent: { padding: 0 },
  cardDescription: {
    padding: "15px 18px",
    color: MUITheme.palette.text.primary,
    fontSize: 14,
    letterSpacing: 0.25,
    lineHeight: "21px",
  },
  cardActions: {
    padding: "0 0 18px",
    "& a": {
      paddingLeft: 11,
      color: MUITheme.palette.primary.main,
      fontSize: 14,
      fontWeight: 600,
      lineHeight: "21px",
      letterSpacing: 1.25,
      textTransform: "uppercase",
    },
  },
});
