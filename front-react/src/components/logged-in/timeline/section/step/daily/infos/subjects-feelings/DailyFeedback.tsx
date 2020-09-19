import React from "react";

import List from "@material-ui/core/List";

import {
    Daily as DailyType, Feeling, Subject
} from "../../../../../../../../stack-shared-code/types";
import styles from "./DailyFeedback.styles";
import DailyFeedbackItem from "./DailyFeedbackItem";

export interface DailyFeelingsSubjectProps {
  daily: DailyType;
}

export enum DailyDetailsType {
  Subject = "Subjects",
  Feeling = "Feelings",
}

interface DailyFeedbackProps {
  type: DailyDetailsType;
  data: Array<Subject | Feeling>;
}

const DailyFeedback: React.FC<DailyFeedbackProps> = ({ type, data }) => {
  const classes = styles();

  return (
    <List disablePadding className={classes.root} title={`${type} list`}>
      {data.map((el) => (
        <DailyFeedbackItem key={el.id} type={type} data={el} />
      ))}
    </List>
  );
};

export default DailyFeedback;
