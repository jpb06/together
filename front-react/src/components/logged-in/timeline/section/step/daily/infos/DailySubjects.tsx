import React from "react";
import DailyFeedback, {
  DailyFeelingsSubjectProps,
  DailyDetailsType,
} from "./subjects-feelings/DailyFeedback";

const DailySubjects: React.FC<DailyFeelingsSubjectProps> = ({ daily }) => (
  <DailyFeedback type={DailyDetailsType.Subject} data={daily.subjects} />
);

export default DailySubjects;
