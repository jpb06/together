import React from "react";

import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import TimerIcon from "@material-ui/icons/Timer";

import staticDurations from "../../../../../../../logic/static/static.durations";
import styles from "./DailyDuration.styles";

interface DailyDurationProps {
  durationIndicator: string;
}

const DailyDuration: React.FC<DailyDurationProps> = ({ durationIndicator }) => {
  const classes = styles();

  const getDurationDescription = () => {
    const matches = staticDurations.filter(
      (el) => el.value === durationIndicator
    );
    if (matches.length === 1) {
      return matches[0].label;
    } else {
      return "An error occured while retrieving the daily duration";
    }
  };

  if (durationIndicator.length === 0) return null;

  return (
    <>
      <ListItem
        disableGutters
        className={classes.dailyItem}
        title="Daily duration"
      >
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
    </>
  );
};

export default DailyDuration;
