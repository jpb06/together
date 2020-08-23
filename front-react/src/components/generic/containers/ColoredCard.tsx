import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

interface ColoredCardProps {
  backgroundColor: string;
  children: JSX.Element;
}

const ColoredCard: React.FC<ColoredCardProps> = React.forwardRef(
  (props, ref) => (
    <Card ref={ref} style={{ backgroundColor: props.backgroundColor }}>
      <CardContent>{props.children}</CardContent>
    </Card>
  )
);

export default ColoredCard;
