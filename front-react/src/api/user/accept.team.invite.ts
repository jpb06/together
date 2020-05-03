import TogetherApi, { send, ApiResponse } from "../setup/together.api";

export interface ApiTeamInviteResponse extends ApiResponse {
  data?: string;
}

const acceptTeamInvite = async (
  inviteId: string
): Promise<ApiTeamInviteResponse> =>
  await send(
    TogetherApi.Instance.post("user/acceptTeamInvite", {
      inviteId,
    })
  );

export { acceptTeamInvite };
