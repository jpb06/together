import TogetherApi, { ApiStatus, send } from "../setup/together.api";

export interface ApiTeamInviteResponse {
  apiStatus: ApiStatus;
  data?: string;
  error?: any;
}

const acceptTeamInvite = async (
  inviteId: string
): Promise<ApiTeamInviteResponse> =>
  await send(
    TogetherApi.Instance.post("user/acceptTeamInvite", {
      acceptTeamInvite
    })
  );

export { acceptTeamInvite };
