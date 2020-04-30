"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _ = _interopRequireDefault(require("./"));

var _withLiveEditScope = _interopRequireDefault(require("storybook-addon-react-live-edit/dist/withLiveEditScope"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react2.storiesOf)("Alerts|AlertBox", module).addParameters({
  props: {
    propTables: [_.default]
  }
}).addDecorator((0, _withLiveEditScope.default)({
  React: _react.default,
  AlertBox: _.default
})).addLiveSource("live source", "return <AlertBox type=\"error\" message=\"Error\" />");