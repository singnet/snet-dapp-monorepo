import moment from "moment";
import { fromWei } from "../../Utils/GenHelperFunctions";
import BigNumber from "bignumber.js";

const computeReward = stakeDetails => {
  if (stakeDetails.approvedAmount === 0) return 0;

  const approvedAmount = new BigNumber(stakeDetails.approvedAmount);
  const windowRewardAmount = new BigNumber(stakeDetails.rewardAmount);
  const windowTotalStake = new BigNumber(
    stakeDetails.windowTotalStake === 0 ? stakeDetails.approvedAmount : stakeDetails.windowTotalStake
  );
  const windowMaxCap = new BigNumber(stakeDetails.windowMaxCap);

  let rewardAmount = new BigNumber(0);

  if (windowTotalStake.lt(windowMaxCap)) {
    rewardAmount = approvedAmount.times(windowRewardAmount).div(windowTotalStake);
  } else {
    rewardAmount = approvedAmount.times(windowRewardAmount).div(windowMaxCap);
  }

  return rewardAmount;
};

export const yourStakeDetails = stakeDetails => [
  {
    title: "Total Claim Amount",
    value: parseInt(fromWei(stakeDetails.approvedAmount)) + parseInt(fromWei(stakeDetails.pendingForApprovalAmount)),
    unit: "AGI",
    toolTip:
      "Total AGI tokens you can claim for this stake session. This includes the original accepted stake amount plus the reward earnings amount.",
  },
  {
    title: "Reward Earnings",
    value: fromWei(computeReward(stakeDetails)),
    unit: "AGI",
    toolTip: "The amount of AGI tokens you’ll earn as reward for your stake during this incubation period",
  },
  {
    title: "Incubating Ended",
    value: moment.unix(stakeDetails.endPeriod).format("DD MMM YYYY"),
    unit: " ",
    toolTip: "The incubation period completion date.",
  },
];

export const sessionDetails = stakeDetails => [
  {
    title: "Stakers",
    value: stakeDetails.numOfStakers,
    unit: "people",
    toolTip: "Current number of participants who have contributed AGI tokens to the stake",
  },
  {
    title: "Stake Pool Size",
    value: fromWei(stakeDetails.windowTotalStake),
    unit: "AGI",
    toolTip: "The total amount of AGI tokens that have been contributed by all stakers",
  },
  {
    title: "Reward Pool",
    value: fromWei(stakeDetails.rewardAmount),
    unit: "AGI",
    toolTip: "Number of AGI tokens that will be divided amongst all stakers as the reward for the current window",
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
    action: "withdrawStake",
    color: "primary",
    variant: "contained",
    text: "reclaim stake",
  },
  {
    action: "claimStake",
    color: "primary",
    variant: "contained",
    text: "withdraw claim",
  },
];
