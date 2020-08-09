import React from "react";

import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import TopLevelFeedback from "../../generic/feedback/TopLevelFeedback";

interface WithTopLevelFeedbackGuardProps {
  displayJsxCondition: boolean;
  jsx: JSX.Element;
  title: string;
  message: string;
}

const WithTopLevelFeedbackGuard: React.FC<WithTopLevelFeedbackGuardProps> = ({
  displayJsxCondition,
  jsx,
  title,
  message,
}) =>
  displayJsxCondition ? (
    jsx
  ) : (
    <TopLevelFeedback
      Icon={HighlightOffIcon}
      title={title}
      content={<div>{message}</div>}
    />
  );

export default WithTopLevelFeedbackGuard;
