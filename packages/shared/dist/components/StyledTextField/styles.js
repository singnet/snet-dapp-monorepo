"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStyles = void 0;

var useStyles = function useStyles(MUITheme) {
  return {
    styledTextField: {
      background: MUITheme.palette.text.white,
      "& label": {
        color: MUITheme.palette.text.darkGrey
      },
      "& div": {
        color: "".concat(MUITheme.palette.text.darkGrey, " !important")
      },
      "& fieldset": {
        borderColor: MUITheme.palette.border.inputBorder
      },
      '& .MuiFormHelperText-contained': {
        color: 'rgba(0,0,0,.6)'
      },
      "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
        transform: "translate(14px, -6px) scale(0.90)"
      },
      "& input": {
        letterSpacing: 0.15,
        lineHeight: "24px",
        "&:disabled": {
          color: "#999"
        }
      },
      "& .MuiFormLabel-root.Mui-disabled": {
        color: "#999"
      },
      "& .Mui-disabled": {
        "& fieldset": {
          borderColor: "".concat(MUITheme.palette.border.secondary, " !important")
        }
      }
    }
  };
};

exports.useStyles = useStyles;