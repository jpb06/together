import clsx from "clsx";
import React from "react";

import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import withStyles from "@material-ui/core/styles/withStyles";

import styles from "./TopLevelFeedback.styles";

interface TopLevelFeedbackProps {
  classes: any;
  title: string;
  content: React.ReactNode;
  Icon: OverridableComponent<SvgIconTypeMap>;
}

const TopLevelFeedback: React.FC<TopLevelFeedbackProps> = ({
  classes,
  title,
  content,
  Icon,
}) => {
  return (
    <div className={classes.root}>
      <Icon
        className={clsx(classes.errorIcon, classes.spinner)}
        titleAccess="feedback-icon"
      />
      <div className={classes.title}>{title}</div>
      {content}
    </div>
  );
};

export default withStyles(styles)(TopLevelFeedback);
