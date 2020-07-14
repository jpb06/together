import TogetherApi, { send } from "../../setup/together.api";
import { TerseUser } from "../../../types/user.type";
import { ApiResponse } from "../../../types/api/api.response.interface";

interface ApiInviteUserResponse {
  data?: TerseUser;
}

export const inviteUser = async (
  teamId: string,
  email: string
): Promise<ApiResponse<ApiInviteUserResponse>> =>
  await send(
    TogetherApi.Instance.post("user/invite", {
      teamId,
      email,
    })
  );
