import React from "react";

import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";

import {
    getStaticFeedback, StaticFeedback
} from "../../../../../../../../logic/daily.details.util";
import staticFeelings from "../../../../../../../../logic/static/static.feelings";
import staticSubjects from "../../../../../../../../logic/static/static.subjects";
import { Feeling, Subject } from "../../../../../../../../types/shared";
import UserAvatar from "../../../../../../../generic/user-avatar/UserAvatar";
import { DailyDetailsType } from "./DailyFeedback";
import styles from "./DailyFeedbackItem.styles";

interface DailyFeedbackItemProps {
  type: DailyDetailsType;
  data: Subject | Feeling;
}

const DailyFeedbackItem: React.FC<DailyFeedbackItemProps> = ({
  type,
  data,
}) => {
  const classes = styles();

  let staticElement: StaticFeedback | undefined;
  let text = "";

  switch (type) {
    case DailyDetailsType.Subject:
      staticElement = getStaticFeedback(staticSubjects, data.type);
      text = (data as Subject).description;
      break;
    case DailyDetailsType.Feeling:
      staticElement = getStaticFeedback(staticFeelings, data.type);
      text = (data as Feeling).comment;
      break;
  }

  if (!staticElement) return null;

  const Icon = staticElement.icon;
  return (
    <ListItem
      disableGutters
      alignItems="flex-start"
      title="Daily feedback item"
    >
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
            {staticElement.label} by
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
