import Grid from "@material-ui/core/Grid";
import React from "react";
import clsx from "clsx";
import styles from "./StepTitle.styles";

interface StepTitleProps {
  title: string;
  description?: string;
}

const StepTitle: React.FC<StepTitleProps> = ({ title, description }) => {
  const classes = styles();

  return (
    <Grid item xs={12} sm={12} className={classes.centered}>
      <h3
        className={clsx(classes.stepTitle, {
          [classes.withBottomMargin]: !description,
        })}
      >
        {title}
      </h3>
      {description && <div>{description}</div>}
    </Grid>
  );
};

export default StepTitle;
