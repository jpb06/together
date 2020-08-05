import { sagaPayloadAction } from "../";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { AnswerTeamInviteParams, TeamInviteAnswer } from "../../tasks/user/answer.team.invite.task";

export const answerTeamInviteAction = (
  inviteId: string,
  answer: TeamInviteAnswer,
  refreshCallerTeams: boolean = false,
  context: Context = Context.Global
) =>
  sagaPayloadAction<AnswerTeamInviteParams>(Type.AnswerTeamInvite, context, {
    inviteId,
    answer,
    refreshCallerTeams,
  });
