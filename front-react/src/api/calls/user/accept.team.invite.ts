import TogetherApi, { send } from "../../setup/together.api";
import { ApiResponse } from "../../../types/api/api.response.interface";

export interface ApiTeamInviteResponse {
  data?: string;
}

export const acceptTeamInvite = async (
  inviteId: string
): Promise<ApiResponse<ApiTeamInviteResponse>> =>
  await send(
    TogetherApi.Instance.post("user/acceptTeamInvite", {
      inviteId,
    })
  );
