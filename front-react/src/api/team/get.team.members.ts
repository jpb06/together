import TogetherApi, { ApiStatus, send } from "../setup/together.api";
import { TeamMember } from "../../types/user.type";

interface ApiTeamMembersResponse {
  apiStatus: ApiStatus;
  data?: Array<TeamMember>;
  error?: any;
}

const getTeamMembers = async (
  teamId: string
): Promise<ApiTeamMembersResponse> =>
  await send(
    TogetherApi.Instance.post("team/members", {
      teamId
    })
  );

export { getTeamMembers };
