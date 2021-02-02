import { validBlockChainAdressEquality } from "../../../Utils/validation";

export const servicePricingValidationConstraints = {
  freeCallsAllowed: {
    numericality: { onlyInteger: true, greaterThanOrEqualTo: 0 },
  },
  price: { numericality: { greaterThan: 0 } },
  "assets.protoFiles.url": {
    presence: {
      allowEmpty: false,
      message: "^Please upload the proto file of the service",
    },
  },
  groups: {
    array: {
      endpoints: { presence: { allowEmpty: false, message: "^Endpoints cannot be blank" } },
    },
  },
};
export const daemonValidationConstraints = {
  equality: validBlockChainAdressEquality("paymentAddress"),
};
