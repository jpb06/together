import React from "react";

import { withStyles } from "@material-ui/core";
import { amber } from "@material-ui/core/colors";
import LinearProgress from "@material-ui/core/LinearProgress";
import { lighten } from "@material-ui/core/styles";

const StyledLinearProgress = (color: string) => () =>
  withStyles({
    root: {
      height: 10,
      backgroundColor: lighten(color, 0.7),
    },
    bar: {
      backgroundColor: color,
    },
  })(LinearProgress);

export enum FatProgressColor {
  Amber,
}

export interface ColoredFatLinearProgressProps {
  variant?: "determinate" | "indeterminate" | "buffer" | "query";
  color: FatProgressColor;
}

const ColoredFatLinearProgress: React.FC<ColoredFatLinearProgressProps> = ({
  variant,
  color,
}) => {
  let componentColor = "";
  switch (color) {
    case FatProgressColor.Amber:
      componentColor = amber[500];
      break;
  }

  const LinearProgress = StyledLinearProgress(componentColor)();

  return <LinearProgress aria-label="fat-progress" variant={variant} />;
};

export default ColoredFatLinearProgress;
