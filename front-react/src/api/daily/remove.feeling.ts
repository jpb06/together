import TogetherApi, { ApiStatus, send } from "../setup/together.api";

interface ApiRemoveFeelingResponse {
  apiStatus: ApiStatus;
  data?: string;
  error?: any;
}

const removeFeeling = async (
  teamId: string,
  date: string,
  id: string
): Promise<ApiRemoveFeelingResponse> =>
  await send(
    TogetherApi.Instance.post("daily/feelings/remove", {
      teamId,
      date,
      id,
    })
  );

export { removeFeeling };
