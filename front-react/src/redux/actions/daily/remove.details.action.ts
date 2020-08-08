import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { DetailsRemovalType, RemoveDetailsParams } from "../../tasks";
import { sagaPayloadAction } from "../generic/payload.action";

export const removeDetailsAction = (
  detailsType: DetailsRemovalType,
  teamId: string,
  date: string,
  id: string,
  context: Context = Context.Global
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

  return sagaPayloadAction<RemoveDetailsParams>(actionType, context, {
    detailsType,
    teamId,
    date,
    id,
  });
};
