export const useStyles = MUITheme => ({
  enrollMainContainer: {
    padding: "0 18% 64px",
    "& > div": {
      padding: "32px 0",
      borderTopWidth: 1,
      borderTopColor: MUITheme.palette.text.disabled,
      borderTopStyle: "solid",
      "&:first-of-type": {
        padding: "40px 0 48px",
        borderTop: "none",
      },
      "&:last-of-type": {
        padding: "16px 0 0",
        borderTop: "none",
      },
      "& > p": {
        "&:first-of-type": { marginBottom: 15 },
      },
      "& a": {
        color: MUITheme.palette.primary.main,
        textDecoration: "none",
        fontWeight: 600,
      },
    },
    "& h4": { marginBottom: 12 },
    "& .MuiTypography-body2": { color: MUITheme.palette.text.primary },
    [MUITheme.breakpoints.down("md")]: { padding: "0 10% 64px" },
    [MUITheme.breakpoints.down("sm")]: { padding: "0 35px 64px" },
  },
  topSectionContainer: {
    textAlign: "center",
    "& h3": { lineHeight: "48px" },
    "& span": {
      paddingTop: 8,
      display: "inline-block",
      color: MUITheme.palette.text.primary,
      fontFamily: MUITheme.typography.fontFamily,
      fontSize: 20,
      fontWeight: 300,
      lineHeight: "28px",
    },
  },
  btnContainer: {
    paddingBottom: "0 !important",
    textAlign: "center",
  },
  companyOrgReg: {
    "& > div": {
      marginBottom: 20,
      "&:last-of-type": { marginBottom: 0 },
    },
  },
  metamask: {
    "& ul": {
      padding: 0,
      marginBottom: 0,
      "& h6": {
        paddingBottom: 20,
        display: "inline-block",
      },
      "& li": {
        paddingLeft: 85,
        listStyle: "none",
      },
    },
  },
  joiningTeamMember: {
    "& a": { padding: "auto 2px" },
  },
  website: {
    "& p": { marginBottom: "0 !important" },
  },
});
