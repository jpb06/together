import TogetherApi, { send } from "../../setup/together.api";
import { ApiResponse } from "../../../types/api/api.response.interface";

interface ApiDailyDurationResponse {
  data?: string;
}

export const setDailyDuration = async (
  teamId: string,
  date: string,
  duration: string
): Promise<ApiResponse<ApiDailyDurationResponse>> =>
  await send(
    TogetherApi.Instance.post("daily/setDuration", {
      teamId,
      date,
      duration,
    })
  );
