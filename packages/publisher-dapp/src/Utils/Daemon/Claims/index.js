import { grpc } from "@improbable-eng/grpc-web";
import MPENetworks from "singularitynet-platform-contracts/networks/MultiPartyEscrow";
import Web3 from "web3";

import { ProviderControlService } from "./stubs/control_service_pb_service";
import { GrpcError } from "shared/dist/utils/error";
import { uint8ArrayToBN } from "../../Grpc";

export class ControlServiceRequest {
  constructor(serviceHost) {
    this._serviceHost = serviceHost;
    this._web3 = new Web3(process.env.REACT_APP_WEB3_PROVIDER, null, {});
  }

  _getServiceHost = () => this._serviceHost;

  _getMethodDescriptor = method => ProviderControlService[method];

  _getMpeAddress = () => MPENetworks[process.env.REACT_APP_ETH_NETWORK].address;

  _getCurrentBlockNumber = async () => await this._web3.eth.getBlockNumber();

  getListUnclaimed = async () => {
    const methodDescriptor = this._getMethodDescriptor("GetListUnclaimed");
    const request = new methodDescriptor.requestType();
    request.setMpeAddress(this._getMpeAddress());
    request.setCurrentBlock(await this._getCurrentBlockNumber());

    const parseResponseMessage = message => {
      const paymentsList = message.getPaymentsList().map(payment => ({
        channelId: uint8ArrayToBN(payment.getChannelId()).toString(),
        channelNonce: uint8ArrayToBN(payment.getChannelNonce()).toString(),
        signedAmount: uint8ArrayToBN(payment.getSignedAmount()).toString(),
        signature: payment.getSignature(),
      }));
      return paymentsList;
    };
    return new Promise((resolve, reject) => {
      const props = {
        request,
        host: this._getServiceHost(),
        onEnd: result => {
          const { message, status, statusMessage } = result;
          if (status !== 0) {
            return reject(new GrpcError(statusMessage));
          }
          const paymentsList = parseResponseMessage(message);
          resolve(paymentsList);
        },
      };
      grpc.unary(methodDescriptor, props);
    });
  };
}
