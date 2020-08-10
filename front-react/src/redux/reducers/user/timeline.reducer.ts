import { ActionWithPayload, ReduxActionType as Type } from "../../../types/redux";
import { TimeLine } from "../../../types/shared";
import { isSuccessFor } from "../../identifiers/generic.actions.identifiers";
import { initialState } from "../../store/root.state";

const timelineReducer = (
  state: TimeLine | null = initialState.timeline,
  action: ActionWithPayload<TimeLine>
) => {
  if (isSuccessFor(Type.Login, action.type)) {
    return null;
  }

  if (isSuccessFor(Type.GetTimeline, action.type)) {
    return action.payload;
  }

  return state;
};

export default timelineReducer;
