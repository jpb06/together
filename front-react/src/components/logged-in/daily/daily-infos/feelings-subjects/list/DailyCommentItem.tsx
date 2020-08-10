import React from "react";

import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";

import { DailyDeleteActionFeedback } from "../../../../../../types/redux";
import { Feeling, Subject } from "../../../../../../types/shared";
import PendingDeleteButton from "../../../../../generic/buttons/PendingDeleteButton";
import UserAvatar from "../../../../../generic/user-avatar/UserAvatar";
import DailyComment from "../DailyComment";
import { NewDailyCommentKind } from "../new-item/NewDailyComment";
import styles from "./DailyCommentItem.styles";

interface DailyCommentItemProps {
  type: NewDailyCommentKind;
  item: Feeling | Subject;
  feedback: DailyDeleteActionFeedback;
  showDivider: boolean;
  onItemDeletion: (id: string) => void;
}

const DailyCommentItem: React.FC<DailyCommentItemProps> = ({
  type,
  item,
  feedback,
  showDivider,
  onItemDeletion,
}) => {
  const classes = styles();
  const handleRemoval = () => onItemDeletion(item.id);

  const itemText =
    type === NewDailyCommentKind.Feeling
      ? (item as Feeling).comment
      : (item as Subject).description;

  return (
    <ListItem divider={showDivider}>
      <ListItemAvatar className={classes.avatarContainer}>
        <UserAvatar isBigAvatar={false} user={item.creator} />
      </ListItemAvatar>
      <ListItemText
        className={classes.breakWord}
        primary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              className={classes.user}
              color="textPrimary"
            >
              {`${item.creator.firstName} ${item.creator.lastName}`}
            </Typography>
            <DailyComment type={type} underlyingType={item.type} />
          </React.Fragment>
        }
        secondary={itemText}
      />
      <ListItemSecondaryAction>
        <Grid container>
          <Grid>
            {feedback.term === item.id && feedback.isPending ? (
              <PendingDeleteButton />
            ) : (
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={handleRemoval}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default DailyCommentItem;
