export const useStyles = MUITheme => ({
  singularityAccContainer: { 
    width: 845,
    margin: '48px auto 0' 
  },
  box: {
    paddingBottom: 33,
    borderRadius: 4,
    marginBottom: 27,
    backgroundColor: MUITheme.palette.background.white,
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.2)",
    "& > h6": {
      padding: "0 23px",
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      borderBottomColor: MUITheme.palette.border.primary,
      lineHeight: '50px !important',
    },
    '&.MuiMenuItem-root':{ color: 'red !important'}
  },
  singularityAccDescription: {
    padding: "0 23px",
    margin: "7px 0 34px",
    color: MUITheme.palette.text.primary,
    fontSize: 16,
    lineHeight: "21px",
  },
  signInBtns: {
    marginTop: 15,
    [MUITheme.breakpoints.down("xs")]: { textAlign: "center" },
    "& a": { 
      textDecoration: "none",
      '&:last-of-type':{
        '& button':{ padding: '12px 18px 11px'}
        }
      },      
    },
  signInContent: {
    padding: "30px 24px 0",
    display: "flex",
    justifyContent: 'center',
    [MUITheme.breakpoints.down("xs")]: { flexDirection: "column" },
  },
  signInMedia: { 
    marginRight: 10, 
    display: 'flex',
    wordBreak: 'break-word'
  },
  avatar:{ 
    width: 70, 
    height: 70 
  },
  userDetails:{ 
    paddingLeft: 11,
    '& h6':{ whiteSpace: 'normal' }
  },
  signInRightContent: {
    "& p": {
      marginLeft: 30,
      fontSize: 14,
      lineHeight: "21px",
    },
    [MUITheme.breakpoints.down("xs")]: { marginTop: 25 },
  },
  signInSubtitle: {
    marginBottom: 25,
    color: MUITheme.palette.text.darkGrey,
    fontWeight: 600,
  },
  checkboxContainer: {
    padding: "23px 58px 0",
    "& label": {
      marginRight: 0,
      "& span": {
        fontSize: 14,
        letterSpacing: 0.25,
        lineHeight: "20px",
        "&:last-of-type": { color: MUITheme.palette.text.primary },
        "&.MuiCheckbox-colorPrimary": { color: MUITheme.palette.text.primary },
        "&.MuiCheckbox-colorPrimary.Mui-checked": { color: MUITheme.palette.primary.main },
      },
    },
  },
  btnContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
});
