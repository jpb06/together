import TogetherApi, { ApiStatus, send } from "../setup/together.api";
import Subject, { NewSubject } from "../../types/subject.type";

interface ApiAddFeelingResponse {
  apiStatus: ApiStatus;
  data?: Subject;
  error?: any;
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
