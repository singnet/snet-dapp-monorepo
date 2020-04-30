"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _withLiveEditScope = _interopRequireDefault(require("storybook-addon-react-live-edit/dist/withLiveEditScope"));

var _ = _interopRequireDefault(require("."));

var _Function = _interopRequireDefault(require("./Function"));

var _Key = _interopRequireDefault(require("./Key"));

var _ValueString = _interopRequireDefault(require("./ValueString"));

var _ValueNumber = _interopRequireDefault(require("./ValueNumber"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react2.storiesOf)("Code Snippet | Snippet", module).addParameters({
  props: {
    propTables: [_.default]
  }
}).addDecorator((0, _withLiveEditScope.default)({
  React: _react.default,
  CodeSnippet: _.default,
  Function: _Function.default,
  Key: _Key.default,
  ValueNumber: _ValueNumber.default,
  ValueString: _ValueString.default
})).addLiveSource("live source", "return (\n    \t<CodeSnippet> \n          const <Function text=\"acitveWallets\" />  = () => [\n          <br />\n          {\"{\"}\"<Key text=\"address\" />\":\"<ValueString text=\"1aa5cmqmvQq8YQTEqcTmW7dfBNuFwgdCD\" />\"{\"}\"}\n          <br />\n          {\"{\"}\"<Key text=\"balance\" />\":\"<ValueNumber number=\"0.005\" />\"{\"}\"},\n    \t  <br />\n   \t\t  {\"{\"}\"<Key text=\"address\" />\":\"<ValueString text=\"bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq\" />\"{\"}\"}\n          <br />\n          {\"{\"}\"<Key text=\"balance\" />\":\"<ValueNumber number=\"2.325\" />\"{\"}\"},\n    \t  <br />\n          ]\n      </CodeSnippet>\n     )");