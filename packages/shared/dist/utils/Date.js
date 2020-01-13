"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentUTCEpoch = void 0;

var getCurrentUTCEpoch = function getCurrentUTCEpoch() {
  var currentDate = new Date();
  var currentUTCDate = new Date(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate(), currentDate.getUTCHours(), currentDate.getUTCMinutes(), currentDate.getUTCSeconds());
  var currentUTCEpoch = Math.floor(currentUTCDate.getTime() / 1000);
  return currentUTCEpoch;
};

exports.getCurrentUTCEpoch = getCurrentUTCEpoch;