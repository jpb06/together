import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { sagaPayloadAction } from "../../actions";
import { GetDailyParams } from "../../tasks/daily/get.daily.task";

export const getDailyAction = (
  teamId: string,
  date: string,
  context: Context = Context.Global
) =>
  sagaPayloadAction<GetDailyParams>(Type.GetDaily, context, { teamId, date });
