"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _withLiveEditScope = _interopRequireDefault(require("storybook-addon-react-live-edit/dist/withLiveEditScope"));

var _ = _interopRequireDefault(require("./"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react2.storiesOf)("SNETPagination", module).addParameters({
  props: {
    propTables: [_.default]
  }
}).addDecorator((0, _withLiveEditScope.default)({
  React: _react.default,
  SNETPagination: _.default
})).addLiveSource("live source", "return   <SNETPagination limit={10}\n                offset={10}\n                totalCount={100}\n                itemsPerPageOptions={[{value:10, label:\"Ten\"}, {value:20, label:\"Twenty\"}, {value:30, label:\"Thirty\"}]}\n                itemsPerPage={10}\n                onItemsPerPageChange={console.log}\n                onPageChange={console.log}\n              />");