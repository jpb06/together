import TogetherApi, { send, ApiResponse } from "../setup/together.api";
import { TeamJoinRequest } from "../../types/invites.type";

interface ApiRequestToJoinTeamResponse extends ApiResponse {
  data?: TeamJoinRequest;
}

const requestToJoinTeam = async (
  teamName: string
): Promise<ApiRequestToJoinTeamResponse> =>
  await send(
    TogetherApi.Instance.post("user/requestToJoinTeam", {
      teamName,
    })
  );

export { requestToJoinTeam };
