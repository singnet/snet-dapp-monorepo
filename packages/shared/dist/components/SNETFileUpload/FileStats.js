"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Folder = _interopRequireDefault(require("@material-ui/icons/Folder"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _SNETButton = _interopRequireDefault(require("shared/dist/components/SNETButton"));

var _styles = require("./styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FileStats = function FileStats(props) {
  var uploadSuccess = props.uploadSuccess,
      show = props.show,
      fileName = props.fileName,
      fileSize = props.fileSize,
      fileDownloadURL = props.fileDownloadURL,
      error = props.error;
  var classes = (0, _styles.useStyles)();

  if (!show) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    className: classes.imgUploaderContainer
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.uploadDetails
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: uploadSuccess ? classes.successfullUpload : classes.uploadStatusContainer
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: error ? classes.errorField : classes.uploadStatusContainer
  }, /*#__PURE__*/_react.default.createElement(_Folder.default, null), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    className: uploadSuccess ? classes.uploaded : classes.uploadStatus
  }, uploadSuccess ? "Files Uploaded Successfully" : "No Files Uploaded"))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    className: classes.title
  }, "File Name:"), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    className: classes.value
  }, fileName)), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    className: classes.title
  }, "Items:"), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    className: classes.value
  })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    className: classes.title
  }, "Uploaded:"), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    className: classes.value
  })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    className: classes.title
  }, "Size:"), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    className: classes.value
  }, fileSize)), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    className: classes.title
  }, "User:"), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    className: classes.value
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: classes.uploadBtns
  }, /*#__PURE__*/_react.default.createElement("a", {
    href: fileDownloadURL,
    download: true,
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/_react.default.createElement(_SNETButton.default, {
    children: "download files",
    color: "primary",
    variant: "text",
    disabled: !uploadSuccess
  })), " ")));
};

FileStats.prototypes = {
  show: _propTypes.default.bool,
  uploadSuccess: _propTypes.default.func,
  fileName: _propTypes.default.func,
  fileSize: _propTypes.default.number,
  fileDownloadURL: _propTypes.default.string
};
var _default = FileStats;
exports.default = _default;