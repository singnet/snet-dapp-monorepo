"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _styles = require("@material-ui/styles");

var _styles2 = require("./styles");

var _dummyCard = _interopRequireDefault(require("../../../assets/images/dummy-card.png"));

var _CategoryDetails = _interopRequireDefault(require("./CategoryDetails"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Category = function Category(_ref) {
  var classes = _ref.classes,
      title = _ref.title,
      content = _ref.content,
      rightAlign = _ref.rightAlign,
      media = _ref.media;
  return /*#__PURE__*/_react.default.createElement(_Grid.default, {
    container: true,
    className: "".concat(classes.CategoryWrapper, " ").concat(rightAlign ? classes.reverseDirection : null)
  }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true,
    xs: 12,
    sm: 6,
    md: 6,
    lg: 6,
    className: classes.CategoryMedia
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: media || _dummyCard.default,
    alt: "DummyImage",
    className: classes.FullWidth
  })), /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true,
    xs: 12,
    sm: 6,
    md: 6,
    lg: 6,
    className: classes.CategoryContent
  }, /*#__PURE__*/_react.default.createElement("h3", null, title), content.map(function (item) {
    return /*#__PURE__*/_react.default.createElement(_CategoryDetails.default, {
      type: item.type,
      value: item.value,
      key: item.type
    });
  })));
};

var _default = (0, _styles.withStyles)(_styles2.useStyles)(Category);

exports.default = _default;