import React from "react";
import WaitingIndicator from "../feedback/WaitingIndicator";
import TopLevelFeedback from "../feedback/TopLevelFeedback";
import LoopIcon from "@material-ui/icons/Loop";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";

interface WithLoadingProps {
  isErrored: boolean;
  isReady: boolean;
  feedbackText: string;
  Component: React.ElementType;
  ComponentProps?: any;
}

const WithLoading: React.FC<WithLoadingProps> = ({
  isErrored,
  isReady,
  feedbackText,
  Component,
  ComponentProps
}) => {
  if (isErrored)
    return (
      <TopLevelFeedback
        Icon={SentimentDissatisfiedIcon}
        title="Oh no!"
        content={feedbackText}
      />
    );

  return isReady ? (
    <Component {...ComponentProps} />
  ) : (
    <WaitingIndicator
      hasTopPadding
      IconComponent={LoopIcon}
      text="Sinister Dexter Has a Broken Spirometer"
    />
  );
};

export default WithLoading;
