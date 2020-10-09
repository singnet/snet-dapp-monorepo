"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initSDK = exports.ethereumMethods = void 0;

var _snetSdkWeb = _interopRequireDefault(require("snet-sdk-web"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ethereumMethods = {
  REQUEST_ACCOUNTS: "eth_requestAccounts"
};
exports.ethereumMethods = ethereumMethods;
var DEFAULT_GAS_LIMIT = undefined;
var DEFAULT_GAS_PRICE = undefined;
var ON_ACCOUNT_CHANGE = "accountsChanged";
var ON_NETWORK_CHANGE = "networkChanged";

var initSDK = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var sdk, web3Provider, updateSDK, hasEth, hasWeb3;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            updateSDK = /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var chainIdHex, networkId, config;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        chainIdHex = web3Provider.chainId;
                        networkId = parseInt(chainIdHex);
                        config = {
                          networkId: networkId,
                          web3Provider: web3Provider,
                          defaultGasLimit: DEFAULT_GAS_LIMIT,
                          defaultGasPrice: DEFAULT_GAS_PRICE
                        };
                        sdk = new _snetSdkWeb.default(config);
                        _context.next = 6;
                        return sdk.setupAccount();

                      case 6:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function updateSDK() {
                return _ref2.apply(this, arguments);
              };
            }();

            hasEth = typeof window.ethereum !== "undefined";
            hasWeb3 = typeof window.web3 !== "undefined";
            _context2.prev = 3;

            if (!(hasEth && hasWeb3)) {
              _context2.next = 13;
              break;
            }

            web3Provider = window.ethereum;
            _context2.next = 8;
            return web3Provider.request({
              method: ethereumMethods.REQUEST_ACCOUNTS
            });

          case 8:
            // eslint-disable-next-line require-atomic-updates
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
            _context2.next = 12;
            return updateSDK();

          case 12:
            return _context2.abrupt("return", sdk);

          case 13:
            _context2.next = 18;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](3);
            throw _context2.t0;

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 15]]);
  }));

  return function initSDK() {
    return _ref.apply(this, arguments);
  };
}();

exports.initSDK = initSDK;