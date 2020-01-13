export const orgSetupRegionValidationConstraints = {
  groups: {
    array: {
      name: { presence: { allowEmpty: false, message: "^Group name cannot be empty" } },
      paymentAddress: { presence: { allowEmpty: false, message: "^Payment address cannot be empty" } },
      "paymentConfig.paymentExpirationThreshold": {
        presence: { allowEmpty: false, message: "^Payment expiration threshold cannot be empty" },
      },
      "paymentConfig.paymentChannelStorageType": {
        presence: { allowEmpty: false, message: "^Payment channel storage type cannot be empty" },
      },
      "paymentConfig.paymentChannelStorageClient.connectionTimeout": {
        presence: { allowEmpty: false, message: "^Connection timeout cannot be empty" },
      },
      "paymentConfig.paymentChannelStorageClient.requestTimeout": {
        presence: { allowEmpty: false, message: "Request timeout cannot be empty" },
      },
      "paymentConfig.paymentChannelStorageClient.endpoints": {
        presence: { allowEmpty: false, message: "^Endpoints cannot be empty" },
      },
    },
  },
};
