"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("@material-ui/core/styles");

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Refresh = _interopRequireDefault(require("@material-ui/icons/Refresh"));

var _Info = _interopRequireDefault(require("@material-ui/icons/Info"));

var _Error = _interopRequireDefault(require("@material-ui/icons/Error"));

var _icons = require("@material-ui/icons");

var _CloudDownload = _interopRequireDefault(require("@material-ui/icons/CloudDownload"));

var _UnfoldMore = _interopRequireDefault(require("@material-ui/icons/UnfoldMore"));

var _CircularProgress = _interopRequireDefault(require("@material-ui/core/CircularProgress"));

var _Fade = _interopRequireDefault(require("@material-ui/core/Fade"));

var _Grow = _interopRequireDefault(require("@material-ui/core/Grow"));

var _Slide = _interopRequireDefault(require("@material-ui/core/Slide"));

var _colors = require("@material-ui/core/colors");

var _reactSwipeableViews = _interopRequireDefault(require("react-swipeable-views"));

var _Tabs = _interopRequireDefault(require("@material-ui/core/Tabs"));

var _Tab = _interopRequireDefault(require("@material-ui/core/Tab"));

var _core = require("@material-ui/core");

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _reactFileDrop = _interopRequireDefault(require("react-file-drop"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _InputAdornment = _interopRequireDefault(require("@material-ui/core/InputAdornment"));

var _Search = _interopRequireDefault(require("@material-ui/icons/Search"));

var _GridList = _interopRequireDefault(require("@material-ui/core/GridList"));

var _GridListTile = _interopRequireDefault(require("@material-ui/core/GridListTile"));

var _GridListTileBar = _interopRequireDefault(require("@material-ui/core/GridListTileBar"));

var _Snackbar = _interopRequireDefault(require("@material-ui/core/Snackbar"));

var _SnackbarContent = _interopRequireDefault(require("@material-ui/core/SnackbarContent"));

var _ClickAwayListener = _interopRequireDefault(require("@material-ui/core/ClickAwayListener"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// Color Palette
var snetGreyError = _colors.grey[700];
var snetGrey = _colors.grey[500];
var snetBackgroundGrey = _colors.grey[100];
var snetRed = _colors.red[500];
var snetBackgroundRed = _colors.red[100]; // Definitions

var spacingUnit = 8;
var snetFont = "Muli";
var minimumTabHeight = 160;

var SNETImageUpload = /*#__PURE__*/function (_React$Component) {
  _inherits(SNETImageUpload, _React$Component);

  var _super = _createSuper(SNETImageUpload);

  _createClass(SNETImageUpload, null, [{
    key: "getBase64ImageType",
    value: function getBase64ImageType(base64img) {
      // Extracts base64-encoded image's mime type
      var mimeType;

      if (base64img.charAt(0) === "/") {
        mimeType = "image/jpeg";
      } else if (base64img.charAt(0) === "R") {
        mimeType = "image/gif";
      } else if (base64img.charAt(0) === "i") {
        mimeType = "image/png";
      } else {
        mimeType = "application/octet-stream";
      }

      return mimeType;
    }
  }, {
    key: "addBase64Header",
    value: function addBase64Header(mimeType, rawBase64) {
      //Adds headers to raw base64 encoded images so they can be displayed in an img tag
      return "data:" + mimeType + ";base64," + rawBase64;
    }
  }, {
    key: "prepareBase64Image",
    value: function prepareBase64Image(base64img) {
      // Extracts image type and adds headers
      var mimeType = SNETImageUpload.getBase64ImageType(base64img);
      return SNETImageUpload.addBase64Header(mimeType, base64img);
    }
  }]);

  function SNETImageUpload(props) {
    var _this;

    _classCallCheck(this, SNETImageUpload);

    _this = _super.call(this, props); // It is the same thing, only difference is Component where we do the binding.
    // Component is lower in the tree, and now button has the logic how to open the screen.
    // Setting minimum tab height

    _this.tabHeight = Math.max(minimumTabHeight, _this.props.tabHeight);
    _this.dropzoneHeightOffset = 14;
    _this.state = {
      // Component's flow of execution
      mainState: _this.props.outputImage ? "display" : "initial",
      // initial, loading, uploaded, display
      value: _this.props.outputImage ? _this.props.disableOutputTab ? _this.props.disableComparisonTab ? 3 : 5 : 4 : _this.props.disableUploadTab // Logic for defining the initial tab depending on which are available
      ? _this.props.disableUploadTab + _this.props.disableUrlTab : 0,
      searchText: null,
      errorMessage: null,
      displayError: false,
      displayImageName: false,
      // Selected image data (sent via callback function)
      inputImageData: null,
      // encoded image data. NOT ALWAYS THE SAME DATA SENT VIA CALLBACK
      mimeType: null,
      // "jpeg", "png", etc
      encoding: null,
      // "byteArray", "base64", "url"
      filename: null,
      // image filename
      // Image data readers
      base64Reader: undefined,
      byteReader: undefined,
      // Output display mode
      imageXPosition: undefined,
      // arbitrary, will be set properly
      dividerXPosition: _this.props.width / 2,
      displayModeTitle: _this.props.displayModeTitle,
      outputImage: _this.props.outputImageType === "url" ? _this.props.outputImage : _this.props.outputImage && SNETImageUpload.prepareBase64Image(_this.props.outputImage),
      outputImageName: _this.props.outputImageName
    };
    _this.tabStyle = {
      position: "relative",
      overflow: "hidden",
      height: _this.tabHeight + "px"
    };
    _this.tabLabelStyle = {
      fontFamily: snetFont,
      fontVariantCaps: "normal",
      textTransform: "initial",
      fontSize: 14
    }; // Color Palette

    _this.mainColor = _this.props.mainColor[500];
    _this.theme = (0, _styles.createMuiTheme)({
      palette: {
        primary: _this.props.mainColor,
        error: _colors.red
      },
      typography: {
        useNextVariants: true
      }
    }); // Error Messages

    _this.urlErrorMessage = "Incorrect URL or permission denied by server.";
    _this.fileSizeError = "File size exceeds limits (" + _this.props.maxImageSize / 1000000 + "mb).";
    _this.fileTypeError = "File type not accepted. Allowed: " + _this.props.allowedInputTypes + ".";
    _this.inputImageErrorMessage = "Content image could not be rendered.";
    _this.outputImageErrorMessage = "Output image could not be rendered."; // Refs

    _this.imageDiv = _react.default.createRef();
    _this.inputImage = _react.default.createRef();
    _this.outputImage = _react.default.createRef();
    _this.uploadedStateImg = _react.default.createRef(); // Function binding

    _this.handleMouseMove = _this.handleMouseMove.bind(_assertThisInitialized(_this));
    _this.handleSearchSubmit = _this.handleSearchSubmit.bind(_assertThisInitialized(_this));
    _this.handleTabChange = _this.handleTabChange.bind(_assertThisInitialized(_this));
    _this.sendData = _this.sendData.bind(_assertThisInitialized(_this));
    _this.setInputImageDimensions = _this.setInputImageDimensions.bind(_assertThisInitialized(_this));
    _this.setInitialImageXPosition = _this.setInitialImageXPosition.bind(_assertThisInitialized(_this));
    _this.setLoadingState = _this.setLoadingState.bind(_assertThisInitialized(_this));
    _this.verifyAndUpload = _this.verifyAndUpload.bind(_assertThisInitialized(_this));
    _this.toDataUrl = _this.toDataUrl.bind(_assertThisInitialized(_this));
    _this.searchTextUpdate = _this.searchTextUpdate.bind(_assertThisInitialized(_this));
    _this.displayErrorMessage = _this.displayErrorMessage.bind(_assertThisInitialized(_this));
    _this.setUploadedState = _this.setUploadedState.bind(_assertThisInitialized(_this));
    return _this;
  } // When props.outputImage changes, the component changes to the display mode.


  _createClass(SNETImageUpload, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var mimeType; //"data:" + this.state.outputImageMimeType + ";base64," +

      if (nextProps.outputImage) {
        if (nextProps.outputImage !== this.props.outputImage) {
          if (nextProps.outputImageMimeType === undefined) {
            mimeType = SNETImageUpload.getBase64ImageType(nextProps.outputImage);
          } else {
            mimeType = nextProps.outputImageMimeType;
          }

          var outputImage;

          if (this.props.outputImageType === "url" || nextProps.outputImage === "url") {
            outputImage = nextProps.outputImage;
          } else {
            outputImage = SNETImageUpload.addBase64Header(mimeType, nextProps.outputImage);
          }

          this.setState({
            displayModeTitle: nextProps.displayModeTitle,
            outputImage: outputImage,
            outputImageMimeType: mimeType,
            outputImageName: nextProps.outputImageName,
            mainState: "display",
            value: nextProps.disableOutputTab ? nextProps.disableComparisonTab ? 3 : 5 : 4
          });
        }
      } else {
        // Resets component if outputImage is empty again
        if (this.props.outputImage) {
          this.setState({
            // Component's flow of execution
            mainState: "initial",
            // initial, loading, uploaded, display
            value: this.props.disableUploadTab // Logic for defining the initial tab depending on which are available
            ? this.props.disableUploadTab + this.props.disableUrlTab : 0,
            searchText: null,
            errorMessage: null,
            displayError: false,
            displayImageName: false,
            // Selected image data (sent via callback function)
            inputImageData: null,
            // encoded image data. NOT ALWAYS THE SAME DATA SENT VIA CALLBACK
            mimeType: null,
            // "jpeg", "png", etc
            encoding: null,
            // "byteArray", "base64", "url"
            filename: null,
            // image filename
            // Image data readers
            base64Reader: undefined,
            byteReader: undefined,
            // Output display mode
            imageXPosition: undefined,
            // arbitrary, will be set properly
            dividerXPosition: this.props.width / 2,
            displayModeTitle: this.props.displayModeTitle,
            outputImage: this.props.outputImage,
            outputImageName: this.props.outputImageName
          }, function () {
            return _this2.sendData(_this2.state.inputImageData);
          });
        }
      } // Resets the component if disableResetButton is false:


      this.props.disableResetButton && !nextProps.disableResetButton && this.setState({
        // Component's flow of execution
        mainState: "initial",
        // initial, loading, uploaded, display
        value: this.props.disableUploadTab // Logic for defining the initial tab depending on which are available
        ? this.props.disableUploadTab + this.props.disableUrlTab : 0,
        searchText: null,
        errorMessage: null,
        displayError: false,
        displayImageName: false,
        // Selected image data (sent via callback function)
        inputImageData: null,
        // encoded image data. NOT ALWAYS THE SAME DATA SENT VIA CALLBACK
        mimeType: null,
        // "jpeg", "png", etc
        encoding: null,
        // "byteArray", "base64", "url"
        filename: null,
        // image filename
        // Image data readers
        base64Reader: undefined,
        byteReader: undefined,
        // Output display mode
        imageXPosition: undefined,
        // arbitrary, will be set properly
        dividerXPosition: this.props.width / 2,
        displayModeTitle: this.props.displayModeTitle,
        outputImage: this.props.outputImage,
        outputImageName: this.props.outputImageName
      }, function () {
        return _this2.sendData(_this2.state.inputImageData);
      });
    }
  }, {
    key: "setLoadingState",
    value: function setLoadingState() {
      this.setState({
        mainState: "loading"
      });
    }
  }, {
    key: "sendData",
    value: function sendData() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.inputImageData;
      var mimeType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state.mimeType;
      var encoding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.state.encoding;
      var filename = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.state.filename;
      this.props.imageDataFunc(data, mimeType, encoding, filename); // eslint-disable-next-line no-console

      console.log("Sent: \nMIME type: " + mimeType + "\nEncoding: " + encoding + "\nFilename: " + filename + "\nImage data: " + data);
    }
  }, {
    key: "setUploadedState",
    value: function setUploadedState(imageData, sendData, encoding, mimeType, filename) {
      var _this3 = this;

      // If the image follows the specifications, sets state to uploaded
      this.setState({
        mainState: "uploaded",
        // initial, loading, uploaded
        searchText: null,
        inputImageData: imageData,
        mimeType: mimeType,
        encoding: encoding,
        filename: filename,
        displayError: false,
        errorMessage: null
      }, function () {
        _this3.sendData(sendData);
      });
    }
  }, {
    key: "verifyAndUpload",
    value: function verifyAndUpload(imageData, sendData, encoding, mimeType, filename) {
      // imageData: base64 encoded image
      // sendData: might be base64, bytes or url
      // Verifies image data against allowed types, max size, width and height and uploads the image if its within the
      // specifications.
      if (encoding === "url") {
        this.setUploadedState(imageData, sendData, encoding, mimeType, filename);
      } else {
        // Checks file size
        var byteLength = imageData.replace(/=/g, "").length * 0.75;

        if (byteLength > this.props.maxImageSize) {
          this.displayErrorMessage(this.fileSizeError);
          return;
        } // Checks file type


        if (this.props.allowedInputTypes.includes("image/*")) {
          // if we accept all image types
          if (mimeType.indexOf("image") === -1) {
            // if received file is not an image
            this.displayErrorMessage(this.fileTypeError + "Got: " + mimeType + ".");
            return;
          }
        } else {
          // verifies input type against each allowed input type
          if (!this.props.allowedInputTypes.includes(mimeType)) {
            this.displayErrorMessage(this.fileTypeError + "Got: " + mimeType + ".");
            return;
          }
        } // Checks image dimensions if they have been defined


        if (this.props.maxImageHeight || this.props.maxImageWidth) {
          var img = new Image();
          img.crossOrigin = "anonymous";
          img.setUploadedState = this.setUploadedState;
          img.displayErrorMessage = this.displayErrorMessage;
          img.imageData = imageData;
          img.sendData = sendData;
          img.encoding = encoding;
          img.mimeType = mimeType;
          img.filename = filename;
          img.maxImageWidth = this.props.maxImageWidth;
          img.maxImageHeight = this.props.maxImageHeight;

          img.onload = function () {
            if (this.maxImageHeight) {
              if (this.naturalHeight > this.maxImageHeight) {
                this.displayErrorMessage("Maximum image height (" + this.maxImageHeight + "px) exceeded.  Got: " + this.naturalHeight + "px.");
                return;
              }
            }

            if (this.maxImageWidth) {
              if (this.naturalWidth > this.maxImageWidth) {
                this.displayErrorMessage("Maximum image width (" + this.maxImageWidth + "px) exceeded.  Got: " + this.naturalWidth + "px.");
                return;
              }
            }

            this.setUploadedState(this.imageData, this.sendData, this.encoding, this.mimeType, this.filename);
          };

          img.src = imageData;
        } else {
          // Goes to uploaded state.
          this.setUploadedState(imageData, sendData, encoding, mimeType, filename);
        }
      }
    }
  }, {
    key: "displayErrorMessage",
    value: function displayErrorMessage(errorMessage) {
      var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "initial";
      this.setState({
        mainState: state,
        searchText: null,
        inputImageData: null,
        mimeType: null,
        encoding: null,
        filename: null,
        errorMessage: errorMessage,
        displayError: true
      });
    }
    /* ----------------
         - IMAGE UPLOAD -
      *  ----------------*/

  }, {
    key: "byteReaderOnLoadEnd",
    value: function byteReaderOnLoadEnd(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = function () {
        this.verifyAndUpload(reader.result, new Uint8Array(this.state.byteReader.result), "byteArray", file.type, file.name);
      }.bind(this);
    }
  }, {
    key: "handleImageUpload",
    value: function handleImageUpload(files, event) {
      event.preventDefault();
      event.stopPropagation();
      this.setLoadingState();
      var file = files[0]; // Is always used

      var reader = new FileReader();

      reader.onloadend = function () {
        var _this4 = this;

        this.setState({
          base64Reader: reader
        }, function () {
          _this4.verifyAndUpload(_this4.state.base64Reader.result, _this4.state.base64Reader.result.split(",")[1], "base64", file.type, file.name);
        });
      }.bind(this);

      var byteReader = new FileReader();

      byteReader.onloadend = function () {
        this.setState({
          byteReader: byteReader
        });
        this.byteReaderOnLoadEnd(file);
      }.bind(this);

      if (this.props.returnByteArray) {
        byteReader.readAsArrayBuffer(file);
      } else {
        reader.readAsDataURL(file);
      }
    }
  }, {
    key: "renderUploadTab",
    value: function renderUploadTab() {
      var _this5 = this;

      return /*#__PURE__*/_react.default.createElement(_Grid.default, {
        item: true,
        xs: 12
      }, /*#__PURE__*/_react.default.createElement(_reactFileDrop.default, {
        onDrop: function onDrop(files, event) {
          return _this5.handleImageUpload(files, event);
        }
      }, /*#__PURE__*/_react.default.createElement("input", {
        id: "myInput",
        type: "file",
        style: {
          display: "none"
        },
        accept: this.props.allowedInputTypes,
        onChange: function onChange(e) {
          return _this5.handleImageUpload(e.target.files, e);
        },
        ref: function ref(input) {
          return _this5.inputElement = input;
        }
      }), /*#__PURE__*/_react.default.createElement("div", {
        onClick: function onClick() {
          return _this5.inputElement.click();
        },
        style: {
          borderWidth: 1,
          borderColor: "#d6d6d6",
          borderStyle: "dashed",
          borderRadius: 4,
          cursor: "pointer",
          overflow: "hidden",
          height: this.tabHeight - this.dropzoneHeightOffset + 10 + "px",
          display: "flex",
          flexDirection: "column"
        }
      }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
        container: true,
        direction: "column",
        justify: "center",
        alignItems: "center",
        style: {
          flexGrow: 1,
          height: this.tabHeight + "px"
        },
        spacing: spacingUnit
      }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
        item: true,
        style: {
          padding: "0 40px"
        }
      }, /*#__PURE__*/_react.default.createElement(_icons.CloudUpload, {
        style: {
          fontSize: 48,
          color: this.mainColor
        }
      })), /*#__PURE__*/_react.default.createElement(_Grid.default, {
        item: true,
        style: {
          padding: "0 40px"
        }
      }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
        style: {
          fontFamily: snetFont,
          fontVariantCaps: "normal",
          textTransform: "initial",
          fontSize: 16,
          color: snetGrey
        }
      }, "Drag and drop image here or", /*#__PURE__*/_react.default.createElement("span", {
        style: {
          color: this.mainColor
        }
      }, " click"))), /*#__PURE__*/_react.default.createElement(_Grid.default, {
        item: true,
        style: {
          padding: "20px 40px"
        }
      }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
        style: {
          width: "58%",
          margin: "0 auto",
          fontFamily: snetFont,
          fontVariantCaps: "normal",
          textTransform: "initial",
          fontSize: 12,
          color: "#9b9b9b",
          textAlign: "center",
          padding: spacingUnit
        }
      }, "(Image must be under ", this.props.maxImageSize / 1000000, "mb. Source images are not saved on the servers after the job is processed.)"))))));
    }
    /* --------------------
         - URL IMAGE SEARCH -
      *  --------------------*/

  }, {
    key: "toDataUrl",
    value: function toDataUrl(src) {
      var filename = src.substring(src.lastIndexOf("/") + 1);
      var img = new Image();
      var callback = this.verifyAndUpload;
      var dataURL; // Only triggered if returnByteArray === true

      var byteReader = new FileReader();

      byteReader.onloadend = function () {
        this.setState({
          byteReader: byteReader
        });
        this.verifyAndUpload(dataURL, new Uint8Array(this.state.byteReader.result), "byteArray", this.props.outputFormat, filename);
      }.bind(this);

      img.crossOrigin = "anonymous";

      img.onerror = function () {
        this.displayErrorMessage(this.urlErrorMessage);
      }.bind(this);

      if (this.props.returnByteArray) {
        img.outputFormat = this.props.outputFormat; // intentionally added prop to img tag to access it later

        img.onload = function () {
          var canvas = document.createElement("canvas"),
              context = canvas.getContext("2d");
          canvas.height = this.naturalHeight;
          canvas.width = this.naturalWidth;
          context.drawImage(this, 0, 0);
          dataURL = canvas.toDataURL(this.outputFormat);
          canvas.toBlob(function (blob) {
            byteReader.readAsArrayBuffer(blob);
          }, this.outputFormat);
        };
      } else {
        img.onload = function () {
          var canvas = document.createElement("canvas"),
              context = canvas.getContext("2d");
          var dataURL;
          canvas.height = this.naturalHeight;
          canvas.width = this.naturalWidth;
          context.drawImage(this, 0, 0);
          dataURL = canvas.toDataURL(this.outputFormat);
          callback(dataURL, dataURL.split(",")[1], "base64", this.outputFormat, filename);
        };
      }

      img.src = src;
    }
  }, {
    key: "searchTextUpdate",
    value: function searchTextUpdate(event) {
      this.setState({
        searchText: event.target.value
      }, this.props.instantUrlFetch ? this.handleSearchSubmit : null);
    }
  }, {
    key: "handleSearchSubmit",
    value: function handleSearchSubmit() {
      var image = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      this.setLoadingState();
      var url;

      if (image) {
        // Gallery mode
        url = image.url;
      } else {
        // URL mode
        if (this.state.searchText !== null) {
          url = this.state.searchText;
        } else {
          return;
        }
      } // Directly sends data URL if allowed. Else, tries to convert image to base64


      this.props.allowURL ? this.verifyAndUpload(url, url, "url", null, url.substring(url.lastIndexOf("/") + 1)) : this.toDataUrl(url, this.props.outputFormat);
    }
  }, {
    key: "renderUrlTab",
    value: function renderUrlTab() {
      var _this6 = this;

      return /*#__PURE__*/_react.default.createElement(_Grid.default, {
        container: true,
        direction: "row",
        justify: "center",
        alignItems: "center",
        style: {
          height: this.tabHeight + "px",
          borderWidth: 1,
          borderColor: "#d6d6d6",
          borderStyle: "dashed",
          borderRadius: 4,
          cursor: "pointer",
          overflow: "hidden"
        }
      }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
        item: true,
        xs: 12,
        style: {
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }
      }, /*#__PURE__*/_react.default.createElement(_styles.MuiThemeProvider, {
        theme: this.theme
      }, /*#__PURE__*/_react.default.createElement(_TextField.default, {
        style: {
          width: "80%",
          primary: this.mainColor,
          textAlign: "left"
        },
        variant: "outlined",
        type: "text",
        label: /*#__PURE__*/_react.default.createElement("span", {
          style: {
            fontWeight: "normal",
            fontSize: 12
          }
        }, "Image URL"),
        onChange: this.searchTextUpdate,
        InputProps: {
          endAdornment: /*#__PURE__*/_react.default.createElement(_InputAdornment.default, {
            position: "end"
          }, /*#__PURE__*/_react.default.createElement(_IconButton.default, {
            style: {
              marginRight: 0,
              padding: 0,
              color: this.mainColor
            },
            onClick: this.state.searchText !== null ? function () {
              return _this6.handleSearchSubmit(null);
            } : undefined
          }, /*#__PURE__*/_react.default.createElement(_Search.default, null)))
        }
      }))));
    }
    /* -----------------
         - IMAGE GALLERY -
      *  -----------------*/

  }, {
    key: "renderGalleryTab",
    value: function renderGalleryTab() {
      var _this7 = this;

      return /*#__PURE__*/_react.default.createElement("div", {
        style: {
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          overflow: "hidden"
        }
      }, /*#__PURE__*/_react.default.createElement(_GridList.default, {
        cols: this.props.galleryCols,
        spacing: spacingUnit,
        style: {
          width: "100%",
          height: this.tabHeight + "px"
        }
      }, this.props.imageGallery.map(function (url, i) {
        return /*#__PURE__*/_react.default.createElement(_Grow.default, {
          in: _this7.state.value === 2,
          style: {
            transformOrigin: "0 0 0"
          },
          timeout: i * 500,
          key: i
        }, /*#__PURE__*/_react.default.createElement(_GridListTile.default, {
          key: i
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: url,
          alt: "Gallery Image " + i,
          onClick: function onClick() {
            return _this7.handleSearchSubmit({
              url: url
            });
          }
        })));
      })));
    }
    /* -----------------
         - LOADING STATE -
      *  -----------------*/

  }, {
    key: "renderLoadingState",
    value: function renderLoadingState() {
      return /*#__PURE__*/_react.default.createElement("div", {
        style: this.tabStyle
      }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
        container: true,
        direction: "row",
        justify: "center",
        alignItems: "center",
        style: {
          flexGrow: 1,
          height: this.tabHeight + "px"
        }
      }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
        item: true,
        xs: 12,
        style: {
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }
      }, /*#__PURE__*/_react.default.createElement(_Fade.default, {
        in: this.state.mainState === "loading",
        unmountOnExit: true
      }, /*#__PURE__*/_react.default.createElement(_CircularProgress.default, {
        style: {
          color: this.mainColor,
          margin: 10
        }
      })))));
    }
    /* ------------------
         - UPLOADED STATE -
      *  ------------------*/

  }, {
    key: "handleImageReset",
    value: function handleImageReset() {
      var _this8 = this;

      this.setState({
        mainState: "initial",
        // initial, search, gallery, loading, uploaded, error
        searchText: null,
        inputImageData: null,
        mimeType: null,
        encoding: null,
        filename: null,
        displayError: false,
        errorMessage: null,
        displayImageName: false
      }, function () {
        return _this8.sendData(_this8.state.inputImageData);
      });
    }
  }, {
    key: "renderUploadedState",
    value: function renderUploadedState() {
      var _this9 = this;

      return /*#__PURE__*/_react.default.createElement(_Fade.default, {
        in: this.state.mainState === "uploaded"
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          position: "relative",
          overflow: "hidden",
          padding: spacingUnit,
          height: this.tabHeight + "px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around"
        },
        onMouseOver: function onMouseOver() {
          return _this9.setState({
            displayImageName: true
          });
        },
        onMouseLeave: function onMouseLeave() {
          return _this9.setState({
            displayImageName: false
          });
        }
      }, /*#__PURE__*/_react.default.createElement("img", {
        alt: "Service input",
        src: this.state.inputImageData,
        onError: function onError() {
          return _this9.displayErrorMessage(_this9.urlErrorMessage);
        },
        id: "loadedImage",
        ref: this.uploadedStateImg // crossOrigin="anonymous"
        ,
        style: this.props.displayProportionalImage ? {
          maxHeight: this.tabHeight + "px",
          maxWidth: "100%"
        } : {
          height: this.tabHeight + "px",
          width: "100%"
        }
      }), /*#__PURE__*/_react.default.createElement(_Fade.default, {
        in: this.state.displayImageName
      }, /*#__PURE__*/_react.default.createElement(_GridListTileBar.default, {
        title: /*#__PURE__*/_react.default.createElement(_Typography.default, {
          style: {
            display: "flex",
            justifyContent: "center",
            fontFamily: snetFont,
            fontVariantCaps: "normal",
            textTransform: "initial",
            color: snetBackgroundGrey,
            fontSize: 14
          }
        }, " ", this.state.filename, " ")
      }))));
    }
    /* -----------------
         - INITIAL STATE -
      *  -----------------*/

  }, {
    key: "handleTabChange",
    value: function handleTabChange(_event, value) {
      this.setState({
        value: value
      });
    }
  }, {
    key: "renderTabs",
    value: function renderTabs() {
      var _this10 = this;

      return /*#__PURE__*/_react.default.createElement("div", {
        style: this.tabStyle
      }, /*#__PURE__*/_react.default.createElement(_reactSwipeableViews.default, {
        axis: "x",
        index: this.state.value
      }, /*#__PURE__*/_react.default.createElement("div", null, this.renderUploadTab()), /*#__PURE__*/_react.default.createElement("div", null, this.renderUrlTab()), /*#__PURE__*/_react.default.createElement("div", null, this.renderGalleryTab()), /*#__PURE__*/_react.default.createElement("div", null, this.state.mainState === "display" && !this.props.disableInputTab && this.renderInputImage()), /*#__PURE__*/_react.default.createElement("div", null, this.state.mainState === "display" && !this.props.disableOutputTab && this.renderOutputImage()), /*#__PURE__*/_react.default.createElement("div", null, this.state.mainState === "display" && !this.props.disableComparisonTab && this.renderComparison())), /*#__PURE__*/_react.default.createElement(_ClickAwayListener.default, {
        onClickAway: function onClickAway() {
          return _this10.setState({
            displayError: false
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_Snackbar.default, {
        style: {
          position: "absolute",
          width: "100%"
        },
        open: this.state.displayError,
        autoHideDuration: 5000,
        TransitionComponent: _Slide.default,
        transitionDuration: 300,
        onClose: function onClose() {
          return _this10.setState({
            displayError: false
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_SnackbarContent.default, {
        style: {
          backgroundColor: snetBackgroundRed,
          margin: "2px",
          border: "2px solid",
          borderColor: snetRed,
          borderRadius: "4px",
          padding: "2px",
          display: "flex",
          justifyContent: "space-around",
          flexGrow: 1,
          width: "100%"
        },
        "aria-describedby": "client-snackbar",
        message: /*#__PURE__*/_react.default.createElement("span", {
          style: {
            color: snetGreyError,
            display: "flex",
            alignItems: "center",
            align: "center",
            justifyContent: "space-between"
          }
        }, /*#__PURE__*/_react.default.createElement(_Error.default, {
          style: {
            fontSize: 16,
            opacity: 0.9,
            marginRight: spacingUnit
          }
        }), /*#__PURE__*/_react.default.createElement(_Typography.default, {
          style: {
            fontFamily: snetFont,
            fontVariantCaps: "normal",
            textTransform: "initial",
            color: snetGrey,
            fontSize: 14
          }
        }, this.state.errorMessage))
      }))));
    }
    /* -----------------
         - DISPLAY STATE -
      *  -----------------*/

  }, {
    key: "renderInputImage",
    value: function renderInputImage() {
      var _this11 = this;

      return /*#__PURE__*/_react.default.createElement(_Fade.default, {
        in: this.state.mainState === "display"
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          position: "relative",
          overflow: "hidden",
          padding: spacingUnit,
          height: this.tabHeight + "px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around"
        },
        onMouseOver: function onMouseOver() {
          return _this11.setState({
            displayImageName: true
          });
        },
        onMouseLeave: function onMouseLeave() {
          return _this11.setState({
            displayImageName: false
          });
        }
      }, /*#__PURE__*/_react.default.createElement("img", {
        alt: "Service input",
        src: this.state.inputImageData,
        onError: function onError() {
          return _this11.displayErrorMessage(_this11.inputImageErrorMessage, "display");
        },
        id: "loadedImage" // crossOrigin="anonymous"
        ,
        style: this.props.displayProportionalImage ? {
          maxHeight: this.tabHeight + "px",
          maxWidth: "100%"
        } : {
          height: this.tabHeight + "px",
          width: "100%"
        }
      }), /*#__PURE__*/_react.default.createElement(_Fade.default, {
        in: this.state.displayImageName
      }, /*#__PURE__*/_react.default.createElement(_GridListTileBar.default, {
        style: {},
        title: /*#__PURE__*/_react.default.createElement(_Typography.default, {
          style: {
            display: "flex",
            justifyContent: "center",
            alignText: "center",
            fontFamily: snetFont,
            fontVariantCaps: "normal",
            textTransform: "initial",
            color: snetBackgroundGrey,
            fontSize: 14
          }
        }, " ", this.state.filename, " ")
      }))));
    }
  }, {
    key: "renderOutputImage",
    value: function renderOutputImage() {
      var _this12 = this;

      return /*#__PURE__*/_react.default.createElement(_Fade.default, {
        in: this.state.mainState === "display"
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          position: "relative",
          overflow: "hidden",
          padding: spacingUnit,
          height: this.tabHeight + "px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around"
        },
        onMouseOver: function onMouseOver() {
          return _this12.setState({
            displayImageName: true
          });
        },
        onMouseLeave: function onMouseLeave() {
          return _this12.setState({
            displayImageName: false
          });
        }
      }, /*#__PURE__*/_react.default.createElement("img", {
        alt: "Service output",
        src: this.state.outputImage,
        onError: function onError() {
          return _this12.displayErrorMessage(_this12.outputImageErrorMessage, "display");
        },
        id: "loadedImage" // crossOrigin="anonymous"
        ,
        style: this.props.displayProportionalImage ? {
          maxHeight: this.tabHeight + "px",
          maxWidth: "100%"
        } : {
          height: this.tabHeight + "px",
          width: "100%"
        }
      }), this.state.outputImageName !== null ? /*#__PURE__*/_react.default.createElement(_Fade.default, {
        in: this.state.displayImageName
      }, /*#__PURE__*/_react.default.createElement(_GridListTileBar.default, {
        style: {},
        title: /*#__PURE__*/_react.default.createElement(_Typography.default, {
          style: {
            display: "flex",
            justifyContent: "center",
            alignText: "center",
            fontFamily: snetFont,
            fontVariantCaps: "normal",
            textTransform: "initial",
            color: snetBackgroundGrey,
            fontSize: 14
          }
        }, " ", this.state.outputImageName, " ")
      })) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null)));
    }
  }, {
    key: "handleMouseMove",
    value: function handleMouseMove(event) {
      var offsetLeft = this.imageDiv.current.getBoundingClientRect().left;
      var offsetImageLeft = this.outputImage.current.getBoundingClientRect().left;
      this.setState({
        imageXPosition: event.clientX - offsetImageLeft,
        dividerXPosition: event.clientX - offsetLeft
      });
    }
  }, {
    key: "setInputImageDimensions",
    value: function setInputImageDimensions() {
      this.setState({
        inputImageHeight: this.inputImage.current.clientHeight,
        inputImageWidth: this.inputImage.current.clientWidth
      });
    }
  }, {
    key: "setInitialImageXPosition",
    value: function setInitialImageXPosition() {
      this.setState({
        imageXPosition: this.outputImage.current.clientWidth / 2
      });
    }
  }, {
    key: "renderComparison",
    value: function renderComparison() {
      return /*#__PURE__*/_react.default.createElement(_Fade.default, {
        in: this.state.mainState === "display"
      }, /*#__PURE__*/_react.default.createElement("div", {
        ref: this.imageDiv,
        id: "imageDiv",
        style: {
          position: "relative",
          overflow: "hidden",
          padding: spacingUnit,
          width: "100%",
          height: this.tabHeight + "px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "ew-resize"
        },
        onMouseMove: this.handleMouseMove
      }, /*#__PURE__*/_react.default.createElement("img", {
        ref: this.inputImage,
        style: this.props.displayProportionalImage ? {
          maxHeight: this.tabHeight + "px",
          maxWidth: "100%",
          align: "center",
          position: "relative"
        } : {
          height: this.tabHeight + "px",
          width: "100%",
          align: "center",
          position: "relative"
        },
        alt: "Service response...",
        src: this.state.inputImageData,
        onLoad: this.setInputImageDimensions
      }), /*#__PURE__*/_react.default.createElement("img", {
        ref: this.outputImage,
        style: this.props.displayProportionalImage ? {
          maxHeight: this.tabHeight + "px",
          maxWidth: "100%",
          align: "center",
          position: "absolute",
          clip: "rect(0px," + this.state.imageXPosition + "px,10000px,0px)"
        } : {
          height: this.tabHeight + "px",
          width: "100%",
          align: "center",
          position: "absolute",
          clip: "rect(0px," + this.state.imageXPosition + "px,10000px,0px)"
        },
        onLoad: this.setInitialImageXPosition,
        height: this.props.overlayInputImage && this.state.inputImageHeight,
        width: this.props.overlayInputImage && this.state.inputImageWidth,
        alt: "Service response...",
        src: this.state.outputImage
      }), /*#__PURE__*/_react.default.createElement("div", {
        style: {
          position: "absolute",
          left: this.state.dividerXPosition - 1.5 + "px",
          borderLeft: "3px solid white",
          height: this.tabHeight
        }
      }), /*#__PURE__*/_react.default.createElement("div", {
        style: {
          position: "absolute",
          left: this.state.dividerXPosition - 15 + "px",
          top: this.tabHeight / 2 - 15 + "px",
          width: "30px",
          height: "30px",
          borderRadius: "15px",
          backgroundColor: "white"
        }
      }), /*#__PURE__*/_react.default.createElement(_UnfoldMore.default, {
        style: {
          color: this.mainColor,
          width: "30px",
          height: "30px",
          position: "absolute",
          left: this.state.dividerXPosition - 15 + "px",
          top: this.tabHeight / 2 - 15 + "px",
          transform: "rotate(90deg)"
        }
      })));
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement("div", {
        style: {
          minHeight: "264px",
          position: "relative"
        }
      }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
        container: true,
        direction: "row",
        justify: "flex-start",
        alignItems: "center",
        style: {
          color: "black",
          backgroundColor: "white"
        },
        spacing: 0
      }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
        item: true,
        xs: 12
      }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
        container: true,
        direction: "row",
        alignItems: "flex-end",
        justify: "space-around",
        style: {
          paddingBottom: 5
        }
      }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
        item: true,
        xs: 4
      }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
        color: "inherit",
        noWrap: true,
        variant: "h6",
        style: {
          fontSize: 18,
          fontFamily: snetFont,
          padding: spacingUnit / 2
        }
      }, this.state.mainState === "display" ? this.props.displayModeTitle : this.props.imageName)), /*#__PURE__*/_react.default.createElement(_Grid.default, {
        item: true,
        xs: 6
      }, /*#__PURE__*/_react.default.createElement(_styles.MuiThemeProvider, {
        theme: this.theme
      }, /*#__PURE__*/_react.default.createElement(_Tabs.default, {
        value: this.state.value,
        onChange: this.handleTabChange,
        indicatorColor: "primary",
        textColor: "primary",
        variant: "fullWidth",
        style: {
          color: snetGrey
        },
        TabIndicatorProps: {
          style: {
            bottom: 8,
            backgroundColor: "#4086ff"
          }
        }
      }, this.state.mainState !== "uploaded" && !(this.state.mainState === "display") && !this.props.disableUploadTab && /*#__PURE__*/_react.default.createElement(_Tab.default, {
        style: {
          marginRight: "0",
          minWidth: "fit-content",
          paddingBottom: 0,
          flexGrow: 0,
          flexBasis: 0,
          paddingLeft: 10
        },
        value: 0,
        label: /*#__PURE__*/_react.default.createElement("span", {
          style: this.tabLabelStyle
        }, "Upload")
      }), this.state.mainState !== "uploaded" && !(this.state.mainState === "display") && !this.props.disableUrlTab && /*#__PURE__*/_react.default.createElement(_Tab.default, {
        style: {
          marginRight: "0",
          minWidth: "fit-content",
          paddingBottom: 0,
          flexGrow: 0,
          flexBasis: 0,
          paddingLeft: 10
        },
        value: 1,
        label: /*#__PURE__*/_react.default.createElement("span", {
          style: this.tabLabelStyle
        }, "URL")
      }), this.state.mainState !== "uploaded" && !(this.state.mainState === "display") && this.props.imageGallery.length > 0 && /*#__PURE__*/_react.default.createElement(_Tab.default, {
        style: {
          marginRight: "0",
          minWidth: "fit-content",
          paddingBottom: 0,
          flexGrow: 0,
          flexBasis: 0,
          paddingLeft: 10
        },
        value: 2,
        label: /*#__PURE__*/_react.default.createElement("span", {
          style: this.tabLabelStyle
        }, "Gallery")
      }), this.state.mainState === "display" && !this.props.disableInputTab && /*#__PURE__*/_react.default.createElement(_Tab.default, {
        style: {
          marginRight: "0",
          minWidth: "fit-content",
          paddingBottom: 0,
          flexGrow: 0,
          flexBasis: 0
        },
        value: 3,
        label: /*#__PURE__*/_react.default.createElement("span", {
          style: this.tabLabelStyle
        }, this.props.inputTabTitle)
      }), this.state.mainState === "display" && !this.props.disableOutputTab && /*#__PURE__*/_react.default.createElement(_Tab.default, {
        style: {
          minWidth: "5%"
        },
        value: 4,
        label: /*#__PURE__*/_react.default.createElement("span", {
          style: this.tabLabelStyle
        }, this.props.outputTabTitle)
      }), this.state.mainState === "display" && !this.props.disableComparisonTab && /*#__PURE__*/_react.default.createElement(_Tab.default, {
        style: {
          minWidth: "5%"
        },
        value: 5,
        label: /*#__PURE__*/_react.default.createElement("span", {
          style: this.tabLabelStyle
        }, this.props.comparisonTabTitle)
      })))), /*#__PURE__*/_react.default.createElement(_Grid.default, {
        item: true,
        xs: 1,
        style: {
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }
      }, this.props.infoTip.length > 0 && /*#__PURE__*/_react.default.createElement(_core.Tooltip, {
        title: /*#__PURE__*/_react.default.createElement(_Typography.default, {
          style: {
            fontFamily: snetFont,
            fontSize: 12,
            color: "white"
          }
        }, this.props.infoTip)
      }, /*#__PURE__*/_react.default.createElement(_Info.default, {
        style: {
          fontSize: 20,
          color: snetGrey
        }
      }))), /*#__PURE__*/_react.default.createElement(_Grid.default, {
        item: true,
        xs: 1,
        style: {
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }
      }, this.state.mainState === "uploaded" && !this.props.disableResetButton && /*#__PURE__*/_react.default.createElement(_Fade.default, {
        in: this.state.mainState === "uploaded"
      }, /*#__PURE__*/_react.default.createElement(_core.Tooltip, {
        title: /*#__PURE__*/_react.default.createElement(_Typography.default, {
          style: {
            fontFamily: snetFont,
            fontSize: 12,
            color: "white"
          }
        }, "Click to reset!")
      }, /*#__PURE__*/_react.default.createElement(_IconButton.default, {
        onClick: this.handleImageReset.bind(this)
      }, /*#__PURE__*/_react.default.createElement(_Refresh.default, {
        style: {
          fontSize: 20,
          color: this.mainColor
        }
      })))), this.state.mainState === "display" && !this.props.disableDownloadButton && /*#__PURE__*/_react.default.createElement(_Fade.default, {
        in: this.state.mainState === "display"
      }, /*#__PURE__*/_react.default.createElement(_core.Tooltip, {
        title: /*#__PURE__*/_react.default.createElement(_Typography.default, {
          style: {
            fontFamily: snetFont,
            fontSize: 12,
            color: "white"
          }
        }, "Download output image")
      }, /*#__PURE__*/_react.default.createElement("a", {
        href: this.state.outputImage,
        download: this.state.outputImageName
      }, /*#__PURE__*/_react.default.createElement(_IconButton.default, null, /*#__PURE__*/_react.default.createElement(_CloudDownload.default, {
        style: {
          fontSize: 20,
          color: this.mainColor
        }
      })))))))), /*#__PURE__*/_react.default.createElement(_Grid.default, {
        item: true,
        xs: 12,
        style: {
          backgroundColor: snetBackgroundGrey
        }
      }, (this.state.mainState === "initial" || this.state.mainState === "display") && this.renderTabs() || this.state.mainState === "loading" && this.renderLoadingState() || this.state.mainState === "uploaded" && this.renderUploadedState())));
    }
  }]);

  return SNETImageUpload;
}(_react.default.Component);

exports.default = SNETImageUpload;
SNETImageUpload.propTypes = {
  width: _propTypes.default.string,
  // e.g.: "500px", "50%" (of parent component width)
  tabHeight: _propTypes.default.number,
  // a number without units
  imageDataFunc: _propTypes.default.func.isRequired,
  imageName: _propTypes.default.string,
  disableUploadTab: _propTypes.default.bool,
  // If true disables upload tab
  disableUrlTab: _propTypes.default.bool,
  // If true disables url tab
  disableResetButton: _propTypes.default.bool,
  // If true disables image reset button
  returnByteArray: _propTypes.default.bool,
  // whether to return base64 or byteArray image data
  outputFormat: _propTypes.default.oneOf(["image/png", "image/jpg", "image/jpeg"]),
  allowedInputTypes: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.array]),
  maxImageSize: _propTypes.default.number,
  // 10 mb
  maxImageWidth: _propTypes.default.number,
  maxImageHeight: _propTypes.default.number,
  displayProportionalImage: _propTypes.default.bool,
  allowURL: _propTypes.default.bool,
  instantUrlFetch: _propTypes.default.bool,
  imageGallery: _propTypes.default.arrayOf(_propTypes.default.string),
  galleryCols: _propTypes.default.number,
  infoTip: _propTypes.default.string,
  mainColor: _propTypes.default.object,
  // Output mode props
  displayModeTitle: _propTypes.default.string,
  outputImage: _propTypes.default.string,
  outputImageMimeType: _propTypes.default.oneOf(["application/octet-stream", "image/png", "image/jpg", "image/jpeg", "image/gif"]),
  outputImageType: _propTypes.default.oneOf(["url", "base64"]),
  outputImageName: _propTypes.default.string,
  disableInputTab: _propTypes.default.bool,
  disableOutputTab: _propTypes.default.bool,
  disableComparisonTab: _propTypes.default.bool,
  disableDownloadButton: _propTypes.default.bool,
  overlayInputImage: _propTypes.default.bool,
  inputTabTitle: _propTypes.default.string,
  outputTabTitle: _propTypes.default.string,
  comparisonTabTitle: _propTypes.default.string
};
SNETImageUpload.defaultProps = {
  tabHeight: 300,
  imageName: "Content Image",
  disableUploadTab: false,
  // If true disables upload tab
  disableUrlTab: false,
  // If true disables url tab
  disableResetButton: false,
  returnByteArray: false,
  outputFormat: "image/png",
  allowedInputTypes: ["image/png", "image/jpeg", "image/jpg"],
  maxImageSize: 10000000,
  // 10 mb
  maxImageWidth: null,
  maxImageHeight: null,
  displayProportionalImage: true,
  // if true, keeps uploaded image proportions. Else stretches it
  allowURL: false,
  // sends image URL instead of image data for both URL and Gallery modes. Might still send base64 if the user uploads an image
  instantUrlFetch: false,
  imageGallery: [],
  galleryCols: 3,
  infoTip: "",
  mainColor: _colors.blue,
  // Output mode props
  displayModeTitle: "Result",
  outputImage: "",
  outputImageMimeType: undefined,
  outputImageName: "service-output",
  disableInputTab: false,
  disableOutputTab: false,
  disableComparisonTab: false,
  disableDownloadButton: false,
  overlayInputImage: true,
  inputTabTitle: "Input",
  outputTabTitle: "Output",
  comparisonTabTitle: "Comparison"
};