import TogetherApi, { send } from "../../setup/together.api";
import { TeamMember } from "../../../types/user.type";
import { ApiResponse } from "../../../types/api/api.response.interface";

interface ApiTeamMembersResponse {
  data?: Array<TeamMember>;
}

export const getTeamMembers = async (
  teamId: string
): Promise<ApiResponse<ApiTeamMembersResponse>> =>
  await send(
    TogetherApi.Instance.post("team/members", {
      teamId,
    })
  );
