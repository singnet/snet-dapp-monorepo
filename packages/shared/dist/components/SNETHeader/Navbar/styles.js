"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStyles = void 0;

var _styles = require("@material-ui/styles");

var useStyles = (0, _styles.makeStyles)(function (MUITheme) {
  return {
    navlist: {
      padding: 0,
      margin: 0,
      display: "flex",
      '& li': {
        width: 'auto',
        padding: 0,
        marginRight: 49,
        '&:last-of-type': {
          marginRight: 0
        }
      }
    },
    navLink: {
      textDecoration: "none",
      color: MUITheme.palette.text.lightGrey
    },
    navLinkActive: function navLinkActive(props) {
      return {
        borderBottom: "2px solid ".concat(MUITheme.palette.primary.main),
        paddingBottom: 3,
        color: MUITheme.palette.primary.main,
        fontWeight: 600,
        "&: visited": {
          borderBottom: "2px solid ".concat(MUITheme.palette.primary.main),
          paddingBottom: 3,
          color: MUITheme.palette.primary.main,
          fontWeight: 600
        }
      };
    }
  };
});
exports.useStyles = useStyles;