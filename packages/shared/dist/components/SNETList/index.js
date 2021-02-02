"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _List = _interopRequireDefault(require("@material-ui/core/List"));

var _styles = require("@material-ui/core/styles");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SNETList = (0, _styles.withStyles)({
  root: function root(props) {
    if (props.display === "inline") {
      return {
        display: "flex",
        flexDirection: "row",
        padding: 0
      };
    }
  }
})(_List.default);
SNETList.propTypes = {
  display: _propTypes.default.string
};
var _default = SNETList;
exports.default = _default;