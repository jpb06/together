import React from "react";
import Grid from "@material-ui/core/Grid";
import styles from "./Daily.styles";
import DailyType from "../../../types/daily.type";
import { TeamMember } from "../../../types/user.type";
import DailyReportContentBox from "./composition/DailyReportContentBox";
import DailyUnforeseenTickets from "./daily-infos/DailyUnforeseenTickets";
import DailyDoneTickets from "./daily-infos/DailyDoneTickets";
import { useReduxSelector } from "../../../hooks/redux.hooks";
import DailyDuration from "./daily-infos/DailyDuration";
import DailySubjects from "./daily-infos/DailySubjects";
import DailyFeelings from "./daily-infos/DailyFeelings";

interface DailyProps {
  daily: DailyType;
  teamMembers: Array<TeamMember>;
}

const Daily: React.FC<DailyProps> = ({ daily, teamMembers }) => {
  const classes = styles();

  const durationFeedback = useReduxSelector(
    (state) => state.dailyDurationFeedback
  );
  const unforeseenTicketsFeedback = useReduxSelector(
    (state) => state.dailyUnforeseenTicketsFeedback
  );
  const doneTicketsFeedback = useReduxSelector(
    (state) => state.dailyDoneTicketsFeedback
  );
  const subjectsFeedback = useReduxSelector(
    (state) => state.dailySubjectsFeedback
  );
  const feelingsFeedback = useReduxSelector(
    (state) => state.dailyFeelingsFeedback
  );

  return (
    <Grid container spacing={1} direction="row" className={classes.withMargin}>
      <Grid item md={12} xs={12}>
        <DailyReportContentBox
          title="Daily duration"
          ContentComponent={DailyDuration}
          data={{ daily }}
          feedback={durationFeedback.globalFeedback}
        />
      </Grid>
      <Grid item md={12} xs={12}>
        <h1>What happened since the last daily ?</h1>
      </Grid>
      <Grid item md={6} xs={12}>
        <DailyReportContentBox
          title="Unforeseen tickets"
          ContentComponent={DailyUnforeseenTickets}
          data={{
            daily,
            ...unforeseenTicketsFeedback,
          }}
          feedback={unforeseenTicketsFeedback.globalFeedback}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <DailyReportContentBox
          title="Done tickets"
          ContentComponent={DailyDoneTickets}
          data={{ daily, teamMembers, ...doneTicketsFeedback }}
          feedback={doneTicketsFeedback.globalFeedback}
        />
      </Grid>
      <Grid item md={12} xs={12}>
        <h1>Is there something else worth noting?</h1>
      </Grid>
      <Grid item md={6} xs={12}>
        <DailyReportContentBox
          title="Retrospective subjects"
          ContentComponent={DailySubjects}
          data={{ daily, ...subjectsFeedback }}
          feedback={subjectsFeedback.globalFeedback}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <DailyReportContentBox
          title="Feelings"
          ContentComponent={DailyFeelings}
          data={{ daily, ...feelingsFeedback }}
          feedback={feelingsFeedback.globalFeedback}
        />
      </Grid>
    </Grid>
  );
};

export default Daily;
