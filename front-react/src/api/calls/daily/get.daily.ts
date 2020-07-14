import TogetherApi, { send } from "../../setup/together.api";
import Daily from "../../../types/daily.type";
import { ApiResponse } from "../../../types/api/api.response.interface";

interface ApiDailyResponse {
  data?: Daily;
}

export const getDaily = async (
  teamId: string,
  date: string
): Promise<ApiResponse<ApiDailyResponse>> =>
  await send(
    TogetherApi.Instance.post("daily", {
      teamId,
      date,
    })
  );
