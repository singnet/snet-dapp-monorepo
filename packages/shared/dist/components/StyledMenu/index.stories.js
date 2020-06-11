"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _withLiveEditScope = _interopRequireDefault(require("storybook-addon-react-live-edit/dist/withLiveEditScope"));

var _ = _interopRequireDefault(require("./"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sampleList = [{
  label: "Sample Same tab",
  link: "https://github.com/singnet",
  newTab: false
}, {
  label: "Sample New tab",
  link: "https://telegram.me/singularitynet",
  newTab: true
}];
(0, _react2.storiesOf)("StyledMenu", module).addParameters({
  props: {
    propTables: [_.default]
  }
}).addDecorator((0, _withLiveEditScope.default)({
  React: _react.default,
  StyledMenu: _.default,
  sampleList: sampleList
})).addLiveSource("live source", "return <StyledMenu label=\"Button Label\" list={sampleList} />");