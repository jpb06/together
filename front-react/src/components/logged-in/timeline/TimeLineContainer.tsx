import React from "react";
import TimeLine from "./TimeLine";
import TimeLineType from "../../../types/timeline.type";
import useTimelineLoading from "../../../hooks/useTimelineLoading.hook";
import WithLoadingAndErrors from "../composition/WithLoadingAndErrors";

const TimeLineContainer: React.FC = () => {
  const [timeline, isReady] = useTimelineLoading();

  return (
    <WithLoadingAndErrors
      isReady={isReady}
      feedbackText="Turns out we couldn't fetch the user timeline"
      Component={TimeLine}
      ComponentProps={{ timeline: timeline as TimeLineType }}
    />
  );
};

export default TimeLineContainer;
