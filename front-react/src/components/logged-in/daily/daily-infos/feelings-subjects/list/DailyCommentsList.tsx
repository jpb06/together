import React from "react";

import List from "@material-ui/core/List";

import { DailyDeleteActionFeedback } from "../../../../../../types/redux";
import { Feeling, Subject } from "../../../../../../types/shared";
import { NewDailyCommentKind } from "../new-item/NewDailyComment";
import DailyComment from "./DailyCommentItem";
import styles from "./DailyCommentsList.styles";

interface DailyCommentsListProps {
  type: NewDailyCommentKind;
  list: Array<Feeling | Subject>;
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
