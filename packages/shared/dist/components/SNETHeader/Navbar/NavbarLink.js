"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _styles = require("./styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NavbarLink = function NavbarLink(props) {
  var activeLinks = props.activeLinks,
      label = props.label,
      openInNewTab = props.openInNewTab,
      to = props.to;
  var classes = (0, _styles.useStyles)(props);

  var isActive = function isActive(unused, _ref) {
    var pathname = _ref.pathname;
    return activeLinks.includes(pathname);
  };

  return _react.default.createElement(_reactRouterDom.NavLink, {
    children: label,
    to: to,
    isActive: isActive,
    target: openInNewTab ? "_blank" : "",
    rel: openInNewTab ? "noreferrer noopener" : "",
    className: classes.navLink,
    activeClassName: classes.navLinkActive
  });
};

NavbarLink.propTypes = {
  activeLinks: _propTypes.default.arrayOf(_propTypes.default.string),
  label: _propTypes.default.string,
  openInNewTab: _propTypes.default.bool,
  to: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object])
};
var _default = NavbarLink;
exports.default = _default;