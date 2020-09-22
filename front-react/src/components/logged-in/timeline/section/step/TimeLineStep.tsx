import React from "react";

import { getIconFromTimelineEntryType } from "../../../../../logic/timeline.util";
import { TimeLineEntryData, TimeLineEntryKind } from "../../../../../stack-shared-code/types";
import TimelineStepContent from "./TimelineStepContent";
import TimelineStepTitle from "./TimelineStepTitle";

interface TimeLineStepProps {
  type: TimeLineEntryKind;
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
