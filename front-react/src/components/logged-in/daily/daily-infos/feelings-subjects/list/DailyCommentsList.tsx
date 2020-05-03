import React from "react";
import List from "@material-ui/core/List";
import styles from "./DailyCommentsList.styles";
import FeelingType from "../../../../../../types/feeling.type";
import SubjectType from "../../../../../../types/subject.type";
import DailyComment from "./DailyCommentItem";
import { NewDailyCommentKind } from "../new-item/NewDailyComment";
import { DailyDeleteActionFeedback } from "../../../../../../redux/types/daily.feedback.type";

interface DailyCommentsListProps {
  type: NewDailyCommentKind;
  list: Array<FeelingType | SubjectType>;
  NoDataIconComponent: React.ElementType;
  feedback: DailyDeleteActionFeedback;
  onItemDeletion: (id: string) => void;
}

const DailyCommentsList: React.FC<DailyCommentsListProps> = ({
  type,
  list,
  NoDataIconComponent,
  feedback,
  onItemDeletion,
}) => {
  const classes = styles();

  return list.length === 0 ? (
    <NoDataIconComponent
      fontSize="large"
      color="primary"
      className={classes.noDataIcon}
    />
  ) : (
    <List dense className={classes.fullWidth}>
      {list.map((item, index) => (
        <DailyComment
          key={item.id}
          type={type}
          item={item}
          feedback={feedback}
          showDivider={index !== list.length - 1}
          onItemDeletion={onItemDeletion}
        />
      ))}
    </List>
  );
};

export default DailyCommentsList;
