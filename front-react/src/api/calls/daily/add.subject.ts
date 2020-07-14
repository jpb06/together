import TogetherApi, { send } from "../../setup/together.api";
import Subject, { NewSubject } from "../../../types/subject.type";
import { ApiResponse } from "../../../types/api/api.response.interface";

interface ApiAddFeelingResponse {
  data?: Subject;
}

export const addSubject = async (
  teamId: string,
  date: string,
  subject: NewSubject
): Promise<ApiResponse<ApiAddFeelingResponse>> =>
  await send(
    TogetherApi.Instance.post("daily/subjects/add", {
      teamId,
      date,
      ...subject,
    })
  );
