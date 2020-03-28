import React from "react";
import styles from "./TimelineStepTitle.styles";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core";

interface TimelineStepTitleProps {
  IconComponent: OverridableComponent<SvgIconTypeMap>;
  text?: string;
}

const TimelineStepTitle: React.FC<TimelineStepTitleProps> = ({
  IconComponent,
  text = ""
}) => {
  const classes = styles();

  return (
    <div>
      <span className={classes.root}>
        <span className={classes.icon}>
          <IconComponent />
        </span>
        <span className={classes.content}>{text}</span>
      </span>
    </div>
  );
};

export default TimelineStepTitle;
