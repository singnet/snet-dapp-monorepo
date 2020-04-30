"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _withLiveEditScope = _interopRequireDefault(require("storybook-addon-react-live-edit/dist/withLiveEditScope"));

var _reactRouterDom = require("react-router-dom");

var _ = _interopRequireDefault(require("./"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react2.storiesOf)("Auth|SNETForgotPassword", module).addParameters({
  props: {
    propTables: [_.default]
  }
}).addDecorator((0, _withLiveEditScope.default)({
  React: _react.default,
  SNETForgotPassword: _.default,
  ReactRouter: _reactRouterDom.BrowserRouter
})).addLiveSource("live source", "return   <ReactRouter>\n                <SNETForgotPassword \n                   title=\"SingularityNet\"\n                   email=\"someone@somewhere.com\"\n                   forgotPasswordError=\"error goes here\"\n                   onSubmit={console.log}/>  \n              </ReactRouter>");