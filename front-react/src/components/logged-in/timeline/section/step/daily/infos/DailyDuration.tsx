import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import TimerIcon from "@material-ui/icons/Timer";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import React from "react";
import styles from "./DailyDuration.styles";
import staticDurations from "../../../../../../../logic/static/static.durations";

interface DailyDurationProps {
  durationIndicator: string;
}

const DailyDuration: React.FC<DailyDurationProps> = ({ durationIndicator }) => {
  const classes = styles();

  const getDurationDescription = () => {
    const matches = staticDurations.filter(
      el => el.value === durationIndicator
    );
    if (matches.length === 1) {
      return matches[0].label;
    } else {
      return "";
    }
  };

  if (durationIndicator.length > 0) {
    return (
      <div>
        <ListItem disableGutters className={classes.dailyItem}>
          <ListItemAvatar className={classes.dailyItemIcon}>
            <Avatar className={classes.secondaryColor}>
              <TimerIcon color="primary" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            className={classes.title}
            primary="Duration"
            secondary={getDurationDescription()}
          />
        </ListItem>
        <Divider component="li" />
      </div>
    );
  } else {
    return null;
  }
};

export default DailyDuration;
