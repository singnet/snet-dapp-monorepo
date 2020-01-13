export const orgProfileValidationConstraints = {
  id: { presence: { allowEmpty: false } },
  name: { presence: { allowEmpty: false } },
  website: { url: true },
  shortDescription: { presence: { allowEmpty: false } },
  longDescription: { presence: { allowEmpty: false } },
};

export const contactConstraints = {
  email: { presence: { allowEmpty: false } },
  phone: { presence: { allowEmpty: false } },
};

export const errorMsg = {
  IMAGE_NOT_FOUND: "Please upload an image to proceed",
};
