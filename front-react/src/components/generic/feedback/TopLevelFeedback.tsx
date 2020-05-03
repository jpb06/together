import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import clsx from "clsx";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core";
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
  Icon
}) => {
  return (
    <div className={classes.root}>
      <Icon className={clsx(classes.errorIcon, classes.spinner)} />
      <div className={classes.title}>{title}</div>
      {content}
    </div>
  );
};

export default withStyles(styles)(TopLevelFeedback);
