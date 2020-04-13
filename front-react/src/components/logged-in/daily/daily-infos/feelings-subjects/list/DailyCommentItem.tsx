import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import UserAvatar from "../../../../../generic/user-avatar/UserAvatar";
import PendingDeleteButton from "../../../../../generic/buttons/PendingDeleteButton";
import { DailyDeleteActionFeedback } from "../../../../../../redux/store/root.state";
import FeelingType from "../../../../../../types/feeling.type";
import SubjectType from "../../../../../../types/subject.type";
import styles from "./DailyCommentItem.styles";
import DailyComment from "../DailyComment";
import { NewDailyCommentKind } from "../new-item/NewDailyComment";

interface DailyCommentItemProps {
  type: NewDailyCommentKind;
  item: FeelingType | SubjectType;
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
      ? (item as FeelingType).comment
      : (item as SubjectType).description;

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
