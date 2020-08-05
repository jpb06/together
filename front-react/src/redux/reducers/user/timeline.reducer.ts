import { ActionWithPayload, ReduxActionType as Type } from "../../../types/redux";
import { TimeLine } from "../../../types/shared";
import { isSuccess } from "../../identifiers/generic.actions.identifiers";
import { initialState } from "../../store/root.state";

const timelineReducer = (
  state: TimeLine | null = initialState.timeline,
  action: ActionWithPayload<TimeLine>
) => {
  if (isSuccess(action.type, Type.Login)) {
    return null;
  }

  if (isSuccess(action.type, Type.GetTimeline)) {
    return action.payload;
  }

  return state;
};

export default timelineReducer;
