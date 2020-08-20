import clsx from "clsx";
import React from "react";

import Button from "@material-ui/core/Button";

import styles from "./SimpleButton.styles";

interface SimpleButtonProps {
  name: string;
  text: string;
  isFullWidth?: boolean;
  hasTopMargin?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const SimpleButton: React.FC<SimpleButtonProps> = ({
  name,
  text,
  isFullWidth = false,
  hasTopMargin = false,
  onClick,
}) => {
  const classes = styles();

  return (
    <Button
      fullWidth={isFullWidth}
      variant="outlined"
      color="primary"
      aria-label={name}
      className={clsx(classes.root, {
        [classes.topMargin]: hasTopMargin,
      })}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default SimpleButton;
