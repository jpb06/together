import React from "react";
import WithLoadingAndErrors from "../composition/WithLoadingAndErrors";
import useDailyLoading from "../../../hooks/useDailyLoading.hook";
import useCurrentTeamMembersLoading from "../../../hooks/useCurrentTeamMembersLoading.hook";
import Daily from "./Daily";
import DailyType from "../../../types/daily.type";
import WithTeamGuard from "../composition/WithTeamGuard";

const DailyContainer: React.FC = () => {
  const [daily, isDailyReady] = useDailyLoading(new Date().toUTCString());
  const [teamMembers, isTeamMembersReady] = useCurrentTeamMembersLoading();

  const isReady = isDailyReady && isTeamMembersReady;
  const userHasTeam = daily !== null && teamMembers.length > 0;

  return (
    <WithLoadingAndErrors
      isReady={isReady}
      feedbackText="Turns out we couldn't fetch the daily"
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
