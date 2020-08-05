import { ReduxActionType as Type } from "../../../types/redux";
import { DetailsRemovalType, RemoveDetailsParams } from "../../tasks";
import { payloadAction } from "../generic/payload.action";

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

  return payloadAction<RemoveDetailsParams>(actionType, {
    detailsType,
    teamId,
    date,
    id,
  });
};
