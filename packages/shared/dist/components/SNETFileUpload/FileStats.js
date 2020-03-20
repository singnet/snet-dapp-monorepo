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
      fileDownloadURL = props.fileDownloadURL;
  var classes = (0, _styles.useStyles)();

  if (!show) {
    return null;
  }

  return _react.default.createElement("div", {
    className: classes.imgUploaderContainer
  }, _react.default.createElement("div", {
    className: classes.uploadDetails
  }, _react.default.createElement("div", {
    className: uploadSuccess ? classes.successfullUpload : classes.uploadStatusContainer
  }, _react.default.createElement(_Folder.default, null), _react.default.createElement(_Typography.default, {
    className: uploadSuccess ? classes.uploaded : classes.uploadStatus
  }, uploadSuccess ? "Files Uploaded Successfully" : "No Files Uploaded")), _react.default.createElement("div", null, _react.default.createElement(_Typography.default, {
    className: classes.title
  }, "File Name:"), _react.default.createElement(_Typography.default, {
    className: classes.value
  }, fileName)), _react.default.createElement("div", null, _react.default.createElement(_Typography.default, {
    className: classes.title
  }, "Items:"), _react.default.createElement(_Typography.default, {
    className: classes.value
  })), _react.default.createElement("div", null, _react.default.createElement(_Typography.default, {
    className: classes.title
  }, "Uploaded:"), _react.default.createElement(_Typography.default, {
    className: classes.value
  })), _react.default.createElement("div", null, _react.default.createElement(_Typography.default, {
    className: classes.title
  }, "Size:"), _react.default.createElement(_Typography.default, {
    className: classes.value
  }, fileSize)), _react.default.createElement("div", null, _react.default.createElement(_Typography.default, {
    className: classes.title
  }, "User:"), _react.default.createElement(_Typography.default, {
    className: classes.value
  })), _react.default.createElement("div", {
    className: classes.uploadBtns
  }, _react.default.createElement("a", {
    href: fileDownloadURL,
    download: true,
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, _react.default.createElement(_SNETButton.default, {
    children: "download files",
    color: "primary",
    variant: "text",
    disabled: !uploadSuccess
  })), _react.default.createElement(_SNETButton.default, {
    children: "delete files",
    color: "red",
    variant: "text",
    disabled: !uploadSuccess
  }))));
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