import * as localStore from "local-storage";
import React, { useState } from "react";
import { useHistory } from "react-router";

import { useRootSelector, useUserTeamsLoading } from "../../../hooks";
import LocalStorageKeys from "../../../logic/local.storage.keys";
import { userSelector } from "../../../redux/selectors";
import { BareTeam, TeamWithLastActivity, User } from "../../../stack-shared-code/types";
import { ReduxActionContext as Context } from "../../../types/redux";
import WithLoadingAndErrors from "../composition/WithLoadingAndErrors";
import UserAccount from "./UserAccount";

const UserAccountContainer: React.FC = () => {
  const history = useHistory();
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
