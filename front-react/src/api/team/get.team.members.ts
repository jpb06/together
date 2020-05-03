import TogetherApi, { send, ApiResponse } from "../setup/together.api";
import { TeamMember } from "../../types/user.type";

interface ApiTeamMembersResponse extends ApiResponse {
  data?: Array<TeamMember>;
}

const getTeamMembers = async (
  teamId: string
): Promise<ApiTeamMembersResponse> =>
  await send(
    TogetherApi.Instance.post("team/members", {
      teamId,
    })
  );

export { getTeamMembers };
