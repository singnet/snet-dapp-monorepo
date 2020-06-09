"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _materialUiFlatPagination = _interopRequireDefault(require("material-ui-flat-pagination"));

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _FormControl = _interopRequireDefault(require("@material-ui/core/FormControl"));

var _Select = _interopRequireDefault(require("@material-ui/core/Select"));

var _OutlinedInput = _interopRequireDefault(require("@material-ui/core/OutlinedInput"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("./styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SNETPagination = function SNETPagination(_ref) {
  var limit = _ref.limit,
      offset = _ref.offset,
      totalCount = _ref.totalCount,
      itemsPerPageOptions = _ref.itemsPerPageOptions,
      itemsPerPage = _ref.itemsPerPage,
      onItemsPerPageChange = _ref.onItemsPerPageChange,
      onPageChange = _ref.onPageChange;
  var classes = (0, _styles.useStyles)();

  var handleItemsPerPage = function handleItemsPerPage(event) {
    onItemsPerPageChange(parseFloat(event.target.value));
  };

  var handlePageChange = function handlePageChange(selectedOffset) {
    if (selectedOffset === parseFloat(offset)) {
      return;
    }

    onPageChange(parseFloat(selectedOffset));
  };

  var from = offset;
  var to = parseFloat(offset) + parseFloat(limit);
  return /*#__PURE__*/_react.default.createElement(_Grid.default, {
    container: true,
    className: classes.paginationContainer
  }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true,
    xs: 6,
    sm: 6,
    md: 6,
    lg: 6,
    className: classes.pagination
  }, /*#__PURE__*/_react.default.createElement(_materialUiFlatPagination.default, {
    limit: limit,
    offset: offset,
    total: totalCount,
    reduced: true,
    onClick: function onClick(_e, offset) {
      return handlePageChange(offset);
    },
    className: classes.styledPagination
  })), /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true,
    xs: 6,
    sm: 6,
    md: 6,
    lg: 6,
    className: classes.pageCountSection
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: classes.itemPerPageTxt
  }, "Items per page"), /*#__PURE__*/_react.default.createElement(_FormControl.default, {
    variant: "outlined",
    className: classes.pageListformControl
  }, /*#__PURE__*/_react.default.createElement(_Select.default, {
    value: itemsPerPage,
    input: /*#__PURE__*/_react.default.createElement(_OutlinedInput.default, {
      labelWidth: 75,
      name: "age",
      id: "outlined-age-simple",
      onChange: handleItemsPerPage
    }),
    className: classes.selectBox
  }, itemsPerPageOptions.map(function (item) {
    return /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
      key: item.value,
      value: item.value
    }, item.label);
  }))), /*#__PURE__*/_react.default.createElement("span", null, from, "-", to, " of ", totalCount)));
};

SNETPagination.propTypes = {
  limit: _propTypes.default.number.isRequired,
  offset: _propTypes.default.number.isRequired,
  totalCount: _propTypes.default.number.isRequired,
  itemsPerPageOptions: _propTypes.default.arrayOf(_propTypes.default.shape({
    value: _propTypes.default.number,
    label: _propTypes.default.string
  })).isRequired,
  itemsPerPage: _propTypes.default.number.isRequired,
  onItemsPerPageChange: _propTypes.default.func.isRequired,
  onPageChange: _propTypes.default.func.isRequired
};
var _default = SNETPagination;
exports.default = _default;