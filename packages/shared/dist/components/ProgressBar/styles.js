"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStyles = void 0;

var useStyles = function useStyles(MUITheme) {
  return {
    tabsContainer: {
      width: 600,
      paddingTop: 41,
      margin: "0 auto",
      "& ul": {
        margin: 0,
        padding: 0,
        display: "flex",
        justifyContent: "space-between",
        "@media (max-width:470px)": {
          flexDirection: "column",
          alignItems: "center"
        }
      },
      "& li": {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        listStyle: "none",
        textAlign: "center",
        "& i": {
          marginRight: 5,
          color: MUITheme.palette.success,
          fontSize: 20
        },
        "&:last-of-type": {
          "& > div": {
            "& span": {
              "&::after": {
                display: "none"
              }
            }
          }
        },
        "@media (max-width:470px)": {
          marginBottom: 20
        }
      },
      "@media (max-width:660px)": {
        width: "90%"
      }
    }
  };
};

exports.useStyles = useStyles;