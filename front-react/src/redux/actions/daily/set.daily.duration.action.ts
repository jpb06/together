import { ReduxActionType as Type } from "../../../types/redux";
import { SetDailyDurationParams } from "../../tasks";
import { payloadAction } from "../generic/payload.action";

export const setDailyDurationAction = (
  teamId: string,
  date: string,
  duration: string
) =>
  payloadAction<SetDailyDurationParams>(Type.DailyDuration, {
    teamId,
    date,
    duration,
  });
