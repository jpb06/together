import TogetherApi, { ApiStatus, send } from "../setup/together.api";

interface ApiDailyDurationResponse {
  apiStatus: ApiStatus;
  data?: string;
  error?: any;
}

const setDailyDuration = async (
  teamId: string,
  date: string,
  duration: string
): Promise<ApiDailyDurationResponse> =>
  await send(
    TogetherApi.Instance.post("daily/setDuration", {
      teamId,
      date,
      duration
    })
  );

export { setDailyDuration };
