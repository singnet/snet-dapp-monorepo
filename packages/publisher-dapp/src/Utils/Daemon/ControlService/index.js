import { grpc } from "@improbable-eng/grpc-web";
import MPENetworks from "singularitynet-platform-contracts/networks/MultiPartyEscrow";
import Web3 from "web3";

import { ProviderControlService } from "./stubs/control_service_pb_service";
import { GrpcError } from "shared/dist/utils/error";
import { hexToB64, solidityTypes, toBNString, uint8ArrayToBN, uint8ArrayToHex } from "../../Grpc";
import { MetamaskError } from "shared/dist/utils/error";
import { ethereumMethods } from "shared/dist/utils/snetSdk";

const methods = {
  GetListUnclaimed: "GetListUnclaimed",
  StartClaim: "StartClaim",
  GetListInProgress: "GetListInProgress",
  StartClaimForMultipleChannels: "StartClaimForMultipleChannels",
};

export class ControlServiceRequest {
  constructor(serviceHost) {
    this._serviceHost = serviceHost;
    this._web3 = undefined;
  }

  set serviceHost(value) {
    this._serviceHost = value;
  }

  _initWeb3 = async () => {
    if (this._web3) {
      return;
    }
    const web3Provider = window.ethereum;
    if (!web3Provider) {
      throw new MetamaskError("Metamask not available");
    }
    const accounts = await web3Provider.request({ method: ethereumMethods.REQUEST_ACCOUNTS });
    // eslint-disable-next-line require-atomic-updates
    this._web3 = new Web3(web3Provider, null, {});
    this._web3.eth.defaultAccount = accounts[0];
  };

  _getServiceHost = () => this._serviceHost;

  _getMethodDescriptor = method => ProviderControlService[method];

  _getAddress = async () => {
    const address = await this._web3.eth.getAccounts();
    return address[0];
  };

  _getMpeAddress = () => MPENetworks[process.env.REACT_APP_ETH_NETWORK].address;

  _getCurrentBlockNumber = async () => await this._web3.eth.getBlockNumber();

  getListUnclaimed = async signature => {
    await this._initWeb3();
    const generateSignature = async () => {
      const address = await this._getAddress();
      const currentBlockNumber = await this._getCurrentBlockNumber();
      const mpeAddress = this._getMpeAddress();
      const sha3Message = this._web3.utils.soliditySha3(
        { t: solidityTypes.STRING, v: "__list_unclaimed" },
        { t: solidityTypes.ADDRESS, v: mpeAddress },
        { t: solidityTypes.UINT256, v: currentBlockNumber }
      );
      const sha3Hash = this._web3.eth.accounts.hashMessage(sha3Message);
      const signature = await this._web3.eth.sign(sha3Hash, address);
      return hexToB64(signature);
    };
    const methodDescriptor = this._getMethodDescriptor(methods.GetListUnclaimed);
    const request = new methodDescriptor.requestType();

    request.setMpeAddress(this._getMpeAddress());
    request.setCurrentBlock(await this._getCurrentBlockNumber());
    request.setSignature(signature ? signature : await generateSignature());

    const parseResponseMessage = async message => {
      const currentBlock = await this._getCurrentBlockNumber();
      const paymentsList = message.getPaymentsList().map(payment => ({
        channelId: uint8ArrayToBN(payment.getChannelId()).toString(),
        channelNonce: uint8ArrayToBN(payment.getChannelNonce()).toString(),
        channelExpiry: uint8ArrayToBN(payment.getChannelExpiry()).toString(),
        signedAmount: uint8ArrayToBN(payment.getSignedAmount()).toString(),
        signature: payment.getSignature(),
        currentBlock,
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

  getListInProgress = async signature => {
    await this._initWeb3();
    const generateSignature = async () => {
      const address = await this._getAddress();
      const currentBlockNumber = await this._getCurrentBlockNumber();
      const mpeAddress = this._getMpeAddress();
      const sha3Message = this._web3.utils.soliditySha3(
        { t: solidityTypes.STRING, v: "__list_in_progress" },
        { t: solidityTypes.ADDRESS, v: mpeAddress },
        { t: solidityTypes.UINT256, v: currentBlockNumber }
      );
      const sha3Hash = this._web3.eth.accounts.hashMessage(sha3Message);
      const signature = await this._web3.eth.sign(sha3Hash, address);
      return hexToB64(signature);
    };
    const methodDescriptor = this._getMethodDescriptor(methods.GetListInProgress);
    const request = new methodDescriptor.requestType();

    request.setMpeAddress(this._getMpeAddress());
    request.setCurrentBlock(await this._getCurrentBlockNumber());
    request.setSignature(signature ? signature : await generateSignature());

    const parseResponseMessage = async message => {
      const currentBlock = await this._getCurrentBlockNumber();
      const paymentsList = message.getPaymentsList().map(payment => ({
        channelId: uint8ArrayToBN(payment.getChannelId()).toString(),
        channelNonce: uint8ArrayToBN(payment.getChannelNonce()).toString(),
        channelExpiry: uint8ArrayToBN(payment.getChannelExpiry()).toString(),
        signedAmount: uint8ArrayToBN(payment.getSignedAmount()).toString(),
        signature: uint8ArrayToHex(payment.getSignature()),
        currentBlock,
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

  startClaim = async (channelId, channelNonce, signature) => {
    await this._initWeb3();
    const channelIdStr = toBNString(channelId);
    // const channelIdBytes = toBytes(channelId);
    const channelIdBytes = Buffer.alloc(4);
    channelIdBytes.writeUInt32BE(channelId, 0);

    const generateSignature = async () => {
      const address = await this._getAddress();
      const mpeAddress = this._getMpeAddress();
      const sha3Message = this._web3.utils.soliditySha3(
        { t: solidityTypes.STRING, v: "__start_claim" },
        { t: solidityTypes.ADDRESS, v: mpeAddress },
        { t: solidityTypes.UINT256, v: channelIdStr },
        { t: solidityTypes.UINT256, v: channelNonce }
      );
      const sha3Hash = this._web3.eth.accounts.hashMessage(sha3Message);
      const signature = await this._web3.eth.sign(sha3Hash, address);
      return hexToB64(signature);
    };

    const methodDescriptor = this._getMethodDescriptor(methods.StartClaim);
    const request = new methodDescriptor.requestType();
    request.setMpeAddress(this._getMpeAddress());
    request.setChannelId(channelIdBytes);
    request.setSignature(signature ? signature : await generateSignature());

    const parseResponseMessage = paymentReply => {
      const payment = {
        channelId: uint8ArrayToBN(paymentReply.getChannelId()).toString(),
        channelNonce: uint8ArrayToBN(paymentReply.getChannelNonce()).toString(),
        signedAmount: uint8ArrayToBN(paymentReply.signedAmount()).toString(),
        signature: uint8ArrayToHex(paymentReply.getSignature()),
      };
      return payment;
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
          const payment = parseResponseMessage(message);
          resolve(payment);
        },
      };
      grpc.unary(methodDescriptor, props);
    });
  };

  startClaimForMultipleChannels = async channelIdList => {
    await this._initWeb3();
    const channelIdListSorted = channelIdList.sort((a, b) => a < b);

    const generateSignature = async () => {
      const address = await this._getAddress();
      const mpeAddress = this._getMpeAddress();
      const channelIdMessageList = channelIdListSorted.map(channelId => ({
        t: solidityTypes.UINT256,
        v: toBNString(channelId),
      }));
      const currentBlock = await this._getCurrentBlockNumber();
      const sha3Message = this._web3.utils.soliditySha3(
        { t: solidityTypes.STRING, v: "__StartClaimForMultipleChannels_" },
        { t: solidityTypes.ADDRESS, v: mpeAddress },
        ...channelIdMessageList,
        { t: solidityTypes.UINT256, v: currentBlock }
      );
      const sha3Hash = this._web3.eth.accounts.hashMessage(sha3Message);
      const signature = await this._web3.eth.sign(sha3Hash, address);
      return hexToB64(signature);
    };

    const methodDescriptor = this._getMethodDescriptor(methods.StartClaimForMultipleChannels);
    const request = new methodDescriptor.requestType();
    let channelIdBytesList = [];

    channelIdListSorted.forEach((channelId, index) => {
      channelIdBytesList[index] = toBNString(channelId);
    });
    request.setMpeAddress(this._getMpeAddress());
    request.setChannelIdsList(channelIdBytesList);
    request.setCurrentBlock(await this._getCurrentBlockNumber());
    request.setSignature(await generateSignature());

    const parseResponseMessage = async message => {
      const currentBlock = await this._getCurrentBlockNumber();
      const paymentsList = message.getPaymentsList().map(payment => ({
        channelId: uint8ArrayToBN(payment.getChannelId()).toString(),
        channelNonce: uint8ArrayToBN(payment.getChannelNonce()).toString(),
        channelExpiry: uint8ArrayToBN(payment.getChannelExpiry()).toString(),
        signedAmount: uint8ArrayToBN(payment.getSignedAmount()).toString(),
        signature: uint8ArrayToHex(payment.getSignature()),
        currentBlock,
      }));
      return paymentsList;
    };

    return new Promise((resolve, reject) => {
      const props = {
        request,
        host: this._getServiceHost(),
        onEnd: async result => {
          const { message, status, statusMessage } = result;
          if (status !== 0) {
            return reject(new GrpcError(statusMessage));
          }
          const payment = await parseResponseMessage(message);
          resolve(payment);
        },
      };
      grpc.unary(methodDescriptor, props);
    });
  };
}
