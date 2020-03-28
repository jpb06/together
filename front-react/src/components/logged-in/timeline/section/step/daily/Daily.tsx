import React from "react";
import List from "@material-ui/core/List";
import AssignmentLateIcon from "@material-ui/icons/AssignmentLate";
import ForumIcon from "@material-ui/icons/Forum";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import styles from "./Daily.styles";
import DailyType from "../../../../../../types/daily.type";
import DailyDuration from "./infos/DailyDuration";
import DailySection from "./DailySection";
import DailyTickets from "./infos/DailyTickets";
import DailySubjects from "./infos/DailySubjects";
import DailyFeelings from "./infos/DailyFeelings";
import { dailyHasData } from "../../../../../../logic/daily.util";

interface DailyProps {
  daily: DailyType;
}

const Daily: React.FC<DailyProps> = ({ daily }) => {
  const classes = styles();

  if (dailyHasData(daily)) {
    return (
      <List disablePadding>
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
