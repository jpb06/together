import React from "react";
import DailyFeedback, {
  DailyFeelingsSubjectProps,
  DailyFeedbackType
} from "./subjects-feelings/DailyFeedback";

const DailySubjects: React.FC<DailyFeelingsSubjectProps> = ({ daily }) => {
  return (
    <DailyFeedback type={DailyFeedbackType.Subject} data={daily.subjects} />
  );
};

export default DailySubjects;
