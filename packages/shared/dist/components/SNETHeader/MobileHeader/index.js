"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styles = require("@material-ui/styles");

var _Close = _interopRequireDefault(require("@material-ui/icons/Close"));

var _HeaderActions = _interopRequireDefault(require("../HeaderActions"));

var _NavItem = _interopRequireDefault(require("../Navbar/NavItem"));

var _styles2 = require("./styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MobileHeader = function MobileHeader(_ref) {
  var classes = _ref.classes,
      data = _ref.data,
      isLoggedIn = _ref.isLoggedIn,
<<<<<<< Updated upstream
      mobileNavLinks = _ref.mobileNavLinks,
      mobileDropDown = _ref.mobileDropDown,
      LoggedInActions = _ref.LoggedInActions,
      LoggedOutActions = _ref.LoggedOutActions;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      openMobileMenu = _useState2[0],
      setOpenMobileMenu = _useState2[1];
=======
      hamburgerMenu = _ref.hamburgerMenu,
      updateHamburgerState = _ref.updateHamburgerState,
      color = _ref.color;
>>>>>>> Stashed changes

  var toggleMobileMenu = function toggleMobileMenu() {
    setOpenMobileMenu(!openMobileMenu);
  };

  if (!openMobileMenu) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "".concat(classes.hamburger, " ").concat(color === "white" ? classes.whiteHamburger : null),
      onClick: toggleMobileMenu
    }, /*#__PURE__*/_react.default.createElement("span", null), /*#__PURE__*/_react.default.createElement("span", null), /*#__PURE__*/_react.default.createElement("span", null));
  }

  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.mobileNavContainer
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.closeMenuIcon
  }, /*#__PURE__*/_react.default.createElement(_Close.default, {
    onClick: toggleMobileMenu
  })), /*#__PURE__*/_react.default.createElement("nav", {
    className: classes.mobileNavigation
  }, /*#__PURE__*/_react.default.createElement("ul", null, mobileNavLinks.map(function (tab) {
    return /*#__PURE__*/_react.default.createElement(_NavItem.default, {
      key: tab.label,
      title: tab.label,
      link: tab.to,
      active: tab.active
    });
  }), mobileDropDown.map(function (dropdown) {
    return /*#__PURE__*/_react.default.createElement("div", {
      key: dropdown.label,
      className: classes.subMenues
    }, /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_NavItem.default, {
      title: dropdown.label,
      subHeader: true
    }), dropdown.list.map(function (item) {
      return /*#__PURE__*/_react.default.createElement(_NavItem.default, {
        key: item.label,
        title: item.label,
        link: item.link,
        subListItem: true
      });
    })));
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(classes.mobileActionBtns, " ").concat(isLoggedIn ? classes.loggedInState : "")
  }, /*#__PURE__*/_react.default.createElement(_HeaderActions.default, {
    isLoggedIn: isLoggedIn,
    LoggedInActions: LoggedInActions,
    LoggedOutActions: LoggedOutActions
  })))));
};

var _default = (0, _styles.withStyles)(_styles2.useStyles)(MobileHeader);

exports.default = _default;