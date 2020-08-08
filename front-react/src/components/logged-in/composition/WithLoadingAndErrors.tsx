import React from "react";

import LoopIcon from "@material-ui/icons/Loop";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";

import { useRootSelector } from "../../../hooks";
import { isAppErroredIn, isAppReadyIn } from "../../../redux/selectors";
import { ReduxActionContext as Context } from "../../../types/redux";
import TopLevelFeedback from "../../generic/feedback/TopLevelFeedback";
import WaitingIndicator from "../../generic/feedback/WaitingIndicator";

interface WithLoadingAndErrorsProps {
  feedbackText: string;
  jsx: JSX.Element;
  context: Context;
}

const WithLoadingAndErrors: React.FC<WithLoadingAndErrorsProps> = ({
  feedbackText,
  jsx,
  context,
}) => {
  const isErrored = useRootSelector(isAppErroredIn(context));
  const isReady = useRootSelector(isAppReadyIn(context));

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
