import TogetherApi, { send } from "../../setup/together.api";
import { TeamWithLastActivity } from "../../../types/team.type";
import { ApiResponse } from "../../../types/api/api.response.interface";

interface ApiUserTeamsResponse {
  data?: Array<TeamWithLastActivity>;
}

export const getUserTeams = async (
  userId: string,
  fetchLastActivity: boolean
): Promise<ApiResponse<ApiUserTeamsResponse>> =>
  await send(
    TogetherApi.Instance.post("user/teams", {
      userId,
      fetchLastActivity,
    })
  );
