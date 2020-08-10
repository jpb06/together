import React from "react";
import DailyFeedback, {
  DailyFeelingsSubjectProps,
  DailyDetailsType,
} from "./subjects-feelings/DailyFeedback";

const DailyFeelings: React.FC<DailyFeelingsSubjectProps> = ({ daily }) => (
  <DailyFeedback type={DailyDetailsType.Feeling} data={daily.feelings} />
);

export default DailyFeelings;
