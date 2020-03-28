import React from "react";
import styles from "./StepDivider.styles";

const StepDivider = () => {
  const classes = styles();

  return (
    <div className={classes.container}>
      <span className={classes.lifeLine} />
    </div>
  );
};

export default StepDivider;
