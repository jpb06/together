import React, { useState } from "react";
import LocalStorageKeys from "../../../logic/local.storage.keys";
import * as localStorage from "local-storage";
import UserAccount from "./UserAccount";
import WithLoadingAndErrors from "../composition/WithLoadingAndErrors";
import { useReduxSelector, useReduxDispatch } from "../../../hooks/redux.hooks";
import BareTeam, { TeamWithLastActivity } from "../../../types/team.type";
import getUserTeamsAction from "../../../redux/actions/user/get.user.teams.action";

interface UserAccountContainerProps {
  history: any;
}

const UserAccountContainer: React.FC<UserAccountContainerProps> = ({
  history,
}) => {
  const dispatch = useReduxDispatch();
  const user = useReduxSelector((state) => state.user);
  const userTeams = useReduxSelector((state) => state.userTeams);
  const isLoading = useReduxSelector((state) => state.apiCallsInProgress > 0);

  const [userCurrentTeam, setUserCurrentTeam] = useState<
    TeamWithLastActivity
  >();

  React.useEffect(() => {
    if (user != null) {
      dispatch(getUserTeamsAction(user.id, false));
    }
  }, [dispatch, user]);

  React.useEffect(() => {
    if (userTeams != null) {
      const storedCurrentTeam = localStorage.get<BareTeam>(
        LocalStorageKeys.currentTeam
      );
      const currentTeam = userTeams.find(
        (team) => team.id === storedCurrentTeam.id
      );
      setUserCurrentTeam(currentTeam);
    }
  }, [userTeams]);

  const isReady = !isLoading && userCurrentTeam !== undefined;

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
