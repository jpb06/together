export enum AnswerTeamInviteModalSteps {
  Question = "Question",
  SwitchTeam = "SwitchTeam",
}

export interface AnswerTeamInviteModalState {
  isModalOpen: boolean;
  step: AnswerTeamInviteModalSteps;
}
