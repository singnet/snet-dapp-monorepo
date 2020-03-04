import { validBlockChainAdressEquality } from "../../Utils/validation";

export const submitOrganizationCostraints = {
  id: { presence: { allowEmpty: false } },
  name: { presence: { allowEmpty: false } },
  website: { url: true },
  shortDescription: { presence: { allowEmpty: false } },
  longDescription: { presence: { allowEmpty: false } },

  "assets.heroImage.raw": {
    presence: { allowEmpty: false, message: "Please upload a hero image for the organization", fullMessages: false },
  },
  "assets.heroImage.fileType": {
    presence: { allowEmpty: false, message: "Please upload a hero image for the organization", fullMessages: false },
  },
  groups: {
    array: {
      name: { presence: { allowEmpty: false } },
      id: { presence: { allowEmpty: false } },
      paymentAddress: { presence: { allowEmpty: false }, equality: validBlockChainAdressEquality("paymentAddress") },
      "paymentConfig.paymentExpirationThreshold": { presence: { allowEmpty: false } },
      "paymentConfig.paymentChannelStorageType": { presence: { allowEmpty: false } },
      "paymentConfig.paymentChannelStorageClient.connectionTimeout": { presence: { allowEmpty: false } },
      "paymentConfig.paymentChannelStorageClient.requestTimeout": { presence: { allowEmpty: false } },
    },
  },
};
