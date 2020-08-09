import React from "react";

import Grid from "@material-ui/core/Grid";

import { useRootSelector } from "../../../hooks";
import { dailyFeedbackSelector } from "../../../redux/selectors";
import { Daily as DailyType, TeamMember } from "../../../types/shared";
import DailyReportContentBox from "./composition/DailyReportContentBox";
import DailyDoneTickets from "./daily-infos/DailyDoneTickets";
import DailyDuration from "./daily-infos/DailyDuration";
import DailyFeelings from "./daily-infos/DailyFeelings";
import DailySubjects from "./daily-infos/DailySubjects";
import DailyUnforeseenTickets from "./daily-infos/DailyUnforeseenTickets";
import styles from "./Daily.styles";

interface DailyProps {
  daily: DailyType | null;
  teamMembers: Array<TeamMember>;
}

const Daily: React.FC<DailyProps> = ({ daily, teamMembers }) => {
  const classes = styles();

  const feedback = useRootSelector(dailyFeedbackSelector);

  return (
    <Grid container spacing={1} direction="row" className={classes.withMargin}>
      <Grid item md={12} xs={12}>
        <DailyReportContentBox
          title="Daily duration"
          ContentComponent={DailyDuration}
          data={{ daily }}
          feedback={feedback.dailyDuration.globalFeedback}
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
            ...feedback.unforeseenTickets,
          }}
          feedback={feedback.unforeseenTickets.globalFeedback}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <DailyReportContentBox
          title="Done tickets"
          ContentComponent={DailyDoneTickets}
          data={{ daily, teamMembers, ...feedback.doneTickets }}
          feedback={feedback.doneTickets.globalFeedback}
        />
      </Grid>
      <Grid item md={12} xs={12}>
        <h1>Is there something else worth noting?</h1>
      </Grid>
      <Grid item md={6} xs={12}>
        <DailyReportContentBox
          title="Retrospective subjects"
          ContentComponent={DailySubjects}
          data={{ daily, ...feedback.subjects }}
          feedback={feedback.subjects.globalFeedback}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <DailyReportContentBox
          title="Feelings"
          ContentComponent={DailyFeelings}
          data={{ daily, ...feedback.feelings }}
          feedback={feedback.feelings.globalFeedback}
        />
      </Grid>
    </Grid>
  );
};

export default Daily;
