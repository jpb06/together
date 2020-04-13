import TogetherApi, { ApiStatus, send } from "../setup/together.api";
import Feeling, { NewFeeling } from "../../types/feeling.type";

interface ApiAddFeelingResponse {
  apiStatus: ApiStatus;
  data?: Feeling;
  error?: any;
}

const addFeeling = async (
  teamId: string,
  date: string,
  feeling: NewFeeling
): Promise<ApiAddFeelingResponse> =>
  await send(
    TogetherApi.Instance.post("daily/feelings/add", {
      teamId,
      date,
      ...feeling,
    })
  );

export { addFeeling };
