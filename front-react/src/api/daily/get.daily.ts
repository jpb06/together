import TogetherApi, { send, ApiResponse } from "../setup/together.api";
import Daily from "../../types/daily.type";

interface ApiDailyResponse extends ApiResponse {
  data?: Daily;
}

const getDaily = async (
  teamId: string,
  date: string
): Promise<ApiDailyResponse> =>
  await send(
    TogetherApi.Instance.post("daily", {
      teamId,
      date,
    })
  );

export { getDaily };
