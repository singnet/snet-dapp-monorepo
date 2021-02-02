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

var _SNETForgotPassword = _interopRequireDefault(require("../SNETForgotPassword"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var SNETForgotPasswordConfirm = function SNETForgotPasswordConfirm(_ref) {
  var email = _ref.email,
      title = _ref.title,
      description = _ref.description,
      forgotPasswordConfirmError = _ref.forgotPasswordConfirmError,
      onSubmit = _ref.onSubmit;
  var classes = (0, _styles.useStyles)();

  var _useState = (0, _react.useState)(email),
      _useState2 = _slicedToArray(_useState, 2),
      localEmail = _useState2[0],
      setLocalEmail = _useState2[1];

  var _useState3 = (0, _react.useState)(""),
      _useState4 = _slicedToArray(_useState3, 2),
      code = _useState4[0],
      setCode = _useState4[1];

  var _useState5 = (0, _react.useState)(""),
      _useState6 = _slicedToArray(_useState5, 2),
      password = _useState6[0],
      setPassword = _useState6[1];

  var _useState7 = (0, _react.useState)(""),
      _useState8 = _slicedToArray(_useState7, 2),
      confirmPassword = _useState8[0],
      setConfirmPassword = _useState8[1];

  var _useState9 = (0, _react.useState)(""),
      _useState10 = _slicedToArray(_useState9, 2),
      validationErr = _useState10[0],
      setValidationErr = _useState10[1];

  (0, _react.useEffect)(function () {
    if (email) {
      setLocalEmail(email.toLowerCase());
    }
  }, [email]);

  var handleSubmit = function handleSubmit(event) {
    event.preventDefault();
    setValidationErr("");
    var isNotValid = (0, _validator.default)({
      password: password,
      confirmPassword: confirmPassword,
      code: code,
      localEmail: localEmail
    }, _validationConstraints.forgotPassworSubmitConstraints);

    if (isNotValid) {
      setValidationErr(isNotValid[0]);
      return;
    } // Assuming the user state has the email, no need to explicitly pass it to this component


    onSubmit(localEmail, code, password);
  };

  return /*#__PURE__*/_react.default.createElement(_Grid.default, {
    container: true,
    spacing: 24
  }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true,
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    className: classes.forgotPwdContent
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "h3"
  }, title), /*#__PURE__*/_react.default.createElement(_Typography.default, null, description), /*#__PURE__*/_react.default.createElement("form", {
    className: classes.forgotPwdForm,
    noValidate: ""
  }, /*#__PURE__*/_react.default.createElement(_TextField.default, {
    id: "outlined-email-input",
    label: "Email",
    className: classes.textField,
    autoComplete: "off",
    type: "email",
    name: "email",
    margin: "normal",
    variant: "outlined",
    value: localEmail,
    required: true,
    onChange: function onChange(e) {
      return setLocalEmail(e.target.value.toLowerCase());
    }
  }), /*#__PURE__*/_react.default.createElement(_TextField.default, {
    id: "outlined-code-input",
    label: "Code",
    className: classes.textField,
    autoComplete: "off",
    type: "code",
    name: "code",
    margin: "normal",
    variant: "outlined",
    value: code,
    onChange: function onChange(e) {
      return setCode(e.target.value);
    }
  }), /*#__PURE__*/_react.default.createElement(_TextField.default, {
    id: "outlined-new-password-input",
    label: "New Password",
    className: classes.textField,
    autoComplete: "off",
    type: "password",
    name: "email",
    margin: "normal",
    variant: "outlined",
    value: password,
    onChange: function onChange(e) {
      return setPassword(e.target.value);
    }
  }), /*#__PURE__*/_react.default.createElement(_TextField.default, {
    id: "outlined-confirm-password-input",
    label: "Confirm Password",
    className: classes.textField,
    autoComplete: "off",
    type: "password",
    name: "email",
    margin: "normal",
    variant: "outlined",
    value: confirmPassword,
    onChange: function onChange(e) {
      return setConfirmPassword(e.target.value);
    }
  }), /*#__PURE__*/_react.default.createElement(_AlertBox.default, {
    type: "error",
    message: validationErr || forgotPasswordConfirmError
  }), /*#__PURE__*/_react.default.createElement(_SNETButton.default, {
    color: "primary",
    variant: "contained",
    children: "reset password",
    type: "submit",
    onClick: handleSubmit
  }))));
};

SNETForgotPasswordConfirm.propTypes = {
  title: _propTypes.default.string,
  description: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
  forgotPasswordConfirmError: _propTypes.default.string,
  onSubmit: _propTypes.default.func
};
_SNETForgotPassword.default.defaultProps = {
  title: "Reset your password",
  description: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "Thanks for confirming your email.", /*#__PURE__*/_react.default.createElement("span", null, "Input your new password"))
};
var _default = SNETForgotPasswordConfirm;
exports.default = _default;