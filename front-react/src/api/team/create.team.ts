import TogetherApi, { send, ApiResponse } from "../setup/together.api";

interface ApiCreateTeamResponse extends ApiResponse {
  data?: string;
}

const createTeam = async (teamName: string): Promise<ApiCreateTeamResponse> =>
  await send(
    TogetherApi.Instance.post("team/create", {
      teamName,
    })
  );

export { createTeam };
