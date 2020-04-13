import TogetherApi, { ApiStatus, send } from "../setup/together.api";
import Daily from "../../types/daily.type";

interface ApiDailyResponse {
  apiStatus: ApiStatus;
  data?: Daily;
  error?: any;
}

const getDaily = async (
  teamId: string,
  date: string
): Promise<ApiDailyResponse> =>
  await send(
    TogetherApi.Instance.post("daily", {
      teamId,
      date
    })
  );

export { getDaily };
