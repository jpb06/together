import React from "react";
import LoopIcon from "@material-ui/icons/Loop";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import TimeLine from "./TimeLine";
import TopLevelFeedback from "../../feedback/TopLevelFeedback";
import WaitingIndicator from "../../feedback/WaitingIndicator";
import { useReduxSelector } from "../../../hooks/redux.hooks";
import TimeLineType from "../../../types/timeline.type";
import useTimelineLoading from "../../../hooks/useTimelineLoading.hook";

const TimeLineContainer: React.FC = () => {
  const timeline = useReduxSelector(state => state.timeline);
  const isErrored = useReduxSelector(state => state.error !== null);

  useTimelineLoading();

  if (isErrored)
    return (
      <TopLevelFeedback
        Icon={SentimentDissatisfiedIcon}
        title="Oh no!"
        content="Turns out we couldn't fetch the user timeline"
      />
    );

  return !timeline ? (
    <WaitingIndicator
      hasTopPadding
      IconComponent={LoopIcon}
      text="Sinister Dexter Has a Broken Spirometer"
    />
  ) : (
    <TimeLine timeline={timeline as TimeLineType} />
  );
};

export default TimeLineContainer;
