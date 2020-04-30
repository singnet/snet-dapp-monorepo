"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _withLiveEditScope = _interopRequireDefault(require("storybook-addon-react-live-edit/dist/withLiveEditScope"));

var _ = _interopRequireDefault(require("./"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sampleList = [{
  label: "Sample tab 1",
  link: "https://github.com/singnet",
  newTab: false
}, {
  label: "Sample tab 2",
  link: "https://telegram.me/singularitynet",
  newTab: true
}];
(0, _react2.storiesOf)("StyledDropdown", module).addParameters({
  props: {
    propTables: [_.default]
  }
}).addDecorator((0, _withLiveEditScope.default)({
  React: _react.default,
  StyledDropdown: _.default,
  sampleList: sampleList
})).addLiveSource("live source", "return <StyledDropdown labelTxt=\"Label Name\" list={sampleList} inputLabel=\"Input Label\" />");