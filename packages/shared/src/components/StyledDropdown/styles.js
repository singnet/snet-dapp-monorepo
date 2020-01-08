import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(MUITheme => ({
  formControl:{
    width: 364,
    paddingLeft: 23,
    '& label':{ 
      padding: '0 20px 0 10px',
      left: 20,
      background: '#fff',
      color: MUITheme.palette.text.darkGrey,
      fontSize: 12,
      letterSpacing: 0.4
    },
  },
  selectEmpty: {
    color: `${MUITheme.palette.text.darkGrey} !important`,
    "& .MuiSelect-root": {
      padding: '15.5px 15px !important',
      letterSpacing: 0.15,
      lineHeight: "24px",
    },
    "&:before": { display: "none" },
    "& select": {
      "&:hover": {
        backgroundColor: 'rgba(0,90,203,0.05)',
      },
    },
    "& .MuiSelect-select": {
      "&:focus": { backgroundColor: "transparent" },
    },
  },
  defaultMenuItem:{ 
    color: MUITheme.palette.text.lightGrey,
    fontSize: 16,
    letterSpacing: 0.5,
    lineHeight: '28px'
  },
  menuItem: { 
    color: MUITheme.palette.text.darkGrey,
    fontSize: 16,
    letterSpacing: 0.5,
    lineHeight: '28px',
    '&:hover':{
      background: MUITheme.palette.background.mainContent,
      color: MUITheme.palette.primary.main
    }
  }
}));
