import { fromWei } from "../../Utils/GenHelperFunctions";

export const cardDetails = activeStake => [
  {
    title: "Stack Session",
    value: fromWei(activeStake.myStake),
    unit: "AGI",
  },
  {
    title: "Max Reward",
    value: fromWei(Math.floor((activeStake.myStake * activeStake.rewardAmount) / activeStake.windowMaxCap)),
    unit: "AGI",
  },
  {
    title: "Incubating Period",
    value: Math.floor((activeStake.endPeriod - activeStake.submissionEndPeriod) / (60 * 60 * 24)),
    unit: "days",
  },
  {
    title: "Current Stakers",
    value: activeStake.totalStakers,
    unit: "people",
  },
  {
    title: "Current Pool Size",
    value: fromWei(activeStake.totalStakedAmount),
    unit: "AGI",
  },
  {
    title: "Max Pool Size",
    value: fromWei(activeStake.windowMaxCap),
    unit: "AGI",
  },
];

export const btnDetails = [
  {
    action: "withdraw",
    color: "primary",
    variant: "text",
    text: "widthdraw",
  },
  {
    action: "addStake",
    color: "primary",
    variant: "contained",
    text: "add stake amount",
  },
];

export const agreementDetails = {
  label: "Auto Renew to next stake session",
  description:
    "Renewing stakes (and profit margins) to the next avaliable stake session gives you priority over new stakers. Renewing stakes avoids the minimum and maximum AGI requirements. Renewing saves you in ETH gas cost.",
};

export const withdrawStakeAmountDetails = activeStake => [
  {
    title: "Total Stake Amount",
    amount: fromWei(activeStake.myStake),
  },
  {
    title: "Total Max Reward",
    amount: fromWei(Math.floor((activeStake.myStake * activeStake.rewardAmount) / activeStake.windowMaxCap)),
  },
  {
    title: "Current Pool Size",
    amount: fromWei(activeStake.totalStakedAmount),
  },
  {
    title: "Max Pool Size",
    amount: fromWei(activeStake.windowMaxCap),
  },
];

export const addStakeAmountDetails = activeStake => [
  {
    title: "Total Stake Amount",
    amount: fromWei(activeStake.myStake),
  },
  {
    title: "Total Max Reward",
    amount: fromWei(Math.floor((activeStake.myStake * activeStake.rewardAmount) / activeStake.windowMaxCap)),
  },
  {
    title: "Current Pool Size",
    amount: fromWei(activeStake.totalStakedAmount),
  },
  {
    title: "Max Pool Size",
    amount: fromWei(activeStake.windowMaxCap),
  },
];
