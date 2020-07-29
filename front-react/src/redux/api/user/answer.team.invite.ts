import TogetherApi, { send } from "../../../api/setup/together.api";
import { ApiResponse } from "../../../types/api/api.response.interface";

export enum TeamInviteAnswer {
  Accepted,
  Declined,
}

export interface TeamInviteParams {
  inviteId: string;
  answer: TeamInviteAnswer;
}

export interface TeamInviteResult {
  data?: string;
}

export const answerTeamInvite = async (
  params: ApiTeamInviteParams
): Promise<ApiResponse<ApiTeamInviteResult>> => {
  const route =
    params.answer === TeamInviteAnswer.Accepted
      ? "acceptTeamInvite"
      : "declineTeamInvite";

  return await send(
    TogetherApi.Instance.post(`user/${route}`, {
      inviteId: params.inviteId,
    })
  );
};
