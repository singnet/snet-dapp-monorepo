"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validate = _interopRequireDefault(require("validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var validator = _validate.default;

var hasLowerCase = function hasLowerCase(value, options) {
  if (/[a-z]/.test(value)) {
    return;
  }

  return options.message || "must contain a lowercase character";
};

var hasUpperCase = function hasUpperCase(value, options) {
  if (/[A-Z]/.test(value)) {
    return;
  }

  return options.message || "must contain an uppercase character";
};

var hasNumber = function hasNumber(value, options) {
  if (/[0-9]/.test(value)) {
    return;
  }

  return options.message || "must contain a number";
};

var hasAWSPasswordSplChar = function hasAWSPasswordSplChar(value, options) {
  // eslint-disable-next-line no-useless-escape
  if (/[\^\$\*\.\[\]\{\}\(\)\?\-\"\!\@\#\%\&\/\,\>\<\'\:\;\|\_\~\`]/.test(value)) {
    return;
  }

  return options.message || "must contain a special character";
};

var array = function array(arrayItems, itemConstraints, key) {
  if (!_validate.default.isArray(arrayItems)) {
    return "".concat(key, " is not a valid array");
  }

  var arrayItemErrors = arrayItems.reduce(function (errors, item) {
    var error = (0, _validate.default)(item, itemConstraints);
    if (!!error) errors.push(error);
    return errors;
  }, []);
  return _validate.default.isEmpty(arrayItemErrors) ? null : "^".concat(JSON.stringify(arrayItemErrors));
};

var validURL = function validURL(str, options) {
  var pattern = new RegExp("^(https ?:\\/\\/)?" + "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + "((\\d{1,3}\\.){3}\\d{1,3}))" + "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + "(\\?[;&a-z\\d%_.~+=-]*)?" + "(\\#[-a-z\\d_]*)?$", "i");

  if (pattern.test(str)) {
    return;
  }

  return options.message || "".concat(str, "  is not valid");
};

validator.validators = _objectSpread({}, _validate.default.validators, {
  // custom validators
  hasLowerCase: hasLowerCase,
  hasUpperCase: hasUpperCase,
  hasNumber: hasNumber,
  hasAWSPasswordSplChar: hasAWSPasswordSplChar,
  array: array,
  validURL: validURL
});
var _default = validator;
exports.default = _default;