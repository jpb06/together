import React from "react";

import { useTimelineLoading } from "../../../hooks";
import { ReduxActionContext as Context } from "../../../types/redux";
import WithLoadingAndErrors from "../composition/WithLoadingAndErrors";
import TimeLine from "./TimeLine";

const TimeLineContainer: React.FC = () => {
  const timeline = useTimelineLoading(Context.Global);

  return (
    <WithLoadingAndErrors
      feedbackText="Turns out we couldn't fetch the user timeline"
      context={Context.Global}
      jsx={<TimeLine timeline={timeline} />}
    />
  );
};

export default TimeLineContainer;
