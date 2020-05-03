import TogetherApi, { send, ApiResponse } from "../setup/together.api";

interface ApiDailyDurationResponse extends ApiResponse {
  data?: string;
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
      duration,
    })
  );

export { setDailyDuration };
