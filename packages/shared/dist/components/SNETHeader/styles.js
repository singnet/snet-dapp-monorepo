"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStyles = void 0;

var _styles = require("@material-ui/styles");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useStyles = (0, _styles.makeStyles)(function (MUITheme) {
  return {
    logoContainer: _defineProperty({
      display: 'flex',
      alignItems: 'center',
      flexGrow: 1,
      "& img": {
        width: 172
      }
    }, MUITheme.breakpoints.down('md'), {
      padding: 0
    }),
    portalName: {
      marginLeft: 8,
      color: MUITheme.palette.text.darkGrey,
      fontSize: 22,
      fontWeight: 300,
      lineHeight: '30px'
    },
    navContainer: _defineProperty({
      flexGrow: 1
    }, MUITheme.breakpoints.down('md'), {
      padding: 0
    }),
    actionsContainer: _defineProperty({
      flexGrow: 1,
      "& *": {
        marginLeft: 5
      },
      textAlign: "end"
    }, MUITheme.breakpoints.down('md'), {
      padding: 0
    })
  };
});
exports.useStyles = useStyles;