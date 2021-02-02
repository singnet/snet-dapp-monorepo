export const useStyles = MUITheme => ({
  expansionPanel: {
    margin: "0 !important",
    boxShadow: "none",
    "&::before": {
      display: "none",
    },
    "&::after": {
      content: "' '",
      width: "100%",
      height: 1,
      display: "block",
      backgroundColor: MUITheme.palette.border.secondary,
    },
    "& .MuiExpansionPanelSummary-root": {
      padding: "12px 24px",
      "& .MuiExpansionPanelSummary-content": { margin: 0 },
    },
    "& .MuiExpansionPanelDetails-root": {
      padding: "0 40px 22px",
    },
    "& .Mui-expanded": {
      "& p": { color: MUITheme.palette.text.darkGrey },
      "& .MuiIconButton-root": {
        "&::before": { width: 0 },
      },
    },
    "& .MuiExpansionPanelSummary-root.Mui-expanded": {
      minHeight: "auto",
      padding: "12px 24px 8px",
    },
    // '& .MuiIconButton-root':{
    // 	'& svg':{ display: 'none' },
    // 	position: 'relative',
    //   	'&::before, &::after':{
    //       content: "' '",
    //       position: 'absolute',
    //       backgroundColor: MUITheme.palette.text.primary,
    //       transition: 'transform 0.25s ease-out'
    //   	},
    //   	 Vertical line
    //   	'&::before':{
    //       top: 0,
    //       left: '50%',
    //       width: 4,
    //       height: '100%',
    //       marginLeft: -2
    //   	},
    //   	/* horizontal line */
    //   	'&::after':{
    //       top: '50%',
    //       left: 0,
    //       width: '100%',
    //       height: 4,
    //       marginTop: -2,
    //   	}
    // }
  },
  question: {
    color: MUITheme.palette.text.primary,
    fontSize: 20,
    lineHeight: "25px",
  },
  answer: {
    color: MUITheme.palette.text.primary,
    fontSize: 16,
    lineHeight: "24px",
    "& h3": { color: MUITheme.palette.text.primary },
    "& img": {
      width: 600,
      margin: "0 auto",
      display: "block",
    },
  },
});
