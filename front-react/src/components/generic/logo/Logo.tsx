import Grid from "@material-ui/core/Grid";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import React from "react";
import { Typography } from "@material-ui/core";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import styles from "./Logo.styles";

export enum LogoColor {
  Primary,
  Secondary,
  White
}

interface LogoProps {
  color: LogoColor;
  isCentered?: boolean;
  isLargeFont?: boolean;
  hasDescriptionText?: boolean;
  isIndexLinkDisabled?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  color,
  isCentered = true,
  isLargeFont = false,
  hasDescriptionText = false,
  isIndexLinkDisabled = false
}) => {
  const classes = styles();
  return (
    <div className={classes.container}>
      <Grid
        container
        justify={isCentered ? "center" : "flex-start"}
        direction="row"
        className={clsx(classes.logo, {
          [classes.logoColorPrimary]: color === LogoColor.Primary,
          [classes.logoColorSecondary]: color === LogoColor.Secondary,
          [classes.logoColorWhite]: !color || color === LogoColor.White
        })}
        component={NavLink}
        to={isIndexLinkDisabled ? "" : "/main"}
      >
        <Grid
          item
          className={clsx({
            [classes.largeFont]: isLargeFont,
            [classes.normalFont]: !isLargeFont
          })}
          style={{ alignSelf: "center" }}
        >
          Together
        </Grid>
        <Grid item>
          <SupervisedUserCircleIcon />
        </Grid>
      </Grid>
      {hasDescriptionText && (
        <Typography style={{ fontSize: "x-small", textAlign: "center" }}>
          A tool for SCRUM teams
        </Typography>
      )}
    </div>
  );
};

export default Logo;
