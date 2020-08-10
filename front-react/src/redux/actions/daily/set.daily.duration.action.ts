import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { SetDailyDurationParams } from "../../tasks";
import { sagaPayloadAction } from "../generic/payload.action";

export const setDailyDurationAction = (
  teamId: string,
  date: string,
  duration: string
) =>
  sagaPayloadAction<SetDailyDurationParams>(Type.DailyDuration, Context.Daily, {
    teamId,
    date,
    duration,
  });
