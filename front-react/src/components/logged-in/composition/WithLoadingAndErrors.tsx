import React from "react";

import LoopIcon from "@material-ui/icons/Loop";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";

import { useAppStatus } from "../../../hooks";
import {
  ApplicationState,
  ReduxActionContext as Context,
} from "../../../types/redux";
import TopLevelFeedback from "../../generic/feedback/TopLevelFeedback";
import WaitingIndicator from "../../generic/loaders/WaitingIndicator";

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
  const status = useAppStatus(context);

  switch (status) {
    case ApplicationState.Errored:
      return (
        <TopLevelFeedback
          Icon={SentimentDissatisfiedIcon}
          title="Oh no!"
          content={feedbackText}
        />
      );
    case ApplicationState.Busy:
      return (
        <WaitingIndicator
          hasTopPadding
          IconComponent={LoopIcon}
          text="Sinister Dexter Has a Broken Spirometer"
        />
      );
    case ApplicationState.Available:
      return jsx;
  }
};

export default WithLoadingAndErrors;
