import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import styles from "./DailyFeedbackItem.styles";
import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";
import Subject from "../../../../../../../../types/subject.type";
import UserAvatar from "../../../../../../../generic/user-avatar/UserAvatar";
import Feeling from "../../../../../../../../types/feeling.type";
import staticSubjects from "../../../../../../../../logic/static/static.subjects";
import staticFeelings from "../../../../../../../../logic/static/static.feelings";
import {
  getStaticFeedback,
  StaticFeedback,
} from "../../../../../../../../logic/static/static.feedback.util";
import { DailyFeedbackType } from "./DailyFeedback";

interface DailyFeedbackItemProps {
  type: DailyFeedbackType;
  data: Subject | Feeling;
}

const DailyFeedbackItem: React.FC<DailyFeedbackItemProps> = ({
  type,
  data,
}) => {
  const classes = styles();

  let staticElement: StaticFeedback | null = null;
  let text = "";

  if (type === DailyFeedbackType.Subject) {
    staticElement = getStaticFeedback(staticSubjects, data.type);
    text = (data as Subject).description;
  } else if (type === DailyFeedbackType.Feeling) {
    staticElement = getStaticFeedback(staticFeelings, data.type);
    text = (data as Feeling).comment;
  }

  const Icon = staticElement?.icon || NotListedLocationIcon;

  return (
    <ListItem disableGutters alignItems="flex-start">
      <ListItemAvatar className={classes.avatarContainer}>
        <Badge
          overlap="circle"
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          badgeContent={
            <Avatar className={classes.badge}>
              <Icon className={classes.badgeIcon} />
            </Avatar>
          }
        >
          <UserAvatar user={data.creator} />
        </Badge>
      </ListItemAvatar>
      <div>
        <div className={classes.feedbackTitle}>
          <Typography
            component="span"
            variant="body2"
            color="primary"
            className={classes.feedbackType}
          >
            {staticElement?.label} by
          </Typography>
          <Typography
            component="span"
            variant="body2"
            color="textPrimary"
            className={classes.userName}
          >
            {`${data.creator.firstName} ${data.creator.lastName}`}
          </Typography>
        </div>
        <div className={classes.feedbackText}>{text}</div>
      </div>
    </ListItem>
  );
};

export default DailyFeedbackItem;
