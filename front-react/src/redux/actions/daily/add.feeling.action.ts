import { ReduxActionType as Type } from "../../../types/redux";
import { NewFeeling } from "../../../types/shared";
import { AddFeelingParams } from "../../tasks";
import { payloadAction } from "../generic/payload.action";

export const addFeelingAction = (
  teamId: string,
  date: string,
  feeling: NewFeeling
) =>
  payloadAction<AddFeelingParams>(Type.AddFeeling, {
    teamId,
    date,
    feeling,
  });
