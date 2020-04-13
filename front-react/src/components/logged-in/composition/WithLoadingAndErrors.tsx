import React from "react";
import WaitingIndicator from "../../feedback/WaitingIndicator";
import TopLevelFeedback from "../../feedback/TopLevelFeedback";
import LoopIcon from "@material-ui/icons/Loop";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import { useReduxSelector } from "../../../hooks/redux.hooks";

interface WithLoadingAndErrorsProps {
  isReady: boolean;
  feedbackText: string;
  Component: React.ElementType;
  ComponentProps?: any;
}

const WithLoadingAndErrors: React.FC<WithLoadingAndErrorsProps> = ({
  isReady,
  feedbackText,
  Component,
  ComponentProps,
}) => {
  const isErrored = useReduxSelector((state) => state.error !== null);

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

export default WithLoadingAndErrors;
