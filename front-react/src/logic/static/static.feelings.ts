import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentVeryDissatisfiedOutlinedIcon from "@material-ui/icons/SentimentVeryDissatisfiedOutlined";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

import { FeelingKind } from "../../types/shared";
import { StaticFeedback } from "../daily.details.util";

const staticFeelings: Array<StaticFeedback> = [
  {
    value: FeelingKind.ThumbsUp,
    label: "Thumbs up",
    showDivider: false,
    icon: ThumbUpIcon,
  },
  {
    value: FeelingKind.ThumbDown,
    label: "Thumb down",
    showDivider: true,
    icon: ThumbDownIcon,
  },
  {
    value: FeelingKind.Satisfaction,
    label: "Satisfaction",
    showDivider: false,
    icon: SentimentSatisfiedIcon,
  },
  {
    value: FeelingKind.DyingInside,
    label: "Dying inside",
    showDivider: false,
    icon: SentimentVeryDissatisfiedOutlinedIcon,
  },
];

export default staticFeelings;
