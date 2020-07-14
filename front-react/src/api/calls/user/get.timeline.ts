import TogetherApi, { send } from "../../setup/together.api";
import TimeLine from "../../../types/timeline.type";
import { ApiResponse } from "../../../types/api/api.response.interface";

interface ApiTimelineResponse {
  data?: TimeLine;
}

export const getTimeline = async (
  teamId: string
): Promise<ApiResponse<ApiTimelineResponse>> =>
  await send(
    TogetherApi.Instance.post("user/timeline", {
      teamId,
    })
  );
