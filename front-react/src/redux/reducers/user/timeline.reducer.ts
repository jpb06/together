import { TimeLine } from "../../../../../shared/types";
import { ActionWithPayload, ReduxActionType as Type } from "../../../types/redux";
import { isSuccess } from "../../actions/generic/action.checks";
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
