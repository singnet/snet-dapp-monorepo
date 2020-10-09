import { ConfigurationService } from "./stubs/configuration_service_pb_service";
import configuration_service_pb from "./stubs/configuration_service_pb";
import { grpc } from "@improbable-eng/grpc-web";
import Web3 from "web3";

import { GrpcError } from "shared/dist/utils/error";
import { hexToB64, solidityTypes } from "../../Grpc";
import { ethereumMethods } from "shared/dist/utils/snetSdk";

const methods = {
  GetConfiguration: "GetConfiguration",
};

export class ConfigurationServiceRequest {
  constructor(serviceHost) {
    this.serviceHost = serviceHost;
    this._web3 = undefined;
    this._initWeb3();
  }

  _initWeb3 = async () => {
    if (this._web3) {
      return;
    }
    const web3Provider = window.ethereum;
    const accounts = await web3Provider.request({ method: ethereumMethods.REQUEST_ACCOUNTS });
    // eslint-disable-next-line require-atomic-updates
    this._web3 = new Web3(web3Provider, null, {});
    this._web3.eth.defaultAccount = accounts[0];
  };

  _getServiceHost = () => this.serviceHost;

  _getMethodDescriptor = method => ConfigurationService[method];

  getCurrentBlockNumber = async () => {
    await this._initWeb3();
    return await this._web3.eth.getBlockNumber();
  };

  _getAddress = async () => {
    await this._initWeb3();
    const address = await this._web3.eth.getAccounts();
    return address[0];
  };

  generateSignatureForGetConfiguration = async currentBlock => {
    await this._initWeb3();
    const address = await this._getAddress();
    const currentBlockNumber = currentBlock ? currentBlock : await this.getCurrentBlockNumber();
    const sha3Message = this._web3.utils.soliditySha3(
      { t: solidityTypes.STRING, v: "_GetConfiguration" },
      { t: solidityTypes.UINT256, v: currentBlockNumber }
    );
    const sha3Hash = this._web3.eth.accounts.hashMessage(sha3Message);
    const signature = await this._web3.eth.sign(sha3Hash, address);
    return hexToB64(signature);
  };

  getConfiguration = async (signature, currentBlock) => {
    await this._initWeb3();
    const methodDescriptor = this._getMethodDescriptor(methods.GetConfiguration);
    const request = new methodDescriptor.requestType();
    // request.setSignature(signature ? signature : await generateSignature());
    const callerAuthentication = new configuration_service_pb.CallerAuthentication();
    callerAuthentication.setCurrentBlock(currentBlock ? currentBlock : await this.getCurrentBlockNumber());
    callerAuthentication.setSignature(signature ? signature : await this.generateSignatureForGetConfiguration());
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
