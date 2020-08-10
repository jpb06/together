import * as localStore from "local-storage";
import React, { useState } from "react";

import { useRootSelector, useUserTeamsLoading } from "../../../hooks";
import LocalStorageKeys from "../../../logic/local.storage.keys";
import { userSelector } from "../../../redux/selectors";
import { ReduxActionContext as Context } from "../../../types/redux";
import { BareTeam, TeamWithLastActivity, User } from "../../../types/shared";
import WithLoadingAndErrors from "../composition/WithLoadingAndErrors";
import UserAccount from "./UserAccount";

interface UserAccountContainerProps {
  history: any;
}

const UserAccountContainer: React.FC<UserAccountContainerProps> = ({
  history,
}) => {
  const user = useRootSelector(userSelector);
  const userTeams = useUserTeamsLoading(user);

  const [userCurrentTeam, setUserCurrentTeam] = useState<
    TeamWithLastActivity
  >();

  React.useEffect(() => {
    if (userTeams.length > 0) {
      const storedCurrentTeam = localStore.get<BareTeam>(
        LocalStorageKeys.currentTeam
      );
      const currentTeam = userTeams.find(
        (team) => team.id === storedCurrentTeam.id
      );
      setUserCurrentTeam(currentTeam);
    }
  }, [userTeams]);

  const handleLogoff = () => {
    localStore.clear();
    history.push({
      pathname: "/",
    });
  };

  return (
    <WithLoadingAndErrors
      feedbackText="Turns out we couldn't fetch your profile"
      context={Context.Global}
      jsx={
        <UserAccount
          user={user as User}
          userTeams={userTeams}
          userCurrentTeam={userCurrentTeam}
          onLogoff={handleLogoff}
        />
      }
    />
  );
};

export default UserAccountContainer;
