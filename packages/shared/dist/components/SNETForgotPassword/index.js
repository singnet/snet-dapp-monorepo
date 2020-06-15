"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("./styles");

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _AlertBox = _interopRequireDefault(require("../AlertBox"));

var _SNETButton = _interopRequireDefault(require("../SNETButton"));

var _validator = _interopRequireDefault(require("../../utils/validator"));

var _validationConstraints = require("./validationConstraints");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var SNETForgotPassword = function SNETForgotPassword(_ref) {
  var title = _ref.title,
      email = _ref.email,
      forgotPasswordError = _ref.forgotPasswordError,
      onSubmit = _ref.onSubmit;
  var classes = (0, _styles.useStyles)();

  var _useState = (0, _react.useState)(email),
      _useState2 = _slicedToArray(_useState, 2),
      localEmail = _useState2[0],
      setEmail = _useState2[1];

  var _useState3 = (0, _react.useState)(""),
      _useState4 = _slicedToArray(_useState3, 2),
      validationErr = _useState4[0],
      setValidationErr = _useState4[1];

  (0, _react.useEffect)(function () {
    setEmail(email);
  }, [email]);

  var handleSubmit = function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    setValidationErr("");
    var isNotValid = (0, _validator.default)({
      email: localEmail
    }, _validationConstraints.forgotPasswordConstraints);

    if (isNotValid) {
      setValidationErr(isNotValid[0]);
      return;
    }

    onSubmit(localEmail);
  };

  return /*#__PURE__*/_react.default.createElement(_Grid.default, {
    container: true,
    className: classes.forgotPwdMainContainer
  }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true,
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    className: classes.forgotPwdContent
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "h3"
  }, title), /*#__PURE__*/_react.default.createElement("p", null, "We'll email you instructions on how to reset it."), /*#__PURE__*/_react.default.createElement("form", {
    noValidate: true,
    autoComplete: "off",
    className: classes.forgotPwdForm
  }, /*#__PURE__*/_react.default.createElement(_TextField.default, {
    id: "outlined-username-input",
    label: "Email",
    className: classes.textField,
    type: "text",
    name: "email",
    margin: "normal",
    variant: "outlined",
    value: localEmail,
    onChange: function onChange(e) {
      return setEmail(e.target.value);
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: classes.alertBoxContainer
  }, /*#__PURE__*/_react.default.createElement(_AlertBox.default, {
    type: "error",
    message: validationErr || forgotPasswordError
  })), /*#__PURE__*/_react.default.createElement(_SNETButton.default, {
    color: "primary",
    variant: "contained",
    children: "reset password",
    type: "submit",
    onClick: handleSubmit
  }))));
};

SNETForgotPassword.propTypes = {
  title: _propTypes.default.string,
  email: _propTypes.default.string,
  forgotPasswordError: _propTypes.default.string,
  onSubmit: _propTypes.default.func
};
var _default = SNETForgotPassword;
exports.default = _default;