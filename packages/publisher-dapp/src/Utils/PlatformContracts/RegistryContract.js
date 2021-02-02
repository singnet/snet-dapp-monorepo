import Web3 from "web3";
import RegistryAbi from "singularitynet-platform-contracts/abi/Registry";
import RegistryNetworks from "singularitynet-platform-contracts/networks/Registry";

export default class RegistryContract {
  constructor() {
    this._web3 = new Web3(process.env.REACT_APP_WEB3_PROVIDER, null, {});
    this._contract = new this._web3.eth.Contract(
      RegistryAbi,
      RegistryNetworks[process.env.REACT_APP_ETH_NETWORK].address
    );
  }

  /**
   *
   * @param {string} orgId - Id of the organization to look up.
   */
  getOrganizationById(orgId) {
    const enhancedOrgId = this._web3.utils.fromAscii(orgId);
    return this._contract.methods.getOrganizationById(enhancedOrgId);
  }

  /**
   *
   * @param {string} orgId  Id of the organization that owns the service to look up.
   * @param {string} serviceId Id of the service to look up.
   *
   * @returns {boolean} true if an organization and service with these ids exists, false otherwise. If false, all other
   *                      returned fields should be ignored.
   * @returns {string}  Id of the service, should be the same as the serviceId parameter.
   * @returns {string} metadataURI  Service metadata URI
   * @returns {string[]} serviceTags  Optional array of tags for discoverability.
   */
  getServiceRegistrationById(orgId, serviceId) {
    const enhancedOrgId = this._web3.utils.fromAscii(orgId);
    const enhancedServiceId = this._web3.utils.fromAscii(serviceId);
    return this._contract.methods.getServiceRegistrationById(enhancedOrgId, enhancedServiceId);
  }
}
