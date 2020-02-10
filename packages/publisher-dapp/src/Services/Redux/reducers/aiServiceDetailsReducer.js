import { aiServiceDetailsActions } from "../actionCreators";
import { ContactsTypes } from "../../../Utils/Contacts";
import { serviceSetupStatuses } from "../../../Utils/serviceSetup";
import { serviceCreationStatus } from "../../../Pages/AiServiceCreation/constant";

export const defaultGroups = [
  {
    groupId: "",
    pricing: [
      {
        default: true,
        priceModel: "fixed_price",
        priceInCogs: 1,
      },
    ],
    endpoints: [],
  },
];

const initialState = {
  serviceState: {
    state: serviceCreationStatus.NOT_STARTED,
  },
  touch: false,
  status: serviceSetupStatuses.NOT_STARTED,
  uuid: "",
  name: "",
  id: "",
  availability: "",
  shortDescription: "",
  longDescription: "",
  projectURL: "",
  proto: {
    ipfsHash: "",
    encoding: "",
    type: "",
  },
  assets: {
    heroImage: {
      url: "",
      ipfsHash: "",
    },
    demoFiles: {
      url: "",
      ipfsHash: "",
    },
    protoFiles: {
      url: "",
      ipfsHash: "",
    },
  },
  contributors: "",
  ipfsHash: "",
  contacts: [
    { type: ContactsTypes.GENERAL, email: "", phone: "" },
    { type: ContactsTypes.SUPPORT, email: "", phone: "" },
  ],
  groups: defaultGroups,
  tags: [],
  freeCallSignerAddress: "",
  price: "",
  freeCallsAllowed: "",
  comments: {
    serviceProvider: [],
  },
};

const serviceDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case aiServiceDetailsActions.SET_ALL_SERVICE_DETAILS_ATTRIBUTES:
      return { ...state, ...action.payload };
    case aiServiceDetailsActions.SET_AI_SERVICE_TOUCH_FLAG:
      return { ...state, touch: action.payload };
    case aiServiceDetailsActions.SET_AI_SERVICE_ID:
      return { ...state, id: action.payload };
    case aiServiceDetailsActions.SET_AI_SERVICE_ID_AVAILABILITY:
      return { ...state, availability: action.payload };
    case aiServiceDetailsActions.SET_AI_SERVICE_NAME:
      return { ...state, name: action.payload };
    case aiServiceDetailsActions.SET_AI_SERVICE_UUID:
      return { ...state, uuid: action.payload };
    case aiServiceDetailsActions.SET_AI_SERVICE_GROUPS:
      return { ...state, groups: action.payload };
    case aiServiceDetailsActions.SET_AI_SERVICE_DETAIL_LEAF:
      return { ...state, [action.payload.name]: action.payload.value };
    case aiServiceDetailsActions.SET_AI_SERVICE_MULTIPLE_DETAILS:
      return { ...state, ...action.payload };
    case aiServiceDetailsActions.SET_AI_SERVICE_FREE_CALL_SIGNER_ADDRESS:
      return { ...state, freeCallSignerAddress: action.payload };
    case aiServiceDetailsActions.SET_SERVICE_PROVIDER_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          serviceProvider: action.payload,
        },
      };
    default:
      return state;
  }
};

export default serviceDetailsReducer;