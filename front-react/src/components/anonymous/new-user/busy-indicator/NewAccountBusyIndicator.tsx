import Grid from "@material-ui/core/Grid";
import React from "react";
import BusyIndicator, {
  BusyIndicatorColor,
} from "../../../generic/loaders/BusyIndicator";
import styles from "./NewAccountBusyIndicator.styles";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core";

interface NewAccountBusyIndicatorProps {
  text: string;
  IconComponent: OverridableComponent<SvgIconTypeMap>;
}

const NewAccountBusyIndicator: React.FC<NewAccountBusyIndicatorProps> = ({
  text,
  IconComponent,
}) => {
  const classes = styles();

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.waitingContainer}
    >
      <BusyIndicator
        text={text}
        color={BusyIndicatorColor.Amber}
        IconComponent={IconComponent}
        hasTopPadding={false}
      />
    </Grid>
  );
};

export default NewAccountBusyIndicator;
