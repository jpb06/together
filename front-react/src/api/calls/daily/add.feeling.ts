import TogetherApi, { send } from "../../setup/together.api";
import Feeling, { NewFeeling } from "../../../types/feeling.type";
import { ApiResponse } from "../../../types/api/api.response.interface";

interface ApiAddFeelingResponse {
  data?: Feeling;
}

export const addFeeling = async (
  teamId: string,
  date: string,
  feeling: NewFeeling
): Promise<ApiResponse<ApiAddFeelingResponse>> =>
  await send(
    TogetherApi.Instance.post("daily/feelings/add", {
      teamId,
      date,
      ...feeling,
    })
  );
