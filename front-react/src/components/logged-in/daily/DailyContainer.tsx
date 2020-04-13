import React from "react";
import WithLoadingAndErrors from "../composition/WithLoadingAndErrors";
import useDailyLoading from "../../../hooks/useDailyLoading.hook";
import useCurrentTeamMembersLoading from "../../../hooks/useCurrentTeamMembersLoading.hook";
import Daily from "./Daily";

const DailyContainer: React.FC = () => {
  const daily = useDailyLoading(new Date().toUTCString());
  const teamMembers = useCurrentTeamMembersLoading();

  const isReady = daily && teamMembers ? true : false;

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
