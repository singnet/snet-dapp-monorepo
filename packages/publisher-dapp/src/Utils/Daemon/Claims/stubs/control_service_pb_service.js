// package: escrow
// file: control_service.proto
/* eslint-disable */

var control_service_pb = require("./control_service_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var ProviderControlService = (function () {
  function ProviderControlService() {}
  ProviderControlService.serviceName = "escrow.ProviderControlService";
  return ProviderControlService;
}());

ProviderControlService.GetListUnclaimed = {
  methodName: "GetListUnclaimed",
  service: ProviderControlService,
  requestStream: false,
  responseStream: false,
  requestType: control_service_pb.GetPaymentsListRequest,
  responseType: control_service_pb.PaymentsListReply
};

ProviderControlService.GetListInProgress = {
  methodName: "GetListInProgress",
  service: ProviderControlService,
  requestStream: false,
  responseStream: false,
  requestType: control_service_pb.GetPaymentsListRequest,
  responseType: control_service_pb.PaymentsListReply
};

ProviderControlService.StartClaim = {
  methodName: "StartClaim",
  service: ProviderControlService,
  requestStream: false,
  responseStream: false,
  requestType: control_service_pb.StartClaimRequest,
  responseType: control_service_pb.PaymentReply
};

exports.ProviderControlService = ProviderControlService;

function ProviderControlServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ProviderControlServiceClient.prototype.getListUnclaimed = function getListUnclaimed(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ProviderControlService.GetListUnclaimed, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ProviderControlServiceClient.prototype.getListInProgress = function getListInProgress(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ProviderControlService.GetListInProgress, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ProviderControlServiceClient.prototype.startClaim = function startClaim(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ProviderControlService.StartClaim, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.ProviderControlServiceClient = ProviderControlServiceClient;

