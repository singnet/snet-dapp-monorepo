"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDropzone = require("react-dropzone");

var _Backup = _interopRequireDefault(require("@material-ui/icons/Backup"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _styles = require("./styles");

var _FileStats = _interopRequireDefault(require("./FileStats"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var SNETFileUpload = function SNETFileUpload(props) {
  var disabled = props.disabled,
      minSize = props.minSize,
      maxSize = props.maxSize,
      multiple = props.multiple,
      accept = props.accept,
      onDrop = props.onDrop,
      onDropAccepted = props.onDropAccepted,
      onDropRejected = props.onDropRejected,
      showFileDetails = props.showFileDetails,
      fileName = props.fileName,
      fileSize = props.fileSize,
      fileDownloadURL = props.fileDownloadURL,
      uploadSuccess = props.uploadSuccess;
  var classes = (0, _styles.useStyles)(); // eslint-disable-next-line no-unused-vars

  var _useDropzone = (0, _reactDropzone.useDropzone)({
    disabled: disabled,
    minSize: minSize,
    maxSize: maxSize,
    multiple: multiple,
    accept: accept,
    onDrop: onDrop,
    onDropAccepted: onDropAccepted,
    onDropRejected: onDropRejected
  }),
      getRootProps = _useDropzone.getRootProps,
      getInputProps = _useDropzone.getInputProps,
      isDragActive = _useDropzone.isDragActive;

  return _react.default.createElement(_Grid.default, {
    container: true
  }, _react.default.createElement("input", getInputProps()), _react.default.createElement(_Grid.default, _extends({
    item: true,
    xs: 12,
    sm: 12,
    md: 6,
    lg: 6,
    className: classes.grayBox
  }, getRootProps()), _react.default.createElement(_Backup.default, null), _react.default.createElement(_Typography.default, null, "Drag and drop image here or", _react.default.createElement("span", null, " click")), _react.default.createElement(_Typography.default, null, "(Package must be under ", maxSize, "mb. Make sure the extension is .zip or .tar)")), _react.default.createElement(_Grid.default, {
    item: true,
    xs: 12,
    sm: 12,
    md: 6,
    lg: 6
  }, _react.default.createElement(_FileStats.default, {
    show: showFileDetails,
    fileName: fileName,
    fileSize: fileSize,
    fileDownloadURL: fileDownloadURL,
    uploadSuccess: uploadSuccess
  })));
};

SNETFileUpload.prototypes = {
  disabled: _propTypes.default.disabled,
  onFileSelect: _propTypes.default.func,
  minSize: _propTypes.default.number,
  maxSize: _propTypes.default.number,
  multiple: _propTypes.default.bool,
  accept: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.array]),
  //https://github.com/react-dropzone/attr-accept
  onDrop: _propTypes.default.func,
  onDropAccepted: _propTypes.default.func,
  onDropRejected: _propTypes.default.func,
  showFileDetails: _propTypes.default.bool,
  fileName: _propTypes.default.string,
  fileSize: _propTypes.default.number,
  fileDownloadURL: _propTypes.default.string,
  uploadSuccess: _propTypes.default.bool
};
var _default = SNETFileUpload;
exports.default = _default;