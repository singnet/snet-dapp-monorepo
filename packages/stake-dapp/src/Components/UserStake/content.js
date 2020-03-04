import { fromWei } from "../../Utils/GenHelperFunctions";

export const incubationProgressDetails = stakeDetails => ({
  startPeriod: stakeDetails.startPeriod,
  submissionEndPeriod: stakeDetails.submissionEndPeriod,
  endPeriod: stakeDetails.endPeriod,
});

export const cardDetails = stakeDetails => [
  {
    title: "Accepted Stack Amount",
    value: fromWei(stakeDetails.approvedAmount),
    unit: "AGI",
  },
  {
    title: "Reward Amount",
    value: fromWei(
      Math.floor(
        (stakeDetails.approvedAmount * stakeDetails.rewardAmount) /
          Math.min(stakeDetails.windowTotalStake, stakeDetails.windowMaxCap)
      )
    ),
    unit: "AGI",
  },
  {
    title: "Refunded Amount",
    value: "TBD??",
    unit: "AGI",
  },
  {
    title: "Current Stakers",
    value: stakeDetails.numOfStakers,
    unit: "people",
  },
  {
    title: "Current Pool Size",
    value: fromWei(stakeDetails.windowTotalStake),
    unit: "AGI",
  },
  {
    title: "Max Pool Size",
    value: fromWei(stakeDetails.windowMaxCap),
    unit: "AGI",
  },
];

export const agreementDetails = {
  label: "Auto Renew to next stake session",
  description:
    "Renewing stakes (and profit margins) to the next avaliable stake session gives you priority over new stakers. Renewing stakes avoids the minimum and maximum AGI requirements. Renewing saves you in ETH gas cost.",
};
