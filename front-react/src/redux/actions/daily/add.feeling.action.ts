import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { NewFeeling } from "../../../types/shared";
import { AddFeelingParams } from "../../tasks";
import { sagaPayloadAction } from "../generic/payload.action";

export const addFeelingAction = (
  teamId: string,
  date: string,
  feeling: NewFeeling
) =>
  sagaPayloadAction<AddFeelingParams>(Type.AddFeeling, Context.Daily, {
    teamId,
    date,
    feeling,
  });
