import LensIcon from "@material-ui/icons/Lens";
import Paper from "@material-ui/core/Paper";
import React from "react";
import styles from "./TimeLineSection.styles";
import TimeLineStep from "./step/TimeLineStep";
import {
  UserTimeLineEntry,
  TeamTimeLineEntry
} from "../../../../types/timeline.type";
import TimelineStepTitle from "./step/TimelineStepTitle";

interface TimelineSectionProps {
  title: string;
  data: Array<UserTimeLineEntry | TeamTimeLineEntry>;
}

const TimelineSection: React.FC<TimelineSectionProps> = ({ title, data }) => {
  const classes = styles();

  return (
    <Paper className={classes.container}>
      <h3 className={classes.title}>{title}</h3>
      {data.map((el: TeamTimeLineEntry | UserTimeLineEntry) => (
        <TimeLineStep
          key={el.entry.id}
          type={el.type}
          title={el.shortTitle}
          data={el.entry}
        />
      ))}
      <TimelineStepTitle IconComponent={LensIcon} />
    </Paper>
  );
};

export default TimelineSection;
