import TogetherApi, { send, ApiResponse } from "../setup/together.api";

interface ApiRemoveFeelingResponse extends ApiResponse {
  data?: string;
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
