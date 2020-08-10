import { sagaPayloadAction } from "../";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";

export const getTimelineAction = (
  teamId: string | undefined,
  context: Context = Context.Global
) => sagaPayloadAction<string>(Type.GetTimeline, context, teamId);
