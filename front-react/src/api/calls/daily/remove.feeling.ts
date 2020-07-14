import TogetherApi, { send } from "../../setup/together.api";
import { ApiResponse } from "../../../types/api/api.response.interface";

interface ApiRemoveFeelingResponse {
  data?: string;
}

export const removeFeeling = async (
  teamId: string,
  date: string,
  id: string
): Promise<ApiResponse<ApiRemoveFeelingResponse>> =>
  await send(
    TogetherApi.Instance.post("daily/feelings/remove", {
      teamId,
      date,
      id,
    })
  );
