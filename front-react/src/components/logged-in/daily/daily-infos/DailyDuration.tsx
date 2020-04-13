import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import styles from "./DailyDuration.styles";
import staticDurations from "../../../../logic/static/static.durations";
import DailyType from "../../../../types/daily.type";
import setDailyDurationAction from "../../../../redux/actions/daily/set.daily.duration.action";
import { useReduxDispatch } from "../../../../hooks/redux.hooks";
import { splittedDateToString } from "../../../../logic/date.util";

interface DailyDurationProps {
  daily: DailyType;
}

const DailyDuration: React.FC<DailyDurationProps> = ({ daily }) => {
  const classes = styles();

  const dispatch = useReduxDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = splittedDateToString(daily.day, daily.month, daily.year);
    dispatch(setDailyDurationAction(daily.teamId, date, event.target.value));
  };

  return (
    <div>
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
    </div>
  );
};

export default DailyDuration;
