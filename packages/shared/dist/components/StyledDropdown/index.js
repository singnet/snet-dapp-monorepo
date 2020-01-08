"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _FormControl = _interopRequireDefault(require("@material-ui/core/FormControl"));

var _Select = _interopRequireDefault(require("@material-ui/core/Select"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

var _InputLabel = _interopRequireDefault(require("@material-ui/core/InputLabel"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("./styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var StyledDropdown = function StyledDropdown(_ref) {
  var labelTxt = _ref.labelTxt,
      list = _ref.list,
      value = _ref.value,
      onChange = _ref.onChange,
      formControlProps = _ref.formControlProps,
      inputLabel = _ref.inputLabel,
      disabled = _ref.disabled;
  var classes = (0, _styles.useStyles)();
  return _react.default.createElement(_FormControl.default, _extends({
    variant: "outlined",
    className: classes.formControl
  }, formControlProps), inputLabel ? _react.default.createElement(_InputLabel.default, {
    htmlFor: "age-simple"
  }, inputLabel) : null, _react.default.createElement(_Select.default, {
    value: value,
    onChange: onChange,
    name: labelTxt,
    className: classes.selectEmpty,
    variant: "outlined",
    disabled: disabled
  }, _react.default.createElement(_MenuItem.default, {
    value: "default",
    className: classes.defaultMenuItem
  }, labelTxt || "Select a value"), list && list.map(function (item) {
    return _react.default.createElement(_MenuItem.default, {
      key: item.value,
      value: item.value,
      className: classes.menuItem
    }, item.label);
  })));
};

StyledDropdown.propTypes = {
  inputLabel: _propTypes.default.string,
  labelTxt: _propTypes.default.string,
  list: _propTypes.default.arrayOf(_propTypes.default.shape({
    value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
    label: _propTypes.default.string
  })),
  onChange: _propTypes.default.func
};
StyledDropdown.defaultProps = {
  labelTxt: "",
  value: "default"
};
var _default = StyledDropdown;
exports.default = _default;