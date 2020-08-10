import React from "react";
import { useDispatch } from "react-redux";

import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

import { splittedDateToString } from "../../../../logic/date.util";
import staticDurations from "../../../../logic/static/static.durations";
import { setDailyDurationAction } from "../../../../redux/actions";
import { Daily as DailyType } from "../../../../types/shared";
import styles from "./DailyDuration.styles";

interface DailyDurationProps {
  daily: DailyType;
}

const DailyDuration: React.FC<DailyDurationProps> = ({ daily }) => {
  const classes = styles();

  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = splittedDateToString(daily.day, daily.month, daily.year);
    dispatch(setDailyDurationAction(daily.teamId, date, event.target.value));
  };

  return (
    <TextField
      select
      className={classes.textField}
      variant="outlined"
      label="How long did it last ?"
      value={daily.durationIndicator}
      onChange={handleChange}
      fullWidth
    >
      {staticDurations.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default DailyDuration;
