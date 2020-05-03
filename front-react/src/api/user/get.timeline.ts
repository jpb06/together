import TogetherApi, { send, ApiResponse } from "../setup/together.api";
import TimeLine from "../../types/timeline.type";

interface ApiTimelineResponse extends ApiResponse {
  data?: TimeLine;
}

const getTimeline = async (teamId: string): Promise<ApiTimelineResponse> =>
  await send(
    TogetherApi.Instance.post("user/timeline", {
      teamId,
    })
  );

export { getTimeline };
