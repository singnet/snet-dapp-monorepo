"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initSDK = void 0;

var _snetSdkWeb = _interopRequireDefault(require("snet-sdk-web"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_GAS_LIMIT = undefined;
var DEFAULT_GAS_PRICE = undefined;
var ON_ACCOUNT_CHANGE = "accountsChanged";
var ON_NETWORK_CHANGE = "networkChanged";

var initSDK = function initSDK() {
  var sdk, web3Provider, updateSDK, hasEth, hasWeb3, accounts;
  return regeneratorRuntime.async(function initSDK$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          updateSDK = function updateSDK() {
            var networkId = web3Provider.networkVersion;
            var config = {
              networkId: networkId,
              web3Provider: web3Provider,
              defaultGasLimit: DEFAULT_GAS_LIMIT,
              defaultGasPrice: DEFAULT_GAS_PRICE
            };
            sdk = new _snetSdkWeb.default(config);
          };

          hasEth = typeof window.ethereum !== "undefined";
          hasWeb3 = typeof window.web3 !== "undefined";
          _context.prev = 3;

          if (!(hasEth && hasWeb3)) {
            _context.next = 14;
            break;
          }

          web3Provider = window.ethereum;
          _context.next = 8;
          return regeneratorRuntime.awrap(web3Provider.enable());

        case 8:
          accounts = _context.sent;
          window.web3.eth.defaultAccount = accounts[0];
          web3Provider.addListener(ON_ACCOUNT_CHANGE, function (accounts) {
            var event = new CustomEvent("snetMMAccountChanged", {
              detail: {
                address: accounts[0]
              }
            });
            window.dispatchEvent(event);
          });
          web3Provider.addListener(ON_NETWORK_CHANGE, function (network) {
            var event = new CustomEvent("snetMMNetworkChanged", {
              detail: {
                network: network
              }
            });
            window.dispatchEvent(event);
          });
          updateSDK();
          return _context.abrupt("return", sdk);

        case 14:
          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](3);
          throw _context.t0;

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 16]]);
};

exports.initSDK = initSDK;