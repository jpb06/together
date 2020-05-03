import TogetherApi, { send, ApiResponse } from "../setup/together.api";
import { TerseUser } from "../../types/user.type";

interface ApiInviteUserResponse extends ApiResponse {
  data?: TerseUser;
}

const inviteUser = async (
  teamId: string,
  email: string
): Promise<ApiInviteUserResponse> =>
  await send(
    TogetherApi.Instance.post("user/invite", {
      teamId,
      email,
    })
  );

export { inviteUser };
