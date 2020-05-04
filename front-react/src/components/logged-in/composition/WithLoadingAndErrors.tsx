import React from "react";
import WaitingIndicator from "../../generic/feedback/WaitingIndicator";
import TopLevelFeedback from "../../generic/feedback/TopLevelFeedback";
import LoopIcon from "@material-ui/icons/Loop";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import { useReduxSelector } from "../../../hooks/redux.hooks";

interface WithLoadingAndErrorsProps {
  isReady: boolean;
  feedbackText: string;
  jsx: JSX.Element;
}

const WithLoadingAndErrors: React.FC<WithLoadingAndErrorsProps> = ({
  isReady,
  feedbackText,
  jsx,
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
    jsx
  ) : (
    <WaitingIndicator
      hasTopPadding
      IconComponent={LoopIcon}
      text="Sinister Dexter Has a Broken Spirometer"
    />
  );
};

export default WithLoadingAndErrors;
