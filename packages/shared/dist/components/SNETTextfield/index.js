"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _styles = require("@material-ui/core/styles");

var _Info = _interopRequireDefault(require("@material-ui/icons/Info"));

var _styles2 = require("./styles");

var _StyledTextField = _interopRequireDefault(require("shared/dist/components/StyledTextField"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var SNETTextfield = function SNETTextfield(_ref) {
  var classes = _ref.classes,
      name = _ref.name,
      label = _ref.label,
      helperText = _ref.helperText,
      value = _ref.value,
      onChange = _ref.onChange,
      maxCount = _ref.maxCount,
      minCount = _ref.minCount,
      disabled = _ref.disabled,
      description = _ref.description,
      icon = _ref.icon,
      onKeyUp = _ref.onKeyUp,
      extraInfo = _ref.extraInfo,
      inputRef = _ref.inputRef,
      InputProps = _ref.InputProps,
      error = _ref.error,
      rest = _objectWithoutProperties(_ref, ["classes", "name", "label", "helperText", "value", "onChange", "maxCount", "minCount", "disabled", "description", "icon", "onKeyUp", "extraInfo", "inputRef", "InputProps", "error"]);

  return /*#__PURE__*/_react.default.createElement(_Grid.default, {
    container: true,
    className: error ? classes.errorField : ""
  }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true,
    sx: 12,
    sm: 12,
    md: 6,
    lg: 6,
    className: classes.basicTextFieldGrid
  }, icon ? /*#__PURE__*/_react.default.createElement("div", {
    className: classes.infoIconContainer
  }, /*#__PURE__*/_react.default.createElement(_Info.default, null)) : null, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.textFieldWithExtraText
  }, /*#__PURE__*/_react.default.createElement(_StyledTextField.default, _extends({
    name: name,
    label: label,
    helperText: helperText,
    variant: "outlined",
    value: value,
    onChange: onChange,
    fullWidth: true,
    onKeyUp: onKeyUp,
    disabled: disabled,
    inputRef: inputRef,
    InputProps: InputProps
  }, rest)), maxCount ? /*#__PURE__*/_react.default.createElement("span", {
    className: classes.charLength
  }, minCount, "/", maxCount, " char") : null, extraInfo ? /*#__PURE__*/_react.default.createElement("span", {
    className: classes.extraInfo
  }, extraInfo) : null)), description ? /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true,
    sx: 12,
    sm: 12,
    md: 6,
    lg: 6,
    className: classes.description
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, null, description)) : null);
};

SNETTextfield.propTypes = {
  name: _propTypes.default.string,
  label: _propTypes.default.string,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  helperText: _propTypes.default.string,
  description: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
  onChange: _propTypes.default.func
};

var _default = (0, _styles.withStyles)(_styles2.useStyles)(SNETTextfield);

exports.default = _default;