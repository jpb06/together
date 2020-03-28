import TogetherApi, { ApiStatus, send } from "../setup/together.api";
import { TeamWithLastActivity } from "../../types/team.type";

interface ApiUserTeamsResponse {
  apiStatus: ApiStatus;
  data?: Array<TeamWithLastActivity>;
  error?: any;
}

const getUserTeams = async (
  userId: string,
  fetchLastActivity: boolean
): Promise<ApiUserTeamsResponse> =>
  await send(
    TogetherApi.Instance.post("user/teams", {
      userId,
      fetchLastActivity
    })
  );

export { getUserTeams };
