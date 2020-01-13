"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _styles = require("./styles");

var _AlertBox = _interopRequireWildcard(require("../AlertBox"));

var _SNETButton = _interopRequireDefault(require("../SNETButton"));

var _Info = _interopRequireDefault(require("./Info"));

var _validator = _interopRequireDefault(require("../../utils/validator"));

var _validationConstraints = require("./validationConstraints");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var SNETSignupConfirm = function SNETSignupConfirm(props) {
  var info = props.info,
      onResendOtp = props.onResendOtp,
      onSubmit = props.onSubmit,
      signupAlert = props.signupAlert;
  var classes = (0, _styles.useStyles)();

  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      otp = _useState2[0],
      setOtp = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      _useState4 = _slicedToArray(_useState3, 2),
      validationErr = _useState4[0],
      setValidationErr = _useState4[1];

  var handleSubmit = function handleSubmit(event) {
    event.preventDefault();
    setValidationErr();
    var isNotValid = (0, _validator.default)({
      otp: otp
    }, _validationConstraints.signupConfirmConstraints);

    if (isNotValid) {
      return setValidationErr(isNotValid[0]);
    }

    onSubmit(otp);
  };

  var alert = function alert() {
    return {
      type: validationErr ? _AlertBox.alertTypes.ERROR : signupAlert.type,
      message: validationErr || signupAlert.message
    };
  };

  return _react.default.createElement(_Grid.default, {
    item: true,
    xs: 12,
    sm: 12,
    md: 6,
    lg: 6,
    className: classes.confirmOtp
  }, _react.default.createElement("h3", null, "Validate your email "), _react.default.createElement("form", {
    noValidate: true,
    autoComplete: "off",
    className: classes.signupForm
  }, _react.default.createElement(_Info.default, info), _react.default.createElement(_TextField.default, {
    id: "outlined-confirm-otp",
    label: "Verification Code",
    className: classes.textField,
    type: "password",
    autoComplete: "otp",
    margin: "normal",
    variant: "outlined",
    value: otp,
    onChange: function onChange(e) {
      return setOtp(e.target.value);
    },
    autoFocus: true
  }), _react.default.createElement(_AlertBox.default, alert()), _react.default.createElement("div", {
    className: classes.buttonsContainer
  }, _react.default.createElement(_SNETButton.default, {
    variant: "outlined",
    children: "Resend",
    onClick: onResendOtp
  }), _react.default.createElement(_SNETButton.default, {
    color: "primary",
    variant: "contained",
    children: "Continue",
    onClick: handleSubmit,
    type: "submit"
  }))));
};

SNETSignupConfirm.propTypes = {
  info: _propTypes.default.shape({
    title: _propTypes.default.string,
    description: _propTypes.default.string
  }),
  onResendOtp: _propTypes.default.func,
  onSubmit: _propTypes.default.func,
  signupAlert: _propTypes.default.shape({
    type: _propTypes.default.string,
    message: _propTypes.default.string
  })
};
var _default = SNETSignupConfirm;
exports.default = _default;