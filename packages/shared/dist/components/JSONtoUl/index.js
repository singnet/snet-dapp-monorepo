"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _isArray = _interopRequireDefault(require("lodash/isArray"));

var _isObject = _interopRequireDefault(require("lodash/isObject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var JSONtoUl = function JSONtoUl(obj) {
  if ((0, _isEmpty.default)(obj)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement("ul", null, Object.entries(obj).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    if ((0, _isArray.default)(value)) {
      return /*#__PURE__*/_react.default.createElement("li", {
        key: key
      }, /*#__PURE__*/_react.default.createElement("strong", null, key), /*#__PURE__*/_react.default.createElement("span", null, "[", value.join(","), "]"));
    } else if ((0, _isObject.default)(value)) {
      return JSONtoUl(value);
    }

    return /*#__PURE__*/_react.default.createElement("li", {
      key: key
    }, /*#__PURE__*/_react.default.createElement("strong", null, key), /*#__PURE__*/_react.default.createElement("span", null, "".concat(value)));
  }));
};

var _default = JSONtoUl;
exports.default = _default;