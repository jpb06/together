import { initialState } from "../../store/root.state";
import TimeLine from "../../../types/timeline.type";
import { ActionWithPayload } from "../../types/action.payloads";
import { Type, Context, Result } from "../../types/action.types";
import { typeFor } from "../../logic/action-types/redux.action.type.generation";

const timelineReducer = (
  state: TimeLine | null = initialState.timeline,
  action: ActionWithPayload<string, TimeLine>
) => {
  switch (action.type) {
    case typeFor(Type.login, Context.Global, Result.Success):
      return null;
    /* --------------------------------------------------- */
    case typeFor(Type.getTimeline, Context.Global, Result.Success):
      return action.payload;
    /* --------------------------------------------------- */
    default:
      return state;
  }
};

export default timelineReducer;
