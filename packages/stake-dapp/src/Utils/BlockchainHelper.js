import Web3 from "web3";
import tokenABI from "singularitynet-token-contracts/abi/SingularityNetToken.json";
import tokenNetworks from "singularitynet-token-contracts/networks/SingularityNetToken.json";

import stakingNetworks from "singularitynet-stake-contracts/networks/TokenStake";
import stakingABI from "singularitynet-stake-contracts/abi/TokenStake";

import { toBigNumber } from "./GenHelperFunctions";

export const blockChainEvents = {
  TRANSACTION_HASH: "transactionHash",
  RECEIPT: "receipt",
  CONFIRMATION: "confirmation",
  ERROR: "error",
};

// Not recommeneded to use
// Instead refer other methods on how we can check the status of txn
export const waitForTransaction = async hash => {
  let receipt;

  const ethereum = window.ethereum;
  //window.web3 = new window.Web3(ethereum);
  //const web3 = new Web3(window.web3.currentProvider);

  const web3 = new Web3(ethereum);

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
export const approveTokenV2 = (metamaskDetails, amountBN) => {
  const tokenContractAddress = getTokenContractAddress();
  const stakingContractAddress = getStakingContractAddress();
  const accountAddress = metamaskDetails.account;

  try {
    const ethereum = window.ethereum;
    const web3 = new Web3(ethereum);

    const tokenInstance = new web3.eth.Contract(tokenABI, tokenContractAddress);

    return new Promise((resolve, reject) => {
      const method = tokenInstance.methods
        .approve(stakingContractAddress, amountBN.toString())
        .send({ from: accountAddress })
        .once(blockChainEvents.CONFIRMATION, async () => {
          resolve();
          await method.off();
        })
        .on(blockChainEvents.ERROR, error => {
          reject(error);
        });
    });
  } catch (error) {
    throw error;
  }
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
  const accountAddress = metamaskDetails.account;

  try {
    const stakingInstance = getStakingInstance();

    return new Promise((resolve, reject) => {
      const method = stakingInstance.methods
        .openForStake(
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
        )
        .send({ from: accountAddress })
        .once(blockChainEvents.CONFIRMATION, async () => {
          resolve();
          await method.off();
        })
        .on(blockChainEvents.ERROR, error => {
          reject(error);
        });
    });
  } catch (error) {
    throw error;
  }
};

// Function to create a new stake in the Current Stake Window
export const submitStakeV2 = (metamaskDetails, stakeAmount, autoRenewal) => {
  const accountAddress = metamaskDetails.account;

  try {
    const stakingInstance = getStakingInstance();

    return new Promise((resolve, reject) => {
      const method = stakingInstance.methods
        .submitStake(stakeAmount.toString(), autoRenewal)
        .send({ from: accountAddress })
        .once(blockChainEvents.CONFIRMATION, async () => {
          resolve();
          await method.off();
        })
        .on(blockChainEvents.ERROR, error => {
          reject(error);
        });
    });
  } catch (error) {
    throw error;
  }
};

export const approveStake = (metamaskDetails, staker, approvedAmount) => {
  const accountAddress = metamaskDetails.account;

  try {
    const stakingInstance = getStakingInstance();

    return new Promise((resolve, reject) => {
      const method = stakingInstance.methods
        .approveStake(staker, approvedAmount.toString())
        .send({ from: accountAddress })
        .once(blockChainEvents.CONFIRMATION, async () => {
          resolve();
          await method.off();
        })
        .on(blockChainEvents.ERROR, error => {
          reject(error);
        });
    });
  } catch (error) {
    throw error;
  }
};

export const rejectStake = (metamaskDetails, stakeMapIndex, staker) => {
  const accountAddress = metamaskDetails.account;

  try {
    const stakingInstance = getStakingInstance();

    return new Promise((resolve, reject) => {
      const method = stakingInstance.methods
        .rejectStake(stakeMapIndex, staker)
        .send({ from: accountAddress })
        .once(blockChainEvents.CONFIRMATION, async () => {
          resolve();
          await method.off();
        })
        .on(blockChainEvents.ERROR, error => {
          reject(error);
        });
    });
  } catch (error) {
    throw error;
  }
};

export const updateAutoRenewalV2 = (metamaskDetails, stakeMapIndex, autoRenew) => {
  const accountAddress = metamaskDetails.account;

  try {
    const stakingInstance = getStakingInstance();

    return new Promise((resolve, reject) => {
      const method = stakingInstance.methods
        .updateAutoRenewal(stakeMapIndex, autoRenew)
        .send({ from: accountAddress })
        .once(blockChainEvents.CONFIRMATION, async () => {
          resolve();
          await method.off();
        })
        .on(blockChainEvents.ERROR, error => {
          reject(error);
        });
    });
  } catch (error) {
    throw error;
  }
};

export const claimStakeV2 = (metamaskDetails, stakeMapIndex) => {
  const accountAddress = metamaskDetails.account;

  try {
    const stakingInstance = getStakingInstance();

    return new Promise((resolve, reject) => {
      const method = stakingInstance.methods
        .claimStake(stakeMapIndex)
        .send({ from: accountAddress })
        .once(blockChainEvents.CONFIRMATION, async () => {
          resolve();
          await method.off();
        })
        .on(blockChainEvents.ERROR, error => {
          reject(error);
        });
    });
  } catch (error) {
    throw error;
  }
};

// Only for Token Operator to withdraw Tokens from liquid pool
export const withdrawToken = (metamaskDetails, amountBN) => {
  const accountAddress = metamaskDetails.account;

  try {
    const stakingInstance = getStakingInstance();

    return new Promise((resolve, reject) => {
      const method = stakingInstance.methods
        .withdrawToken(amountBN.toString())
        .send({ from: accountAddress })
        .once(blockChainEvents.CONFIRMATION, async () => {
          resolve();
          await method.off();
        })
        .on(blockChainEvents.ERROR, error => {
          reject(error);
        });
    });
  } catch (error) {
    throw error;
  }
};

// Only for Token Operator to Deposit Tokens to liquid Pool
export const depositToken = (metamaskDetails, amountBN) => {
  const accountAddress = metamaskDetails.account;

  try {
    const stakingInstance = getStakingInstance();

    return new Promise((resolve, reject) => {
      const method = stakingInstance.methods
        .depositToken(amountBN.toString())
        .send({ from: accountAddress })
        .once(blockChainEvents.CONFIRMATION, async () => {
          resolve();
          await method.off();
        })
        .on(blockChainEvents.ERROR, error => {
          reject(error);
        });
    });
  } catch (error) {
    throw error;
  }
};

// Only for the token Operator
export const autoRenewStake = (metamaskDetails, existingStakeMapIndex, staker, approvedAmountBN) => {
  const accountAddress = metamaskDetails.account;

  try {
    const stakingInstance = getStakingInstance();

    return new Promise((resolve, reject) => {
      const method = stakingInstance.methods
        .autoRenewStake(existingStakeMapIndex, staker, approvedAmountBN.toString())
        .send({ from: accountAddress })
        .once(blockChainEvents.CONFIRMATION, async () => {
          resolve();
          await method.off();
        })
        .on(blockChainEvents.ERROR, error => {
          reject(error);
        });
    });
  } catch (error) {
    throw error;
  }
};

export const renewStake = (metamaskDetails, existingStakeMapIndex, stakeAmountBN, autoRenewal) => {
  const accountAddress = metamaskDetails.account;

  try {
    const stakingInstance = getStakingInstance();

    return new Promise((resolve, reject) => {
      const method = stakingInstance.methods
        .renewStake(existingStakeMapIndex, stakeAmountBN.toString(), autoRenewal)
        .send({ from: accountAddress })
        .once(blockChainEvents.CONFIRMATION, async () => {
          resolve();
          await method.off();
        })
        .on(blockChainEvents.ERROR, error => {
          reject(error);
        });
    });
  } catch (error) {
    throw error;
  }
};

export const withdrawStakeV2 = (metamaskDetails, existingStakeMapIndex, stakeAmountBN) => {
  const accountAddress = metamaskDetails.account;

  try {
    const stakingInstance = getStakingInstance();

    return new Promise((resolve, reject) => {
      const method = stakingInstance.methods
        .withdrawStake(existingStakeMapIndex, stakeAmountBN.toString())
        .send({ from: accountAddress })
        .once(blockChainEvents.CONFIRMATION, async () => {
          resolve();
          await method.off();
        })
        .on(blockChainEvents.ERROR, error => {
          reject(error);
        });
    });
  } catch (error) {
    throw error;
  }
};

// Can be done only by owner
export const updateOwner = (metamaskDetails, newOwner) => {
  const accountAddress = metamaskDetails.account;

  try {
    const stakingInstance = getStakingInstance();

    return new Promise((resolve, reject) => {
      const method = stakingInstance.methods
        .updateOwner(newOwner)
        .send({ from: accountAddress })
        .once(blockChainEvents.CONFIRMATION, async () => {
          resolve();
          await method.off();
        })
        .on(blockChainEvents.ERROR, error => {
          reject(error);
        });
    });
  } catch (error) {
    throw error;
  }
};

export const updateOperator = (metamaskDetails, tokenOperator) => {
  const accountAddress = metamaskDetails.account;

  try {
    const stakingInstance = getStakingInstance();

    return new Promise((resolve, reject) => {
      const method = stakingInstance.methods
        .updateOperator(tokenOperator)
        .send({ from: accountAddress })
        .once(blockChainEvents.CONFIRMATION, async () => {
          resolve();
          await method.off();
        })
        .on(blockChainEvents.ERROR, error => {
          reject(error);
        });
    });
  } catch (error) {
    throw error;
  }
};

// Read Operation for this method is performed using the Infura Call as Metamask web3 has a bug
export const getStakeInfo = async (metamaskDetails, stakeMapIndex) => {
  const stakingContractAddress = getStakingContractAddress();
  const accountAddress = metamaskDetails.account;

  const web3 = new Web3(process.env.REACT_APP_INFURA_ENDPOINT);

  const stakingInstance = new web3.eth.Contract(stakingABI, stakingContractAddress);

  const result = await stakingInstance.methods
    .getStakeInfo(toBigNumber(stakeMapIndex).toString(), accountAddress)
    .call();

  return result;
};

export const getRecentStakeWindow = async () => {
  const stakingContractAddress = getStakingContractAddress();

  const web3 = new Web3(process.env.REACT_APP_INFURA_ENDPOINT);

  const stakingInstance = new web3.eth.Contract(stakingABI, stakingContractAddress);

  const currentStakeMapIndex = await stakingInstance.methods.currentStakeMapIndex().call();

  const totalPendingApprovalStake = await stakingInstance.methods.totalPendingApprovalStake().call();

  const result = await stakingInstance.methods.stakeMap(currentStakeMapIndex).call();

  return { ...result, totalPendingApprovalStake };
};

export const getUserStakeBalance = async metamaskDetails => {
  const accountAddress = metamaskDetails.account;
  let usetStakeBalance = 0;

  try {
    if (metamaskDetails.isTxnsAllowed) {
      const stakingInstance = getStakingInstance();
      usetStakeBalance = await stakingInstance.methods.balances(accountAddress).call();
    }
    return usetStakeBalance.toString();
  } catch (_error) {
    return usetStakeBalance.toString();
  }
};

export const getBlockNumber = () => {
  // Check for Metamask
  if (window.ethereum) {
    const ethereum = window.ethereum;
    const web3 = new Web3(ethereum);
    //window.web3 = new window.Web3(ethereum);
    // Return the Block Number
    return new Promise((_reject, resolve) => {
      //window.web3.eth.getBlockNumber((err, blockNumber) => {
      web3.eth.getBlockNumber((err, blockNumber) => {
        if (err) {
          resolve(err);
        }
        resolve(blockNumber);
      });
    });
  } else {
    // Fallback to Infura to get the blocknumber
    const web3 = new Web3(process.env.REACT_APP_INFURA_ENDPOINT);
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

const getStakingInstance = () => {
  const stakingContractAddress = getStakingContractAddress();

  try {
    const ethereum = window.ethereum;

    const web3 = new Web3(ethereum);
    const stakingInstance = new web3.eth.Contract(stakingABI, stakingContractAddress);

    return stakingInstance;
  } catch (error) {
    throw error;
  }
};

const getTokenInstance = () => {
  const tokenContractAddress = getTokenContractAddress();

  try {
    const ethereum = window.ethereum;

    const web3 = new Web3(ethereum);
    const tokenInstance = new web3.eth.Contract(tokenABI, tokenContractAddress);

    return tokenInstance;
  } catch (error) {
    throw error;
  }
};

// ******************* User Token Balance Functions ***********************
export const getTokenBalance = async metamaskDetails => {
  let tokenBalance = 0;
  const accountAddress = metamaskDetails.account;

  try {
    if (metamaskDetails.isTxnsAllowed) {
      const tokenInstance = getTokenInstance();
      tokenBalance = await tokenInstance.methods.balanceOf(accountAddress).call();
    }
    return tokenBalance.toString();
  } catch (_error) {
    return tokenBalance.toString();
  }
};

// ********************* Fetching The the Token Allowance *******************
export const getTokenAllowance = async metamaskDetails => {
  let tokenAllowance = 0;
  const stakingContractAddress = getStakingContractAddress();
  const accountAddress = metamaskDetails.account;

  try {
    if (metamaskDetails.isTxnsAllowed) {
      const tokenInstance = getTokenInstance();
      tokenAllowance = await tokenInstance.methods.allowance(accountAddress, stakingContractAddress).call();
    }
    return tokenAllowance.toString();
  } catch (_error) {
    return tokenAllowance.toString();
  }
};
