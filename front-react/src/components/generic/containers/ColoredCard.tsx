import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import React from "react";
import { makeStyles } from "@material-ui/core";

interface ColoredCardProps {
  color: string;
  children: JSX.Element;
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: (props: ColoredCardProps) => props.color,
  },
}));

const ColoredCard: React.FC<ColoredCardProps> = React.forwardRef(
  (props, ref) => {
    const classes = useStyles(props);

    return (
      <Card ref={ref} className={classes.root}>
        <CardContent>{props.children}</CardContent>
      </Card>
    );
  }
);

export default ColoredCard;
