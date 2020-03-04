"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _styles = require("./styles");

var _Routes = _interopRequireDefault(require("../../../utility/constants/Routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NavItem = function NavItem(_ref) {
  var title = _ref.title,
      link = _ref.link;
  var classes = (0, _styles.useStyles)();

  var isActive = function isActive(unused, _ref2) {
    var pathname = _ref2.pathname;

    switch (link) {
      case "/".concat(_Routes.default.AI_MARKETPLACE):
        {
          if (pathname === "/" || pathname.includes(_Routes.default.AI_MARKETPLACE)) {
            return true;
          }

          return false;
        }

      default:
        {
          return pathname === link;
        }
    }
  };

  return _react.default.createElement("li", {
    className: classes.navLinks
  }, _react.default.createElement(_reactRouterDom.NavLink, {
    to: link,
    className: classes.navLinksAnchor,
    activeClassName: classes.activeTab,
    isActive: isActive
  }, title));
};

NavItem.defaultProps = {
  link: "#"
};
var _default = NavItem;
exports.default = _default;