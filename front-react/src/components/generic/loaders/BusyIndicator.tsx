import clsx from "clsx";
import React from "react";

import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import withStyles from "@material-ui/core/styles/withStyles";

import styles from "./BusyIndicator.styles";

export enum BusyIndicatorColor {
  Amber,
  White,
}

interface BusyIndicatorProps {
  classes: any;
  text: string;
  color: BusyIndicatorColor;
  IconComponent: OverridableComponent<SvgIconTypeMap>;
  hasTopPadding: boolean;
}

const BusyIndicator: React.FC<BusyIndicatorProps> = ({
  classes,
  text,
  color,
  IconComponent,
  hasTopPadding,
}) => {
  return (
    <div
      className={clsx(classes.root, {
        [classes.topPadding]: hasTopPadding,
        [classes.amberColored]: color === BusyIndicatorColor.Amber,
        [classes.whiteColored]: color === BusyIndicatorColor.White,
      })}
    >
      <IconComponent
        titleAccess="busy-icon"
        className={clsx(classes.progressIcon, classes.spinner)}
      />
      <br />
      {text}
    </div>
  );
};

export default withStyles(styles)(BusyIndicator);
