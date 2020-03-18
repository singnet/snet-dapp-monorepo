"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.statusTitleType = void 0;

var _react = _interopRequireDefault(require("react"));

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _styles = require("@material-ui/styles");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _AnchorLink = _interopRequireDefault(require("../AnchorLink"));

var _SNETButton = _interopRequireDefault(require("shared/dist/components/SNETButton"));

var _styles2 = require("./styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var statusTitleType = {
  PENDING: "PENDING",
  REJECTED: "REJECTED"
};
exports.statusTitleType = statusTitleType;

var SNETStatusBanner = function SNETStatusBanner(_ref) {
  var classes = _ref.classes,
      title = _ref.title,
      img = _ref.img,
      description = _ref.description,
      actions = _ref.actions,
      type = _ref.type,
      anchorDetails = _ref.anchorDetails;
  return _react.default.createElement(_Grid.default, {
    container: true,
    spacing: 24,
    className: classes.statusBannerContainer
  }, _react.default.createElement(_Grid.default, {
    item: true,
    xs: 12,
    sm: 4,
    md: 4,
    lg: 4,
    className: classes.statusBannerMedia
  }, _react.default.createElement("img", {
    src: img,
    alt: "Status-Media"
  })), _react.default.createElement(_Grid.default, {
    item: true,
    xs: 12,
    sm: 8,
    md: 8,
    lg: 8,
    className: classes.statusBannerContent
  }, _react.default.createElement(_Typography.default, {
    variant: "h6",
    className: classes[statusTitleType[type]]
  }, title), _react.default.createElement(_Typography.default, null, description), actions.map(function (action) {
    return _react.default.createElement(_SNETButton.default, _extends({
      key: action.children
    }, action));
  }), anchorDetails ? anchorDetails.map(function (detail) {
    return _react.default.createElement(_AnchorLink.default, {
      label: detail.label,
      href: detail.linkTo,
      key: detail.label,
      newTab: detail.newTab
    });
  }) : null));
};

SNETStatusBanner.propTypes = {
  title: _propTypes.default.string.isRequired,
  img: _propTypes.default.string.isRequired,
  description: _propTypes.default.string.isRequired,
  actions: _propTypes.default.array.isRequired
};

var _default = (0, _styles.withStyles)(_styles2.useStyles)(SNETStatusBanner);

exports.default = _default;