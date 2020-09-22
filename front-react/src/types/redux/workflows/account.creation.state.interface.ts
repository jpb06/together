import { TeamMember } from "../../../stack-shared-code/types";

export enum AccountCreationStep {
  User,
  Avatar,
  TeamChoice,
  CreateTeam,
  RequestToJoinTeam,
  InviteUsersToTeam,
  Completed,
}

export interface AccountCreationState {
  step: AccountCreationStep;
  isLoading: boolean;
  isErrored: boolean;
  isSubmitted: boolean;
  actionButtonText: string;
  exitActionText: string;
  newTeamMembers: Array<TeamMember>;
}
