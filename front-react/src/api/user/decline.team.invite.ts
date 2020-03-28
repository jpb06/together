import TogetherApi, { send } from "../setup/together.api";
import { ApiTeamInviteResponse } from "./accept.team.invite";

const declineTeamInvite = async (
  inviteId: string
): Promise<ApiTeamInviteResponse> =>
  await send(
    TogetherApi.Instance.post("user/declineTeamInvite", {
      inviteId
    })
  );

export { declineTeamInvite };
