import React from "react";
import List from "@material-ui/core/List";
import styles from "./DailyFeedback.styles";
import DailyFeedbackItem from "./DailyFeedbackItem";
import DailyType from "./../../../../../../../../types/daily.type";
import Subject from "../../../../../../../../types/subject.type";
import Feeling from "../../../../../../../../types/feeling.type";

export interface DailyFeelingsSubjectProps {
  daily: DailyType;
}

export enum DailyFeedbackType {
  Subject,
  Feeling
}

interface DailyFeedbackProps {
  type: DailyFeedbackType;
  data: Array<Subject | Feeling>;
}

const DailyFeedback: React.FC<DailyFeedbackProps> = ({ type, data }) => {
  const classes = styles();

  return (
    <List disablePadding className={classes.root}>
      {data.map(el => (
        <DailyFeedbackItem key={el.id} type={type} data={el} />
      ))}
    </List>
  );
};

export default DailyFeedback;
