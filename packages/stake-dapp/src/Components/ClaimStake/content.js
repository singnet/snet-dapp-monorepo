import moment from "moment";
import { fromWei } from "../../Utils/GenHelperFunctions";
import BigNumber from "bignumber.js";

const computeReward = stakeDetails => {
  if (stakeDetails.approvedAmount === 0) return 0;

  const approvedAmount = new BigNumber(stakeDetails.approvedAmount);
  const windowRewardAmount = new BigNumber(stakeDetails.rewardAmount);
  const windowTotalStake = new BigNumber(stakeDetails.windowTotalStake === 0 ? 1 : stakeDetails.windowTotalStake);
  const windowMaxCap = new BigNumber(stakeDetails.windowMaxCap);

  let rewardAmount = new BigNumber(0);

  if (windowTotalStake.lt(windowMaxCap)) {
    rewardAmount = approvedAmount.times(windowRewardAmount).div(windowTotalStake);
  } else {
    rewardAmount = approvedAmount.times(windowRewardAmount).div(windowMaxCap);
  }

  return rewardAmount;
};

export const cardDetails = stakeDetails => [
  {
    title: "Total Claim Account",
    value: parseInt(fromWei(stakeDetails.approvedAmount)) + parseInt(fromWei(stakeDetails.pendingForApprovalAmount)),
    unit: "AGI",
  },
  {
    title: "Reward Earnings",
    value: fromWei(computeReward(stakeDetails)),
    unit: "AGI",
  },
  {
    title: "Incubating Completed",
    value: moment.unix(stakeDetails.endPeriod).format("DD MMM YYYY"),
    unit: " ",
  },
  {
    title: "Stakers",
    value: stakeDetails.numOfStakers,
    unit: "people",
  },
  {
    title: "Stake Pool Size",
    value: fromWei(stakeDetails.windowTotalStake),
    unit: "AGI",
  },
  {
    title: "Reward Pool",
    value: fromWei(stakeDetails.rewardAmount),
    unit: "AGI",
  },
];

export const btnDetails = [
  // {
  //   action: "reStake",
  //   color: "primary",
  //   variant: "text",
  //   text: "re-stake",
  // },
  {
    action: "reclaimStake",
    color: "primary",
    variant: "contained",
    text: "reclaim stake",
  },
  {
    action: "claimStake",
    color: "primary",
    variant: "contained",
    text: "widthdraw claim",
  },
];
