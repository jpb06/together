import TogetherApi, { send } from "../../setup/together.api";
import { TeamJoinRequest } from "../../../types/invites.type";
import { ApiResponse } from "../../../types/api/api.response.interface";

interface ApiRequestToJoinTeamResponse {
  data?: TeamJoinRequest;
}

export const requestToJoinTeam = async (
  teamName: string
): Promise<ApiResponse<ApiRequestToJoinTeamResponse>> =>
  await send(
    TogetherApi.Instance.post("user/requestToJoinTeam", {
      teamName,
    })
  );
