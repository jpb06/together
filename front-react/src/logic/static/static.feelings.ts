import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentVeryDissatisfiedOutlinedIcon from "@material-ui/icons/SentimentVeryDissatisfiedOutlined";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import { StaticFeedback } from "./static.feedback.util";

export enum FeelingType {
  ThumbsUp = 1,
  ThumbDown = 2,
  Satisfaction = 3,
  DyingInside = 4
}

const staticFeelings: Array<StaticFeedback> = [
  {
    value: FeelingType.ThumbsUp,
    label: "Thumbs up",
    showDivider: false,
    icon: ThumbUpIcon
  },
  {
    value: FeelingType.ThumbDown,
    label: "Thumb down",
    showDivider: true,
    icon: ThumbDownIcon
  },
  {
    value: FeelingType.Satisfaction,
    label: "Satisfaction",
    showDivider: false,
    icon: SentimentSatisfiedIcon
  },
  {
    value: FeelingType.DyingInside,
    label: "Dying inside",
    showDivider: false,
    icon: SentimentVeryDissatisfiedOutlinedIcon
  }
];

export default staticFeelings;
