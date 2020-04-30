"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _withLiveEditScope = _interopRequireDefault(require("storybook-addon-react-live-edit/dist/withLiveEditScope"));

var _ = _interopRequireDefault(require("./"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react2.storiesOf)("Form|SNETTextarea", module).addParameters({
  props: {
    propTables: [_.default]
  }
}).addDecorator((0, _withLiveEditScope.default)({
  React: _react.default,
  SNETTextarea: _.default
})).addLiveSource("live source", "return <SNETTextarea \n              label=\"label\" \n              rowCount={6}\n              colCount={6}\n              name=\"name\"\n              onChange={console.log}\n              minCount={12}\n              maxCount={12}\n />");