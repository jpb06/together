import React from "react";
import DailyFeedback, {
  DailyFeelingsSubjectProps,
  DailyFeedbackType
} from "./subjects-feelings/DailyFeedback";

const DailyFeelings: React.FC<DailyFeelingsSubjectProps> = ({ daily }) => {
  return (
    <DailyFeedback type={DailyFeedbackType.Feeling} data={daily.feelings} />
  );
};

export default DailyFeelings;
