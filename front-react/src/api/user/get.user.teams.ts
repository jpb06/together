import TogetherApi, { send, ApiResponse } from "../setup/together.api";
import { TeamWithLastActivity } from "../../types/team.type";

interface ApiUserTeamsResponse extends ApiResponse {
  data?: Array<TeamWithLastActivity>;
}

const getUserTeams = async (
  userId: string,
  fetchLastActivity: boolean
): Promise<ApiUserTeamsResponse> =>
  await send(
    TogetherApi.Instance.post("user/teams", {
      userId,
      fetchLastActivity,
    })
  );

export { getUserTeams };
