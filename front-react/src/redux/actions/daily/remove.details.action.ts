import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { DetailsRemovalType, RemoveDetailsParams } from "../../tasks";
import { sagaPayloadAction } from "../generic/payload.action";

export const removeDetailsAction = (
  detailsType: DetailsRemovalType,
  teamId: string,
  date: string,
  id: string
) => {
  let actionType;
  switch (detailsType) {
    case DetailsRemovalType.Feelings:
      actionType = Type.RemoveFeeling;
      break;
    case DetailsRemovalType.Subjects:
      actionType = Type.RemoveSubject;
      break;
  }

  return sagaPayloadAction<RemoveDetailsParams>(actionType, Context.Daily, {
    detailsType,
    teamId,
    date,
    id,
  });
};
