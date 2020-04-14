"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _CardMedia = _interopRequireDefault(require("@material-ui/core/CardMedia"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _SNETAppBar = _interopRequireDefault(require("../SNETAppBar"));

var _BlackLogo = _interopRequireDefault(require("../../assets/images/BlackLogo.svg"));

var _WhiteLogo = _interopRequireDefault(require("../../assets/images/WhiteLogo.svg"));

var _styles = require("./styles");

var _HeaderActions = _interopRequireDefault(require("./HeaderActions"));

var _Navbar = _interopRequireDefault(require("./Navbar"));

var _MobileHeader = _interopRequireDefault(require("./MobileHeader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SNETHeader = function SNETHeader(_ref) {
  var isLoggedIn = _ref.isLoggedIn,
      color = _ref.color,
      NavigationBar = _ref.NavigationBar,
      LoggedInActions = _ref.LoggedInActions,
      LoggedOutActions = _ref.LoggedOutActions,
      portalName = _ref.portalName,
      mobileNavLinks = _ref.mobileNavLinks,
      mobileDropDown = _ref.mobileDropDown,
      onLogoClick = _ref.onLogoClick;
  var classes = (0, _styles.useStyles)();
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("header", null, /*#__PURE__*/_react.default.createElement(_SNETAppBar.default, {
    position: "fixed",
    color: color,
    className: "".concat(classes.appBar, " ").concat(color === "purple" ? classes.purple : null)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.logoContainer,
    onClick: onLogoClick
  }, /*#__PURE__*/_react.default.createElement(_MobileHeader.default, {
    mobileNavLinks: mobileNavLinks,
    mobileDropDown: mobileDropDown,
    isLoggedIn: isLoggedIn,
    LoggedInActions: LoggedInActions,
    LoggedOutActions: LoggedOutActions,
    color: color
  }), /*#__PURE__*/_react.default.createElement(_CardMedia.default, {
    component: "img",
    image: color === "purple" ? _WhiteLogo.default : _BlackLogo.default,
    alt: "SingularityNET"
  }), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "h5"
  }, portalName)), /*#__PURE__*/_react.default.createElement("div", {
    className: classes.navContainer
  }, /*#__PURE__*/_react.default.createElement(_Navbar.default, {
    NavigationBar: NavigationBar
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: classes.headerActionsContainer
  }, /*#__PURE__*/_react.default.createElement(_HeaderActions.default, {
    isLoggedIn: isLoggedIn,
    LoggedInActions: LoggedInActions,
    LoggedOutActions: LoggedOutActions
  })))));
};

SNETHeader.propTypes = {
  isLoggedIn: _propTypes.default.bool,
  color: _propTypes.default.string,
  navbar: _propTypes.default.shape({
    navbarItems: _propTypes.default.arrayOf(_propTypes.default.shape({
      type: _propTypes.default.string,
      activeLinks: _propTypes.default.arrayOf(_propTypes.default.string),
      label: _propTypes.default.string,
      openInNewTab: _propTypes.default.bool,
      to: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object])
    }))
  }),
  LoggedInActions: _propTypes.default.elementType,
  LoggedOutActions: _propTypes.default.elementType,
  onLogoClick: _propTypes.default.func
};
var _default = SNETHeader;
exports.default = _default;