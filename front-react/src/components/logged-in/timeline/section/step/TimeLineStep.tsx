import React from "react";
import {
  TimeLineEntryType,
  TimeLineEntryData
} from "../../../../../types/timeline.type";
import TimelineStepTitle from "./TimelineStepTitle";
import TimelineStepContent from "./TimelineStepContent";
import { getIconFromTimelineEntryType } from "../../../../../logic/timeline.util";

interface TimeLineStepProps {
  type: TimeLineEntryType;
  title: string;
  data: TimeLineEntryData;
}

const TimeLineStep: React.FC<TimeLineStepProps> = ({ type, title, data }) => {
  return (
    <div>
      <TimelineStepTitle
        IconComponent={getIconFromTimelineEntryType(type, data)}
        text={title}
      />
      <TimelineStepContent type={type} data={data} />
    </div>
  );
};

export default TimeLineStep;
