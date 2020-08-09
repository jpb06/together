import React from "react";

import { useDailyAndTeamMembersLoading } from "../../../hooks";
import { ReduxActionContext as Context } from "../../../types/redux";
import WithLoadingAndErrors from "../composition/WithLoadingAndErrors";
import WithTopLevelFeedbackGuard from "../composition/WithTopLevelFeedbackGuard";
import Daily from "./Daily";

const DailyContainer: React.FC = () => {
  const [daily, teamMembers] = useDailyAndTeamMembersLoading();
  const teamHasMembers = teamMembers.length > 0;

  return (
    <WithLoadingAndErrors
      feedbackText="Turns out we couldn't fetch the daily"
      context={Context.Global}
      jsx={
        <WithTopLevelFeedbackGuard
          displayJsxCondition={teamHasMembers}
          jsx={<Daily daily={daily} teamMembers={teamMembers} />}
          title="No team"
          message="You don't appear to belong to any team yet"
        />
      }
    />
  );
};

export default DailyContainer;
