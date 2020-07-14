import TogetherApi, { send } from "../../setup/together.api";
import { ApiTeamInviteResponse } from "./accept.team.invite";
import { ApiResponse } from "../../../types/api/api.response.interface";

export const declineTeamInvite = async (
  inviteId: string
): Promise<ApiResponse<ApiTeamInviteResponse>> =>
  await send(
    TogetherApi.Instance.post("user/declineTeamInvite", {
      inviteId,
    })
  );
