import { ConfigurationService } from "./stubs/configuration_service_pb_service";
import configuration_service_pb from "./stubs/configuration_service_pb";
import { grpc } from "@improbable-eng/grpc-web";
import Web3 from "web3";

import { GrpcError } from "shared/dist/utils/error";
import { hexToB64 } from "../../Grpc";

const methods = {
  GetConfiguration: "GetConfiguration",
};

export class ConfigurationServiceRequest {
  constructor(serviceHost) {
    this.serviceHost = serviceHost;
    this._web3 = undefined;
  }

  _initWeb3 = async () => {
    if (this._web3) {
      return;
    }
    const web3Provider = window.ethereum;
    const accounts = await web3Provider.enable();
    // eslint-disable-next-line require-atomic-updates
    window.web3.eth.defaultAccount = accounts[0];
    this._web3 = new Web3(web3Provider, null, {});
  };

  _getServiceHost = () => this.serviceHost;

  _getMethodDescriptor = method => ConfigurationService[method];

  _getCurrentBlockNumber = async () => await this._web3.eth.getBlockNumber();

  _getAddress = async () => {
    const address = await this._web3.eth.getAccounts();
    return address[0];
  };

  getConfiguration = async signature => {
    await this._initWeb3();
    const generateSignature = async () => {
      const address = await this._getAddress();
      const currentBlockNumber = await this._getCurrentBlockNumber();
      const sha3Message = this._web3.utils.soliditySha3(
        { t: "string", v: "_GetConfiguration" },
        { t: "uint256", v: currentBlockNumber }
      );
      const sha3Hash = this._web3.eth.accounts.hashMessage(sha3Message);
      const signature = await this._web3.eth.sign(sha3Hash, address);
      return hexToB64(signature);
    };

    const methodDescriptor = this._getMethodDescriptor(methods.GetConfiguration);
    const request = new methodDescriptor.requestType();
    // request.setSignature(signature ? signature : await generateSignature());
    const callerAuthentication = new configuration_service_pb.CallerAuthentication();
    callerAuthentication.setSignature(signature ? signature : await generateSignature());
    callerAuthentication.setCurrentBlock(await this._getCurrentBlockNumber());
    request.setAuth(callerAuthentication);

    return new Promise((resolve, reject) => {
      const props = {
        request,
        host: this._getServiceHost(),
        onEnd: result => {
          const { message, status, statusMessage } = result;
          if (status !== 0) {
            return reject(new GrpcError(statusMessage));
          }
          resolve(message.toObject());
        },
      };
      grpc.unary(methodDescriptor, props);
    });
  };
}