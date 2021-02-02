"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _clsx2 = _interopRequireDefault(require("clsx"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Drawer = _interopRequireDefault(require("@material-ui/core/Drawer"));

var _List = _interopRequireDefault(require("@material-ui/core/List"));

var _Divider = _interopRequireDefault(require("@material-ui/core/Divider"));

var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));

var _ListItemIcon = _interopRequireDefault(require("@material-ui/core/ListItemIcon"));

var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));

var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));

var _ToggleMenu = _interopRequireDefault(require("./ToggleMenu"));

var _styles = require("./styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var VerticalTabs = function VerticalTabs(_ref) {
  var _clsx;

  var upperTabs = _ref.upperTabs,
      lowerTabs = _ref.lowerTabs;
  var classes = (0, _styles.useStyles)();

  var _React$useState = _react.default.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      open = _React$useState2[0],
      setOpen = _React$useState2[1];

  return /*#__PURE__*/_react.default.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/_react.default.createElement(_Drawer.default, {
    variant: "permanent",
    classes: {
      paper: (0, _clsx2.default)((_clsx = {}, _defineProperty(_clsx, classes.drawerOpen, open), _defineProperty(_clsx, classes.drawerClose, !open), _clsx))
    }
  }, /*#__PURE__*/_react.default.createElement(_ToggleMenu.default, {
    classes: classes,
    isOpen: open,
    setIsOpen: setOpen
  }), /*#__PURE__*/_react.default.createElement(_List.default, {
    className: classes.list
  }, upperTabs.map(function (item) {
    return /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
      title: !open ? item.title : "",
      key: item.title
    }, /*#__PURE__*/_react.default.createElement(_ListItem.default, {
      button: true,
      className: classes.listItem,
      onClick: item.onRowClick
    }, /*#__PURE__*/_react.default.createElement("a", {
      href: item.href,
      target: item.openInNewTab ? "_blank" : "",
      rel: "noreferrer noopener"
    }, /*#__PURE__*/_react.default.createElement(_ListItemIcon.default, {
      className: classes.listItemIcon
    }, item.icon), /*#__PURE__*/_react.default.createElement(_ListItemText.default, {
      primary: item.title
    }))));
  })), /*#__PURE__*/_react.default.createElement(_Divider.default, null), /*#__PURE__*/_react.default.createElement(_List.default, {
    className: classes.list
  }, lowerTabs.map(function (item) {
    return /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
      title: !open ? item.title : "",
      key: item.title
    }, /*#__PURE__*/_react.default.createElement(_ListItem.default, {
      button: true,
      className: classes.listItem,
      onClick: item.onRowClick
    }, /*#__PURE__*/_react.default.createElement("a", {
      href: item.href,
      target: item.openInNewTab ? "_blank" : "",
      rel: "noreferrer noopener"
    }, /*#__PURE__*/_react.default.createElement(_ListItemIcon.default, {
      className: classes.listItemIcon
    }, item.icon), /*#__PURE__*/_react.default.createElement(_ListItemText.default, {
      primary: item.title
    }))));
  }))));
};

VerticalTabs.propTypes = {
  upperTabs: _propTypes.default.object,
  lowerTabs: _propTypes.default.object
};
var _default = VerticalTabs;
exports.default = _default;