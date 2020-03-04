import moment from "moment";
import { fromWei } from "../../Utils/GenHelperFunctions";

export const cardDetails = stakeDetails => [
  {
    title: "Claim Account",
    value: fromWei(stakeDetails.approvedAmount),
    unit: "AGI",
  },
  {
    title: "Reward Earnings",
    value: fromWei(
      Math.floor(
        (stakeDetails.approvedAmount * stakeDetails.rewardAmount) /
          Math.min(stakeDetails.windowTotalStake, stakeDetails.windowMaxCap)
      )
    ),
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
    title: "Max Pool Size",
    value: fromWei(stakeDetails.windowMaxCap),
    unit: "AGI",
  },
];

export const btnDetails = [
  {
    action: "reStake",
    color: "primary",
    variant: "text",
    text: "re-stake",
  },
  {
    action: "claimStake",
    color: "primary",
    variant: "contained",
    text: "widthdraw claim",
  },
];
