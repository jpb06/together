import TogetherApi, { ApiStatus, send } from "../setup/together.api";

interface ApiRemoveSubjectResponse {
  apiStatus: ApiStatus;
  data?: string;
  error?: any;
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
