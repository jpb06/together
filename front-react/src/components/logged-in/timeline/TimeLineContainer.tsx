import React from "react";
import TimeLine from "./TimeLine";
import { useReduxSelector } from "../../../hooks/redux.hooks";
import TimeLineType from "../../../types/timeline.type";
import useTimelineLoading from "../../../hooks/useTimelineLoading.hook";
import WithLoading from "../WithLoading";

const TimeLineContainer: React.FC = () => {
  const timeline = useReduxSelector(state => state.timeline);
  const isErrored = useReduxSelector(state => state.error !== null);

  useTimelineLoading();

  const isReady = timeline ? true : false;

  return (
    <WithLoading
      isErrored={isErrored}
      isReady={isReady}
      feedbackText="Turns out we couldn't fetch the user timeline"
      Component={TimeLine}
      ComponentProps={{ timeline: timeline as TimeLineType }}
    />
  );
};

export default TimeLineContainer;
