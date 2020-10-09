import { fromWei } from "../../Utils/GenHelperFunctions";
import BigNumber from "bignumber.js";
import momemt from "moment";

export const incubationProgressDetails = stakeDetails => ({
  startPeriod: stakeDetails.startPeriod,
  submissionEndPeriod: stakeDetails.submissionEndPeriod,
  endPeriod: stakeDetails.endPeriod,
});

const computeReward = stakeDetails => {
  const currentTimestamp = momemt().unix();

  if (
    (currentTimestamp > stakeDetails.approvalEndPeriod && stakeDetails.approvedAmount === 0) ||
    (currentTimestamp < stakeDetails.approvalEndPeriod &&
      stakeDetails.pendingForApprovalAmount === 0 &&
      stakeDetails.approvedAmount === 0)
  )
    return 0;

  const stakeAmount = new BigNumber(
    stakeDetails.approvedAmount === 0 ? stakeDetails.pendingForApprovalAmount : stakeDetails.approvedAmount
  );
  const windowRewardAmount = new BigNumber(stakeDetails.rewardAmount);

  let windowTotalStake = new BigNumber(stakeDetails.windowTotalStake);
  if (currentTimestamp < stakeDetails.approvalEndPeriod) {
    windowTotalStake = windowTotalStake.plus(new BigNumber(stakeDetails.totalStakedAmount));
  }

  const windowMaxCap = new BigNumber(stakeDetails.windowMaxCap);

  let rewardAmount = new BigNumber(0);

  if (windowTotalStake.lt(windowMaxCap)) {
    rewardAmount = stakeAmount.times(windowRewardAmount).div(windowTotalStake);
  } else {
    rewardAmount = stakeAmount.times(windowRewardAmount).div(windowMaxCap);
  }

  return rewardAmount;
};

export const yourStakeDetails = stakeDetails => [
  {
    title: "Accepted Stake Amount",
    value: fromWei(
      new BigNumber(stakeDetails.approvedAmount).plus(new BigNumber(stakeDetails.pendingForApprovalAmount))
    ),
    unit: "AGI",
    toolTip:
      "The amount of AGI tokens that the network accepted from your stake. Any partial amounts not accepted by SNET Foundation will be automatically refunded to your account wallet.",
  },
  {
    title: "Reward Amount",
    value: fromWei(computeReward(stakeDetails)),
    unit: "AGI",
    toolTip: "The amount of AGI tokens you’ll earn as reward for your stake during this incubation period",
  },
  {
    title: "Refunded Amount",
    value: fromWei(stakeDetails.refundAmount),
    unit: "AGI",
    toolTip:
      "When incubation period begins, SNET foundation will accept all or a partial amount of your stake amount. Unaccepted stake portions will be returned to your wallet account automatically (you will not be charged any transaction fee in this case).",
  },
];

export const stakeSessionDetails = stakeDetails => [
  {
    title: "Stakers",
    value: stakeDetails.numOfStakers,
    unit: "people",
    toolTip: "Current number of participants who have contributed AGI tokens to the stake",
  },
  {
    title: "Current Pool Size",
    value: fromWei(stakeDetails.windowTotalStake),
    unit: "AGI",
    toolTip: "Total amount of AGI tokens staked in the pool currently",
  },
  {
    title: "Reward Pool",
    value: fromWei(stakeDetails.rewardAmount),
    unit: "AGI",
    toolTip: "Number of AGI tokens that will be divided amongst all stakers as the reward for the current window",
  },
];

export const agreementDetails = {
  label: "Auto Renew to next stake session",
  description:
    "Renewing stakes (and rewards) to the next available stake session gives you priority over new stakers. Renewing stakes avoids the minimum and maximum AGI requirements. Renewing saves you in ETH gas cost.",
};
