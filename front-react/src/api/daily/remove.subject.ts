import TogetherApi, { send, ApiResponse } from "../setup/together.api";

interface ApiRemoveSubjectResponse extends ApiResponse {
  data?: string;
}

const removeSubject = async (
  teamId: string,
  date: string,
  id: string
): Promise<ApiRemoveSubjectResponse> =>
  await send(
    TogetherApi.Instance.post("daily/subjects/remove", {
      teamId,
      date,
      id,
    })
  );

export { removeSubject };
