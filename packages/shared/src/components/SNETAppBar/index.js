import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";

const SNETAppBar = withStyles(MuiTheme => ({
  root: props => {
    const rootStyles = {};
    if (props.color === "white") {
      rootStyles.backgroundColor = MuiTheme.palette.background.white;
      return rootStyles;
    }
    if (props.color === "secondary") {
      rootStyles.backgroundColor = MuiTheme.palette.purple.main;
      return rootStyles;
    }
    return rootStyles;
  },
}))(AppBar);

SNETAppBar.propTypes = {
  color: PropTypes.oneOf(["white", "secondary"]),
};

export default SNETAppBar;
