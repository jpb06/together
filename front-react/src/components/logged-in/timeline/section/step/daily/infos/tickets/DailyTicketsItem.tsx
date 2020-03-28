import React from "react";
import { Grid, Chip, Avatar } from "@material-ui/core";
import clsx from "clsx";
import styles from "./DailyTicketsItem.styles";

interface DailyTicketsItemProps {
  label: string;
  count: number;
}

const DailyTicketsItem: React.FC<DailyTicketsItemProps> = ({
  label,
  count
}) => {
  const classes = styles();

  return (
    <Grid item md={count > 0 ? 6 : 12} xs={12}>
      <Chip
        avatar={<Avatar className={classes.warning}>{count}</Avatar>}
        label={label}
        className={clsx(classes.chip, classes.fullWidth)}
      />
    </Grid>
  );
};

export default DailyTicketsItem;
