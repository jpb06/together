import TogetherApi, { send, ApiResponse } from "../setup/together.api";
import Subject, { NewSubject } from "../../types/subject.type";

interface ApiAddFeelingResponse extends ApiResponse {
  data?: Subject;
}

const addSubject = async (
  teamId: string,
  date: string,
  subject: NewSubject
): Promise<ApiAddFeelingResponse> =>
  await send(
    TogetherApi.Instance.post("daily/subjects/add", {
      teamId,
      date,
      ...subject,
    })
  );

export { addSubject };
