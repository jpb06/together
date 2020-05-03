import { Grid } from "@material-ui/core";
import React from "react";
import styles from "./TimeLine.styles";
import TimerIcon from "@material-ui/icons/Timer";
import TopLevelFeedback from "../../generic/feedback/TopLevelFeedback";
import TimelineSection from "./section/TimeLineSection";
import TimeLineType from "./../../../types/timeline.type";
import { isTimelineEmpty } from "../../../logic/timeline.util";

interface TimeLineProps {
  timeline: TimeLineType;
}

const TimeLine: React.FC<TimeLineProps> = ({ timeline }) => {
  const classes = styles();

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
