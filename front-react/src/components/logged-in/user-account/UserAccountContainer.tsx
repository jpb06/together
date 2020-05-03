import React, { useState } from "react";
import LocalStorageKeys from "../../../logic/local.storage.keys";
import * as localStorage from "local-storage";
import UserAccount from "./UserAccount";
import WithLoadingAndErrors from "../composition/WithLoadingAndErrors";
import { useReduxSelector } from "../../../hooks/redux.hooks";
import BareTeam, { TeamWithLastActivity } from "../../../types/team.type";
import useUserTeamsLoading from "../../../hooks/useUserTeamsLoading.hook";

interface UserAccountContainerProps {
  history: any;
}

const UserAccountContainer: React.FC<UserAccountContainerProps> = ({
  history,
}) => {
  const user = useReduxSelector((state) => state.user);
  const [userTeams, isReady] = useUserTeamsLoading(user);

  const [userCurrentTeam, setUserCurrentTeam] = useState<
    TeamWithLastActivity
  >();

  React.useEffect(() => {
    if (userTeams.length > 0) {
      const storedCurrentTeam = localStorage.get<BareTeam>(
        LocalStorageKeys.currentTeam
      );
      const currentTeam = userTeams.find(
        (team) => team.id === storedCurrentTeam.id
      );
      setUserCurrentTeam(currentTeam);
    }
  }, [userTeams]);

  const handleLogoff = () => {
    localStorage.clear();
    history.push({
      pathname: "/",
    });
  };

  return (
    <WithLoadingAndErrors
      isReady={isReady}
      feedbackText="Turns out we couldn't fetch your profile"
      Component={UserAccount}
      ComponentProps={{
        user,
        userTeams,
        userCurrentTeam,
        onLogoff: handleLogoff,
      }}
    />
  );
};

export default UserAccountContainer;
