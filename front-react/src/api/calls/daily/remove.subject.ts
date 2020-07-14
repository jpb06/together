import TogetherApi, { send } from "../../setup/together.api";
import { ApiResponse } from "../../../types/api/api.response.interface";

interface ApiRemoveSubjectResponse {
  data?: string;
}

export const removeSubject = async (
  teamId: string,
  date: string,
  id: string
): Promise<ApiResponse<ApiRemoveSubjectResponse>> =>
  await send(
    TogetherApi.Instance.post("daily/subjects/remove", {
      teamId,
      date,
      id,
    })
  );
