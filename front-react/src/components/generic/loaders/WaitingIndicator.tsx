import clsx from "clsx";
import React from "react";

import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import withStyles from "@material-ui/core/styles/withStyles";

import styles from "./WaitingIndicator.styles";

export enum WaitingIndicatorcolors {
  Amber,
  White,
}

interface WaitingIndicatorProps {
  classes: any;
  IconComponent: OverridableComponent<SvgIconTypeMap>;
  text: string;
  color?: WaitingIndicatorcolors;
  hasTopPadding?: boolean;
  hasBottomMargin?: boolean;
}

const WaitingIndicator: React.FC<WaitingIndicatorProps> = ({
  classes,
  IconComponent,
  text,
  color = WaitingIndicatorcolors.White,
  hasTopPadding = false,
  hasBottomMargin = false,
}) => {
  return (
    <div
      className={clsx(classes.root, {
        [classes.topPadding]: hasTopPadding,
        [classes.bottomMargin]: hasBottomMargin,
        [classes.amberColored]: color === WaitingIndicatorcolors.Amber,
        [classes.whiteColored]: color === WaitingIndicatorcolors.White,
      })}
    >
      <IconComponent
        titleAccess="waiting-icon"
        className={clsx(classes.progressIcon, classes.spinner)}
      />
      <br />
      {text}
    </div>
  );
};

export default withStyles(styles)(WaitingIndicator);
