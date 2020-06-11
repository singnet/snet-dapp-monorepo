"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _withLiveEditScope = _interopRequireDefault(require("storybook-addon-react-live-edit/dist/withLiveEditScope"));

var _ = _interopRequireDefault(require("./"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sampleList = ["completed", "active", "idle"];
(0, _react2.storiesOf)("Addons|PrettyPrintJson", module).addParameters({
  props: {
    propTables: [_.default]
  }
}).addDecorator((0, _withLiveEditScope.default)({
  React: _react.default,
  PrettyPrintJson: _.default,
  sampleList: sampleList
})).addLiveSource("live source", "return <PrettyPrintJson \n            data={\n              {\"menu\": {\n                 \"id\": \"file\",\n                 \"value\": \"File\",\n                 \"popup\": {\n                  \"menuitem\": [\n                    {\"value\": \"New\", \"onclick\": \"CreateNewDoc()\"},\n                    {\"value\": \"Open\", \"onclick\": \"OpenDoc()\"},\n                    {\"value\": \"Close\", \"onclick\": \"CloseDoc()\"}\n                   ]\n              }}}\n            } \n     />");