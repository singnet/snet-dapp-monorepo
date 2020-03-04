import Web3 from "web3";
import tokenABI from "singularitynet-token-contracts/abi/SingularityNetToken.json";
import tokenNetworks from "singularitynet-token-contracts/networks/SingularityNetToken.json";

import stakingNetworks from "./TokenStake/networks/TokenStake";
import stakingABI from "./TokenStake/abi/TokenStake";

// TODO - Come up with a different approach here....
export const waitForTransaction = async hash => {
  let receipt;

  const ethereum = window.ethereum;
  window.web3 = new window.Web3(ethereum);
  const web3 = new Web3(window.web3.currentProvider);

  while (!receipt) {
    // eslint-disable-next-line no-await-in-loop
    try {
      // eslint-disable-next-line require-atomic-updates
      receipt = await web3.eth.getTransactionReceipt(hash);

      //console.log(" receipt - ", receipt);
    } catch (_error) {
      // Do Nothing
      //console.log("error - ", error);
    }
  }

  return new Promise((resolve, reject) => {
    if (!receipt.status) {
      reject(receipt);
    }
    resolve(receipt);
  });
};

// Approve AGI Token for the Staking Contract Address
export const approveToken = (metamaskDetails, amountBN) => {
  const tokenContractAddress = getTokenContractAddress();
  const stakingContractAddress = getStakingContractAddress();
  const accountAddress = metamaskDetails.account;

  const ethereum = window.ethereum;
  window.web3 = new window.Web3(ethereum);

  const tokenInstance = window.web3.eth.contract(tokenABI).at(tokenContractAddress);

  return new Promise((resolve, reject) => {
    tokenInstance.approve(stakingContractAddress, amountBN.toString(), { from: accountAddress }, (err, hash) => {
      if (err) {
        reject(hash);
      }
      resolve(hash);
    });
  });
};

export const createStakePeriod = (
  metamaskDetails,
  startPeriod,
  endSubmission,
  endApproval,
  requestWithdrawStartPeriod,
  endPeriod,
  rewardAmount,
  maxCap,
  minStake,
  maxStake,
  openForExternal
) => {
  const stakingContractAddress = getStakingContractAddress();
  const accountAddress = metamaskDetails.account;

  const ethereum = window.ethereum;
  window.web3 = new window.Web3(ethereum);

  const stakingInstance = window.web3.eth.contract(stakingABI).at(stakingContractAddress);

  return new Promise((resolve, reject) => {
    stakingInstance.openForStake(
      startPeriod,
      endSubmission,
      endApproval,
      requestWithdrawStartPeriod,
      endPeriod,
      rewardAmount,
      maxCap,
      minStake,
      maxStake,
      openForExternal,
      { from: accountAddress },
      (err, hash) => {
        if (err) {
          reject(hash);
        }
        resolve(hash);
      }
    );
  });
};

// Function to create a new stake in the Current Stake Window
export const submitStake = (metamaskDetails, stakeAmount, autoRenewal) => {
  const stakingContractAddress = getStakingContractAddress();
  const accountAddress = metamaskDetails.account;

  const ethereum = window.ethereum;
  window.web3 = new window.Web3(ethereum);
  const stakingInstance = window.web3.eth.contract(stakingABI).at(stakingContractAddress);

  return new Promise((resolve, reject) => {
    stakingInstance.submitStake(stakeAmount.toString(), autoRenewal, { from: accountAddress }, (err, hash) => {
      if (err) {
        reject(hash);
      }
      resolve(hash);
    });
  });
};

export const approveStake = (metamaskDetails, staker, approvedAmount) => {
  const stakingContractAddress = getStakingContractAddress();
  const accountAddress = metamaskDetails.account;

  const ethereum = window.ethereum;
  window.web3 = new window.Web3(ethereum);

  const stakingInstance = window.web3.eth.contract(stakingABI).at(stakingContractAddress);

  return new Promise((resolve, reject) => {
    stakingInstance.approveStake(staker, approvedAmount.toString(), { from: accountAddress }, (err, hash) => {
      if (err) {
        reject(hash);
      }
      resolve(hash);
    });
  });
};

export const rejectStake = (metamaskDetails, stakeMapIndex, staker) => {
  const stakingContractAddress = getStakingContractAddress();
  const accountAddress = metamaskDetails.account;

  const ethereum = window.ethereum;
  window.web3 = new window.Web3(ethereum);

  const stakingInstance = window.web3.eth.contract(stakingABI).at(stakingContractAddress);

  return new Promise((resolve, reject) => {
    stakingInstance.rejectStake(stakeMapIndex, staker, { from: accountAddress }, (err, hash) => {
      if (err) {
        reject(hash);
      }
      resolve(hash);
    });
  });
};

export const updateAutoRenewal = (metamaskDetails, stakeMapIndex, autoRenew) => {
  const stakingContractAddress = getStakingContractAddress();
  const accountAddress = metamaskDetails.account;

  const ethereum = window.ethereum;
  window.web3 = new window.Web3(ethereum);

  const stakingInstance = window.web3.eth.contract(stakingABI).at(stakingContractAddress);

  return new Promise((resolve, reject) => {
    stakingInstance.updateAutoRenewal(stakeMapIndex, autoRenew, { from: accountAddress }, (err, hash) => {
      if (err) {
        reject(hash);
      }
      resolve(hash);
    });
  });
};

export const claimStake = (metamaskDetails, stakeMapIndex) => {
  const stakingContractAddress = getStakingContractAddress();
  const accountAddress = metamaskDetails.account;

  const ethereum = window.ethereum;
  window.web3 = new window.Web3(ethereum);

  const stakingInstance = window.web3.eth.contract(stakingABI).at(stakingContractAddress);

  return new Promise((resolve, reject) => {
    stakingInstance.claimStake(stakeMapIndex, { from: accountAddress }, (err, hash) => {
      if (err) {
        reject(hash);
      }
      resolve(hash);
    });
  });
};

// Only for Token Operator to withdraw Tokens from liquid pool
export const withdrawToken = (metamaskDetails, amountBN) => {
  const stakingContractAddress = getStakingContractAddress();
  const accountAddress = metamaskDetails.account;

  const ethereum = window.ethereum;
  window.web3 = new window.Web3(ethereum);

  const stakingInstance = window.web3.eth.contract(stakingABI).at(stakingContractAddress);

  return new Promise((resolve, reject) => {
    stakingInstance.withdrawToken(amountBN.toString(), { from: accountAddress }, (err, hash) => {
      if (err) {
        reject(hash);
      }
      resolve(hash);
    });
  });
};

// Only for Token Operator to Deposit Tokens to liquid Pool
export const depositToken = (metamaskDetails, amountBN) => {
  const stakingContractAddress = getStakingContractAddress();
  const accountAddress = metamaskDetails.account;

  const ethereum = window.ethereum;
  window.web3 = new window.Web3(ethereum);

  const stakingInstance = window.web3.eth.contract(stakingABI).at(stakingContractAddress);

  return new Promise((resolve, reject) => {
    stakingInstance.depositToken(amountBN.toString(), { from: accountAddress }, (err, hash) => {
      if (err) {
        reject(hash);
      }
      resolve(hash);
    });
  });
};

// Only for the token Operator
export const autoRenewStake = (metamaskDetails, existingStakeMapIndex, staker, approvedAmountBN) => {
  const stakingContractAddress = getStakingContractAddress();
  const accountAddress = metamaskDetails.account;

  const ethereum = window.ethereum;
  window.web3 = new window.Web3(ethereum);

  const stakingInstance = window.web3.eth.contract(stakingABI).at(stakingContractAddress);

  return new Promise((resolve, reject) => {
    stakingInstance.autoRenewStake(
      existingStakeMapIndex,
      staker,
      approvedAmountBN.toString(),
      { from: accountAddress },
      (err, hash) => {
        if (err) {
          reject(hash);
        }
        resolve(hash);
      }
    );
  });
};

export const renewStake = (metamaskDetails, existingStakeMapIndex, stakeAmountBN, autoRenewal) => {
  const stakingContractAddress = getStakingContractAddress();
  const accountAddress = metamaskDetails.account;

  const ethereum = window.ethereum;
  window.web3 = new window.Web3(ethereum);

  const stakingInstance = window.web3.eth.contract(stakingABI).at(stakingContractAddress);

  return new Promise((resolve, reject) => {
    stakingInstance.renewStake(
      existingStakeMapIndex,
      stakeAmountBN.toString(),
      autoRenewal,
      { from: accountAddress },
      (err, hash) => {
        if (err) {
          reject(hash);
        }
        resolve(hash);
      }
    );
  });
};

export const withdrawStake = (metamaskDetails, existingStakeMapIndex, stakeAmountBN) => {
  const stakingContractAddress = getStakingContractAddress();
  const accountAddress = metamaskDetails.account;

  const ethereum = window.ethereum;
  window.web3 = new window.Web3(ethereum);

  const stakingInstance = window.web3.eth.contract(stakingABI).at(stakingContractAddress);

  return new Promise((resolve, reject) => {
    stakingInstance.withdrawStake(
      existingStakeMapIndex,
      stakeAmountBN.toString(),
      { from: accountAddress },
      (err, hash) => {
        if (err) {
          reject(hash);
        }
        resolve(hash);
      }
    );
  });
};

// Can be done only by owner
export const updateOwner = (metamaskDetails, newOwner) => {
  const stakingContractAddress = getStakingContractAddress();
  const accountAddress = metamaskDetails.account;

  const ethereum = window.ethereum;
  window.web3 = new window.Web3(ethereum);

  const stakingInstance = window.web3.eth.contract(stakingABI).at(stakingContractAddress);

  return new Promise((resolve, reject) => {
    stakingInstance.updateOwner(newOwner, { from: accountAddress }, (err, hash) => {
      if (err) {
        reject(hash);
      }
      resolve(hash);
    });
  });
};

export const updateOperator = (metamaskDetails, tokenOperator) => {
  const stakingContractAddress = getStakingContractAddress();
  const accountAddress = metamaskDetails.account;

  const ethereum = window.ethereum;
  window.web3 = new window.Web3(ethereum);

  const stakingInstance = window.web3.eth.contract(stakingABI).at(stakingContractAddress);

  return new Promise((resolve, reject) => {
    stakingInstance.updateOperator(tokenOperator, { from: accountAddress }, (err, hash) => {
      if (err) {
        reject(hash);
      }
      resolve(hash);
    });
  });
};

export const getStakeInfo = (metamaskDetails, stakeMapIndex) => {
  const stakingContractAddress = getStakingContractAddress();
  const accountAddress = metamaskDetails.account;

  const ethereum = window.ethereum;
  window.web3 = new window.Web3(ethereum);

  const stakingInstance = window.web3.eth.contract(stakingABI).at(stakingContractAddress);

  return new Promise((resolve, reject) => {
    stakingInstance.getStakeInfo(stakeMapIndex, accountAddress, null, (err, result) => {
      if (err) {
        reject(result);
      }
      resolve(result);
    });
  });
};

export const getBlockNumber = () => {
  // Check for Metamask
  if (window.ethereum) {
    const ethereum = window.ethereum;
    window.web3 = new window.Web3(ethereum);
    // Return the Block Number
    return new Promise((_reject, resolve) => {
      window.web3.eth.getBlockNumber((err, blockNumber) => {
        if (err) {
          resolve(err);
        }
        resolve(blockNumber);
      });
    });
  } else {
    // Fallback to Infura to get the blocknumber
    var web3 = new Web3(process.env.REACT_APP_INFURA_ENDPOINT);
    return new Promise((_reject, resolve) => {
      web3.eth.getBlockNumber((err, blockNumber) => {
        if (err) {
          resolve(err);
        }
        resolve(blockNumber);
      });
    });
  }
};

const getStakingContractAddress = () => {
  return stakingNetworks[process.env.REACT_APP_ETH_NETWORK].address;
};

const getTokenContractAddress = () => {
  return tokenNetworks[process.env.REACT_APP_ETH_NETWORK].address;
};
