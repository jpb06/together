import React from "react";

import Grid from "@material-ui/core/Grid";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CallMergeIcon from "@material-ui/icons/CallMerge";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";

import { AccountCreationState } from "../../../../../types/redux";
import { TeamActionType } from "../../NewAccountContainer";
import StepTitle from "../StepTitle";
import TeamActionForm from "./options/TeamActionForm";
import TeamOption, { TeamOptionDirection } from "./options/TeamOption";
import { UserTeamStepScenario } from "./UserTeamStepContainer";

const getTitle = (path: UserTeamStepScenario) => {
  switch (path) {
    case UserTeamStepScenario.NewTeam:
      return "Create a team";
    case UserTeamStepScenario.JoinTeam:
      return "Join a team";
  }

  return "Let's get yourself a team";
};

interface UserTeamStepFormProps {
  state: AccountCreationState;
  path: UserTeamStepScenario;
  onResetPath: () => void;
  onCreatePathChosen: () => void;
  onJoinPathChosen: () => void;
  onTeamAction: (name: string, actionType: TeamActionType) => void;
}

const UserTeamStepForm: React.FC<UserTeamStepFormProps> = ({
  state,
  path,
  onResetPath,
  onCreatePathChosen,
  onJoinPathChosen,
  onTeamAction,
}) => {
  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
      spacing={1}
    >
      <StepTitle title={getTitle(path)} />
      {path === UserTeamStepScenario.InitialState && (
        <>
          <TeamOption
            direction={TeamOptionDirection.Right}
            ariaLabel="create-team"
            description="Create a team"
            IconComponent={AddCircleOutlineIcon}
            onTeamAction={onCreatePathChosen}
          />
          <TeamOption
            direction={TeamOptionDirection.Left}
            ariaLabel="join-team"
            description="Join a team"
            IconComponent={CallMergeIcon}
            onTeamAction={onJoinPathChosen}
          />
        </>
      )}
      {path === UserTeamStepScenario.NewTeam && (
        <TeamActionForm
          state={state}
          type={TeamActionType.Create}
          descriptionText="Choose a name for your new team"
          cancelActionText="Nevermind, let's join a team"
          transitionDirection="right"
          ActionIcon={AddCircleOutlineIcon}
          TitleIcon={AddCircleOutlineIcon}
          onTeamAction={onTeamAction}
          onCancelAction={onResetPath}
        />
      )}
      {path === UserTeamStepScenario.JoinTeam && (
        <TeamActionForm
          state={state}
          type={TeamActionType.Join}
          descriptionText="Enter the name of the team you wish to join"
          cancelActionText="Nevermind, let's create a team"
          transitionDirection="left"
          ActionIcon={SupervisedUserCircleIcon}
          TitleIcon={CallMergeIcon}
          onTeamAction={onTeamAction}
          onCancelAction={onResetPath}
        />
      )}
    </Grid>
  );
};

export default UserTeamStepForm;
