import React from "react";

import List from "@material-ui/core/List";
import AssignmentLateIcon from "@material-ui/icons/AssignmentLate";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import ForumIcon from "@material-ui/icons/Forum";

import { dailyHasData } from "../../../../../../logic/daily.util";
import { Daily as DailyType } from "../../../../../../stack-shared-code/types";
import styles from "./Daily.styles";
import DailySection from "./DailySection";
import DailyDuration from "./infos/DailyDuration";
import DailyFeelings from "./infos/DailyFeelings";
import DailySubjects from "./infos/DailySubjects";
import DailyTickets from "./infos/DailyTickets";

interface DailyProps {
  daily: DailyType;
}

const Daily: React.FC<DailyProps> = ({ daily }) => {
  const classes = styles();

  if (dailyHasData(daily)) {
    return (
      <List disablePadding title="Daily">
        <DailyDuration durationIndicator={daily.durationIndicator} />
        {(daily.unforeseenTickets.length > 0 ||
          daily.doneTickets.length > 0) && (
          <DailySection
            title="Tickets"
            IconComponent={AssignmentLateIcon}
            ContentComponent={DailyTickets}
            daily={daily}
          />
        )}
        {daily.subjects.length > 0 && (
          <DailySection
            title="Retrospective subjects"
            IconComponent={ForumIcon}
            ContentComponent={DailySubjects}
            daily={daily}
          />
        )}
        {daily.feelings.length > 0 && (
          <DailySection
            title="Feelings"
            IconComponent={EmojiEmotionsIcon}
            ContentComponent={DailyFeelings}
            daily={daily}
          />
        )}
      </List>
    );
  }

  return (
    <div className={classes.noData}>
      Ooops! Looks like nobody had time to give some insight about this daily.
      Time to bump the Scrum Master?
    </div>
  );
};

export default Daily;
