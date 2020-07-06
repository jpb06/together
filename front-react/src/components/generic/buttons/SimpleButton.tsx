import Button from "@material-ui/core/Button";
import React from "react";
import clsx from "clsx";
import styles from "./SimpleButton.styles";

interface SimpleButtonProps {
  text: string;
  isFullWidth?: boolean;
  hasTopMargin?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const SimpleButton: React.FC<SimpleButtonProps> = ({
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
