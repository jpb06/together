import TogetherApi, { send } from "../../setup/together.api";
import { ApiResponse } from "../../../types/api/api.response.interface";

interface ApiCreateTeamResponse {
  data?: string;
}

export const createTeam = async (
  teamName: string
): Promise<ApiResponse<ApiCreateTeamResponse>> =>
  await send(
    TogetherApi.Instance.post("team/create", {
      teamName,
    })
  );
