export const useStyles = MUITheme => ({
  inviteContainer: {
    padding: "31px 0 0",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: MUITheme.palette.border.grey,
    margin: "24px 24px 0",
    "& h6": {
      padding: "0 0 16px !important",
      border: "none !important",
      fontWeight: "normal",
      lineHeight: "23px",
    },
  },
  table: {
    "& > div": { display: "flex" },
  },
  tableColumn: {
    [MUITheme.breakpoints.down("xs")]: { display: "none !important" },
  },
  th: {
    color: MUITheme.palette.text.lightGrey,
    fontSize: 13,
    textTransform: "uppercase",
  },
  tableData: {
    padding: "8px 0",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: MUITheme.palette.border.grey,
    "&:last-of-type": { border: "none" },
    "& div": {
      [MUITheme.breakpoints.down("xs")]: {
        display: "flex",
        alignItems: "center",
      },
    },
    [MUITheme.breakpoints.down("xs")]: { flexDirection: "column" },
  },
  td: {
    color: MUITheme.palette.text.primary,
    fontSize: 14,
    lineHeight: "21px",
  },
  mobileTH: {
    display: "none",
    paddingRight: 10,
    color: MUITheme.palette.text.lightGrey,
    fontSize: 13,
    textTransform: "uppercase",
    [MUITheme.breakpoints.down("xs")]: { display: "flex" },
  },
});
