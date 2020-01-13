"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _AlertText = _interopRequireDefault(require("../../AlertText"));

var _AlertBox = _interopRequireWildcard(require("../../AlertBox"));

var _SNETButton = _interopRequireDefault(require("../../SNETButton"));

var _PasswordInlineValidation = _interopRequireDefault(require("./PasswordInlineValidation"));

var _styles = require("./styles");

var _validator = _interopRequireDefault(require("../../../utils/validator"));

var _validationConstraints = require("./validationConstraints");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Form = function Form(props) {
  var onSubmit = props.onSubmit,
      signupError = props.signupError;
  var classes = (0, _styles.useStyles)();

  var _useState = (0, _react.useState)(""),
      _useState2 = _slicedToArray(_useState, 2),
      nickname = _useState2[0],
      setNickname = _useState2[1];

  var _useState3 = (0, _react.useState)(""),
      _useState4 = _slicedToArray(_useState3, 2),
      email = _useState4[0],
      setEmail = _useState4[1];

  var _useState5 = (0, _react.useState)(""),
      _useState6 = _slicedToArray(_useState5, 2),
      password = _useState6[0],
      setPassword = _useState6[1];

  var _useState7 = (0, _react.useState)(""),
      _useState8 = _slicedToArray(_useState7, 2),
      validationErr = _useState8[0],
      setValidationErr = _useState8[1];

  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    var isNotValid = (0, _validator.default)({
      nickname: nickname,
      email: email,
      password: password
    }, _validationConstraints.signupFormConstraints);

    if (isNotValid) {
      return setValidationErr(isNotValid[0]);
    }

    onSubmit(nickname, email, password);
  };

  var emailValidationMsg = function emailValidationMsg() {
    var isNotValid = (0, _validator.default)({
      email: email
    }, {
      email: _validationConstraints.signupFormConstraints.email
    });

    if (isNotValid && !(0, _isEmpty.default)(email)) {
      return isNotValid[0];
    }

    return null;
  };

  return _react.default.createElement("form", {
    noValidate: true,
    autoComplete: "off",
    className: classes.signupForm
  }, _react.default.createElement(_TextField.default, {
    id: "outlined-user-name",
    label: "Nickname",
    className: classes.textField,
    value: nickname,
    onChange: function onChange(e) {
      return setNickname(e.target.value);
    },
    margin: "normal",
    variant: "outlined",
    autoFocus: true
  }), _react.default.createElement("div", null, _react.default.createElement(_TextField.default, {
    id: "outlined-email-input",
    label: "Email",
    className: classes.textField,
    type: "email",
    name: "email",
    autoComplete: "email",
    margin: "normal",
    variant: "outlined",
    value: email,
    onChange: function onChange(e) {
      return setEmail(e.target.value);
    }
  }), _react.default.createElement(_AlertText.default, {
    type: _AlertBox.alertTypes.ERROR,
    message: emailValidationMsg()
  })), _react.default.createElement(_TextField.default, {
    id: "outlined-password-input",
    label: "Password",
    className: classes.textField,
    type: "password",
    autoComplete: "current-password",
    margin: "normal",
    variant: "outlined",
    value: password,
    onChange: function onChange(e) {
      return setPassword(e.target.value);
    }
  }), _react.default.createElement("div", {
    className: classes.passwordCriteriaContainer
  }, _react.default.createElement("p", null, "Include:"), _react.default.createElement(_PasswordInlineValidation.default, {
    password: password
  })), _react.default.createElement(_AlertBox.default, {
    message: signupError || validationErr
  }), _react.default.createElement("div", null), _react.default.createElement(_SNETButton.default, {
    color: "primary",
    variant: "contained",
    children: "Create Account",
    onClick: handleSubmit,
    type: "submit"
  }));
};

Form.propTypes = {
  onSubmit: _propTypes.default.func,
  signupError: _propTypes.default.string
};
var _default = Form;
exports.default = _default;