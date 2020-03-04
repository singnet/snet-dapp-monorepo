import { ContactsTypes } from "../../../Utils/Contacts";
import { organizationActions, inviteMembersActions } from "../actionCreators";
import { organizationSetupStatuses, organizationTypes } from "../../../Utils/organizationSetup";
import { memberStatus } from "../../../Utils/TeamMembers.js";

const initialState = {
  state: {
    state: organizationSetupStatuses.NOT_STARTED,
    updatedOn: "",
    updatedBy: "",
    reviewedBy: "",
    reviewedOn: "",
  },
  id: "",
  uuid: "",
  name: "",
  type: organizationTypes.ORGANIZATION,
  duns: "",
  website: "",
  ownerFullName: "",
  phone: "",
  shortDescription: "",
  longDescription: "",
  metadataIpfsUri: "",
  contacts: [
    { type: ContactsTypes.GENERAL, email: "", phone: "" },
    { type: ContactsTypes.SUPPORT, email: "", phone: "" },
  ],
  groups: [
    {
      name: "default_group",
      id: "",
      paymentAddress: "",
      paymentConfig: {
        paymentExpirationThreshold: "40320",
        paymentChannelStorageType: "etcd",
        paymentChannelStorageClient: {
          connectionTimeout: "5",
          requestTimeout: "3",
          endpoints: [],
        },
      },
    },
  ],
  assets: {
    heroImage: {
      raw: "",
      fileType: "",
    },
  },
  orgAddress: {
    sameMailingAddress: false,
    hqAddress: { street: "", apartment: "", city: "", zip: "", country: "" },
    mailingAddress: { street: "", apartment: "", city: "", zip: "", country: "" },
  },
  ownerAddress: "",
  members: {
    [memberStatus.PENDING]: [],
    [memberStatus.ACCEPTED]: [],
    [memberStatus.PUBLISHED]: [],
    [memberStatus.PUBLISH_IN_PROGRESS]: [],
    [memberStatus.VERIFIED]: [],
    [memberStatus.EXPIRED]: [],
  },
  owner: "",
};

const OrganizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case organizationActions.SET_ALL_ORG_ATTRIBUTES:
      return { ...state, ...action.payload };
    case organizationActions.SET_ONE_BASIC_DETAIL:
      return { ...state, ...action.payload };
    case organizationActions.RESET_ORGANIZATION_DATA:
      return { ...initialState };
    case organizationActions.SET_CONTACTS:
      return { ...state, contacts: action.payload };
    case organizationActions.SET_HERO_IMAGE:
      return { ...state, assets: { ...state.assets, heroImage: action.payload } };
    case organizationActions.SET_GROUPS:
      return { ...state, groups: action.payload };
    case organizationActions.SET_ORGANIZATION_STATUS:
      return { ...state, status: action.payload };
    case organizationActions.SET_ORG_HQ_ADDRESS_DETAIL:
      return {
        ...state,
        orgAddress: { ...state.orgAddress, hqAddress: { ...state.orgAddress.hqAddress, ...action.payload } },
      };
    case organizationActions.SET_ORG_MAILING_ADDRESS_DETAIL:
      return {
        ...state,
        orgAddress: { ...state.orgAddress, mailingAddress: { ...state.orgAddress.mailingAddress, ...action.payload } },
      };
    case inviteMembersActions.SET_MEMBERS_FOR_STATUS:
      return { ...state, members: { ...state.members, ...action.payload } };
    case organizationActions.SET_ORG_OWNER:
      return { ...state, owner: action.payload };
    case organizationActions.SET_ORG_STATE_ALL:
      // computing the key `state` to avoid name conflicts with redux `state`
      // eslint-disable-next-line no-useless-computed-key
      return { ...state, ["state"]: action.payload };
    case organizationActions.SET_ORG_STATE_STATE:
      // computing the key `state` to avoid name conflicts with redux `state`
      // eslint-disable-next-line no-useless-computed-key
      return { ...state, ["state"]: { ...state.state, ["state"]: action.payload } };
    case organizationActions.SET_ORG_SAME_MAILING_ADDRESS:
      return { ...state, orgAddress: { ...state.orgAddress, sameMailingAddress: action.payload } };
    default:
      return state;
  }
};

export default OrganizationReducer;
