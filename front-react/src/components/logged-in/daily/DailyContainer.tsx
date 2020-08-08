import React from "react";

import { useCurrentTeamMembersLoading, useDailyLoading } from "../../../hooks";
import { ReduxActionContext as Context } from "../../../types/redux";
import { Daily as DailyType } from "../../../types/shared";
import WithLoadingAndErrors from "../composition/WithLoadingAndErrors";
import WithTeamGuard from "../composition/WithTeamGuard";
import Daily from "./Daily";

const DailyContainer: React.FC = () => {
  const daily = useDailyLoading();
  const teamMembers = useCurrentTeamMembersLoading();

  const userHasTeam = teamMembers.length > 0;

  return (
    <WithLoadingAndErrors
      feedbackText="Turns out we couldn't fetch the daily"
      context={Context.Global}
      jsx={
        <WithTeamGuard
          hasTeam={userHasTeam}
          jsx={<Daily daily={daily as DailyType} teamMembers={teamMembers} />}
        />
      }
    />
  );
};

export default DailyContainer;
