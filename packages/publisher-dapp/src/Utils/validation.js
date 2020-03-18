import Web3 from "web3";

const web3 = new Web3(process.env.REACT_APP_WEB3_PROVIDER, null, {});

// ! NOTE: We are making use of equality property of validator to perform custom validation on the fly
export const validBlockChainAdressEquality = attributeToCompare => ({
  message: (value, attribute) => {
    return `^${value} is not a valid blockchain address. Please check ${attribute}`;
  },
  attribute: attributeToCompare,
  comparator: v1 => {
    return web3.utils.isAddress(v1);
  },
});

export const getEmailDomain = email => {
  let domain = email.replace(/.*@/, "");
  return domain.toLowerCase();
};
