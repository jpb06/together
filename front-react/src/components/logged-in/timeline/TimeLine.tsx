import React from "react";

import { Grid } from "@material-ui/core";
import TimerIcon from "@material-ui/icons/Timer";

import { isTimelineEmpty } from "../../../logic/timeline.util";
import { TimeLine as TimeLineType } from "../../../types/shared";
import TopLevelFeedback from "../../generic/feedback/TopLevelFeedback";
import TimelineSection from "./section/TimeLineSection";
import styles from "./TimeLine.styles";

interface TimeLineProps {
  timeline: TimeLineType | null;
}

const TimeLine: React.FC<TimeLineProps> = ({ timeline }) => {
  const classes = styles();

  if (!timeline) return null;

  const isEmpty = isTimelineEmpty(timeline);

  return (
    <Grid container spacing={1} direction="row" className={classes.withMargin}>
      <Grid item md={12} xs={12}>
        {!isEmpty && <h1>Timeline</h1>}
        {timeline.userEvents.length > 0 && (
          <TimelineSection title={"Your events"} data={timeline.userEvents} />
        )}
        {timeline.currentTeam && (
          <TimelineSection
            key={timeline.currentTeam.id}
            title={`Team ${timeline.currentTeam.name}`}
            data={timeline.currentTeam.events}
          />
        )}
        {isEmpty && (
          <TopLevelFeedback
            Icon={TimerIcon}
            title="Well well..."
            content={
              <div>
                Looks like there is nothing to show yet...
                <br />
                Time for a daily?
              </div>
            }
          />
        )}
      </Grid>
    </Grid>
  );
};

export default TimeLine;
