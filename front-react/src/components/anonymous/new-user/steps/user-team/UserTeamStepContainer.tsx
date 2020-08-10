import React from "react";

import { AccountCreationState, AccountCreationStep } from "../../../../../types/redux";
import { TeamActionType } from "../../NewAccountContainer";
import UserTeamStepForm from "./UserTeamStepForm";

export enum UserTeamStepScenario {
  InitialState,
  NewTeam,
  JoinTeam,
  JoinRequestSent,
}

interface UserTeamStepContainerProps {
  state: AccountCreationState;
  onTeamAction: (name: string, actionType: TeamActionType) => void;
}

const UserTeamStepContainer: React.FC<UserTeamStepContainerProps> = ({
  state,
  onTeamAction,
}) => {
  const [path, setPath] = React.useState<UserTeamStepScenario>(
    UserTeamStepScenario.InitialState
  );

  if (state.step !== AccountCreationStep.TeamChoice) return null;

  const handlePathReset = () => setPath(UserTeamStepScenario.InitialState);
  const handleCreatePathChosen = () => setPath(UserTeamStepScenario.NewTeam);
  const handleJoinPathChosen = () => setPath(UserTeamStepScenario.JoinTeam);

  return (
    <UserTeamStepForm
      state={state}
      path={path}
      onResetPath={handlePathReset}
      onCreatePathChosen={handleCreatePathChosen}
      onJoinPathChosen={handleJoinPathChosen}
      onTeamAction={onTeamAction}
    />
  );
};

export default UserTeamStepContainer;
