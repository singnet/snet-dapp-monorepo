"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Link = _interopRequireDefault(require("@material-ui/core/Link"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var AnchorLink = function AnchorLink(_ref) {
  var label = _ref.label,
      href = _ref.href,
      newTab = _ref.newTab,
      rest = _objectWithoutProperties(_ref, ["label", "href", "newTab"]);

  if (newTab) {
    return /*#__PURE__*/_react.default.createElement(_Link.default, _extends({
      href: href,
      title: label,
      target: "_blank",
      rel: "noopener"
    }, rest), label);
  }

  return /*#__PURE__*/_react.default.createElement(_Link.default, _extends({
    href: href,
    title: label
  }, rest), label);
};

AnchorLink.propTypes = {
  label: _propTypes.default.string,
  href: _propTypes.default.string,
  newTab: _propTypes.default.bool
};
var _default = AnchorLink;
exports.default = _default;