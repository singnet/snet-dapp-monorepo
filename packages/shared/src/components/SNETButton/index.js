import MuiButton from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const SNETButton = withStyles(MUITheme => ({
  root: props => {
    const rootStyles = {
      fontWeight: 600,
      fontSize: 14,
      letterSpacing: 1.25,
      padding: "13px 28px 11px",
      lineHeight: "16px",
    };
    if (props.color === "purple" && props.variant === "contained-inverted") {
      rootStyles.color = MUITheme.palette.text.white;
      rootStyles.backgroundColor = MUITheme.palette.purple.main;
      rootStyles.border = "1px solid";
      rootStyles["&:hover"] = {
        backgroundColor: MUITheme.palette.purple.light,
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": { backgroundColor: MUITheme.palette.purple.main },
      };
    }
    if (props.color === "white") {
      rootStyles.backgroundColor = MUITheme.palette.background.white;
      rootStyles.boxShadow = "0 0 1px 0 rgba(0,0,0,0.12), 0 1px 1px 0 rgba(0,0,0,0.24)";
    }

    if (props.color === "white" && props.variant === "outlined") {
      rootStyles.color = MUITheme.palette.text.white;
      rootStyles.backgroundColor = "transparent";
      rootStyles.border = "2px solid #fff";
      rootStyles["&:hover"] = {
        backgroundColor: MUITheme.palette.text.white,
        color: "#211D24",
      };
    }

    if (props.color === "white" && props.variant === "contained") {
      rootStyles.border = "2px solid transparent";
      rootStyles.color = "#211D24";
      rootStyles.backgroundColor = MUITheme.palette.text.white;
      rootStyles["&:disabled"] = {
        backgroundColor: MUITheme.palette.text.disabled,
        color: MUITheme.palette.text.lightGrey,
      };
      rootStyles["&:hover"] = {
        border: "2px solid #fff",
        backgroundColor: "transparent",
        color: MUITheme.palette.text.white,
      };
    }
    if (props.color === "red") {
      rootStyles.color = MUITheme.palette.text.red;
    }
    return rootStyles;
  },
  containedSecondary: { color: MUITheme.palette.text.white },
}))(MuiButton);

SNETButton.propTypes = {
  color: PropTypes.oneOf(["white", "purple", "primary", "secondary"]),
};

export default SNETButton;
