"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStyles = void 0;

var _styles = require("@material-ui/styles");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useStyles = (0, _styles.makeStyles)(function (MUITheme) {
  var _appBar;

  return {
    appBar: (_appBar = {
      padding: "14px 60px",
      flexDirection: "row",
      alignItems: "center",
      boxShadow: "0 2px 6px 0 rgba(0,0,0,0.2)",
      zIndex: 1110,
      backgroundColor: MUITheme.palette.background.white
    }, _defineProperty(_appBar, MUITheme.breakpoints.down("md"), {
      padding: "14px 10px"
    }), _defineProperty(_appBar, "@media(max-width:1028px)", {
      justifyContent: "space-between"
    }), _appBar),
    purple: {
      "& h5": {
        color: "".concat(MUITheme.palette.text.white, " !important")
      }
    },
    logoContainer: _defineProperty({
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      "& img": {
        width: 172
      },
      "& h5": {
        marginLeft: 11,
        fontWeight: 300,
        letterSpacing: -1,
        lineHeight: "30px",
        "@media(max-width:420px)": {
          display: "none"
        }
      }
    }, MUITheme.breakpoints.down("md"), {
      padding: 0
    }),
    navContainer: _defineProperty({
      flexGrow: 1,
      "@media(max-width:1028px)": {
        display: "none"
      }
    }, MUITheme.breakpoints.down("md"), {
      padding: 0
    }),
    headerActionsContainer: {
      "@media(max-width:720px)": {
        display: "none"
      }
    }
  };
});
exports.useStyles = useStyles;