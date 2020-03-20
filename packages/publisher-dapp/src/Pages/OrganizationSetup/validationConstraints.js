import { validBlockChainAdressEquality } from "../../Utils/validation";

export const submitOrganizationCostraints = {
  id: { presence: { allowEmpty: false } },
  name: { presence: { allowEmpty: false } },
  website: { url: true },
  shortDescription: { presence: { allowEmpty: false } },
  longDescription: { presence: { allowEmpty: false } },

  "assets.heroImage.url": {
    presence: {
      allowEmpty: false,
      message: "^Please upload an image for the organization",
      fullMessages: false,
    },
  },
  groups: {
    array: {
      name: { presence: { allowEmpty: false, message: "^Please enter group details" } },
      id: { presence: { allowEmpty: false, message: "^Please enter group details" } },
      paymentAddress: {
        presence: { allowEmpty: false },
        equality: validBlockChainAdressEquality("paymentAddress"),
      },
      "paymentConfig.paymentExpirationThreshold": {
        presence: { allowEmpty: false, message: "^Please enter payment expiration threshold" },
      },
    },
  },
};
