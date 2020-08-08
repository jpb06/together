import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { SetDailyDurationParams } from "../../tasks";
import { sagaPayloadAction } from "../generic/payload.action";

export const setDailyDurationAction = (
  teamId: string,
  date: string,
  duration: string,
  context: Context = Context.Global
) =>
  sagaPayloadAction<SetDailyDurationParams>(Type.DailyDuration, context, {
    teamId,
    date,
    duration,
  });
