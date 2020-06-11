"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _withLiveEditScope = _interopRequireDefault(require("storybook-addon-react-live-edit/dist/withLiveEditScope"));

var _ = _interopRequireDefault(require("./"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sampleJson = {
  allowed_user_flag: true,
  allowed_user_addresses: ["0x164096A3878DEd9C2A30c85D9c4b713d5305Ab10", "0x7DF35C98f41F3Af0df1dc4c7F7D4C19a71Dd059F"],
  authentication_addresses: ["0x164096A3878DEd9C2A30c85D9c4b713d5305Ab10"],
  blockchain_enabled: false,
  passthrough_enabled: true,
  organization_id: "anand_28apr",
  service_id: "anand_28apr"
};
(0, _react2.storiesOf)("Addons|JSON to Ul", module).addDecorator((0, _withLiveEditScope.default)({
  React: _react.default,
  JSONtoUl: _.default,
  sampleJson: sampleJson
})).addLiveSource("live source", "return <div>{JSONtoUl(sampleJson)}</div> ");