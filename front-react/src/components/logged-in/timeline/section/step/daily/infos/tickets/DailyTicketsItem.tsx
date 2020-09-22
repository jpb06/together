import clsx from "clsx";
import React from "react";

import { Avatar, Chip, Grid } from "@material-ui/core";

import styles from "./DailyTicketsItem.styles";

interface DailyTicketsItemProps {
  label: string;
  count: number;
}

const DailyTicketsItem: React.FC<DailyTicketsItemProps> = ({
  label,
  count,
}) => {
  const classes = styles();

  return (
    <Grid item md={12} xs={12}>
      <Chip
        avatar={<Avatar className={classes.warning}>{count}</Avatar>}
        label={label}
        className={clsx(classes.chip, classes.fullWidth)}
      />
    </Grid>
  );
};

export default DailyTicketsItem;
