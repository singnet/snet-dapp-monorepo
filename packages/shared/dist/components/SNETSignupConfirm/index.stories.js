"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _withLiveEditScope = _interopRequireDefault(require("storybook-addon-react-live-edit/dist/withLiveEditScope"));

var _reactRouterDom = require("react-router-dom");

var _ = _interopRequireDefault(require("./"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react2.storiesOf)("Auth|SNETSignupConfirm", module).addParameters({
  props: {
    propTables: [_.default]
  }
}).addDecorator((0, _withLiveEditScope.default)({
  React: _react.default,
  SNETSignupConfirm: _.default,
  ReactRouter: _reactRouterDom.BrowserRouter
})).addLiveSource("live source", "return   <ReactRouter>\n                <SNETSignupConfirm \n                  info={{\n                    title:\"SingularityNet\",\n                    description:\"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem \" +\n                     \"Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer \" +\n                     \"took a galley of type and scrambled it to make a type specimen book. It has survived not only \" +\n                     \"five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. \" +\n                     \"It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum \" +\n                     \"passages, and more recently with desktop publishing software like Aldus PageMaker including \" +\n                     \"versions of Lorem Ipsum.\",\n                   }}\n                   onResendOtp={console.log}\n                   signupAlert={{}}\n                   onSubmit={console.log}/>  \n              </ReactRouter>");