import React from "react";
import WithLoadingAndErrors from "../composition/WithLoadingAndErrors";
import useDailyLoading from "../../../hooks/useDailyLoading.hook";
import useCurrentTeamMembersLoading from "../../../hooks/useCurrentTeamMembersLoading.hook";
import Daily from "./Daily";

const DailyContainer: React.FC = () => {
  const [daily, isDailyReady] = useDailyLoading(new Date().toUTCString());
  const [teamMembers, isTeamMembersReady] = useCurrentTeamMembersLoading();

  const isReady = isDailyReady && isTeamMembersReady;

  return (
    <WithLoadingAndErrors
      isReady={isReady}
      feedbackText="Turns out we couldn't fetch the daily"
      Component={Daily}
      ComponentProps={{
        daily,
        teamMembers,
      }}
    />
  );
};

export default DailyContainer;
