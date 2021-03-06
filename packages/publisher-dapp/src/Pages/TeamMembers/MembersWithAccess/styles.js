export const useStyles = MUITheme => ({
  membersWithAccessContainer: {
    paddingBottom: 30,
    borderRadius: 4,
    marginTop: 18,
    background: MUITheme.palette.background.white,
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
    "& h6": {
      width: "100%",
      padding: "12px 22px",
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      borderBottomColor: MUITheme.palette.border.primary,
    },
    [MUITheme.breakpoints.down("xs")]: {
      width: "auto",
      margin: "0 25px",
    },
  },
  tableHead: {
    padding: "0 11px 10px",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: MUITheme.palette.border.secondary,
    margin: "29px 10px 0",
    display: "flex",
    "& span": {
      color: MUITheme.palette.text.lightGrey,
      fontFamily: MUITheme.typography.fontFamily,
      fontSize: 13,
      textTransform: "uppercase",
    },
    [MUITheme.breakpoints.down("xs")]: { display: "none" },
  },
  tableBody: {
    padding: "29px 0",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: MUITheme.palette.border.secondary,
    display: "flex",
    cursor: "pointer",
    "&:last-of-type": { borderBottom: "none" },
    "& > div": {
      boxSizing: "content-box",
      padding: "0 22px",
      [MUITheme.breakpoints.down("xs")]: {
        marginBottom: 20,
        display: "flex",
        flexDirection: "column",
      },
    },
    "&:hover": {
      background: MUITheme.palette.background.mainContent,
      "& svg": { visibility: "visible" },
    },
    [MUITheme.breakpoints.down("xs")]: {
      position: "relative",
      flexDirection: "column",
    },
  },
  iconContainer: {
    paddingRight: 20,
    textAlign: "right",
    "& svg": {
      visibility: "hidden",
      color: MUITheme.palette.text.lightGrey,
      cursor: "pointer",
      [MUITheme.breakpoints.down("sm")]: {
        position: "absolute",
        top: "50%",
        right: 0,
        transform: "translateY(-50%)",
      },
    },
  },
  infoIconContainer: {
    [MUITheme.breakpoints.down("xs")]: { display: "flex" },
  },
  infoIcon: {
    marginRight: 8,
    color: MUITheme.palette.background.grey,
    verticalAlign: "middle",
  },
  tableHeaderCell: {
    color: MUITheme.palette.text.darkGrey,
    fontFamily: MUITheme.typography.fontFamily,
    fontSize: 14,
    letterSpacing: 0.17,
  },
  mobileTableHeader: {
    width: "25%",
    marginRight: 5,
    display: "none",
    color: MUITheme.palette.text.lightGrey,
    fontFamily: MUITheme.typography.fontFamily,
    fontSize: 13,
    textTransform: "uppercase",
    [MUITheme.breakpoints.down("xs")]: { display: "block" },
  },
  paginationContainer: { padding: "0 22px" },
  tableBodyCell: {
    color: MUITheme.palette.text.darkGrey,
    fontFamily: MUITheme.typography.fontFamily,
    fontSize: 14,
  },
  message: {
    width: "100%",
    marginTop: 30,
    display: "block",
    color: "#999",
    fontFamily: MUITheme.typography.fontFamily,
    fontSize: 16,
    fontWeight: 200,
    textAlign: "center",
  },
});
