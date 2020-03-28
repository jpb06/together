import TogetherApi, { ApiStatus, send } from "../setup/together.api";
import TimeLine from "../../types/timeline.type";

interface ApiTimelineResponse {
  apiStatus: ApiStatus;
  data?: TimeLine;
  error?: any;
}

const getTimeline = async (teamId: string): Promise<ApiTimelineResponse> =>
  await send(
    TogetherApi.Instance.post("user/timeline", {
      teamId
    })
  );

export { getTimeline };
