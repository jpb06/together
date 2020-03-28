import { initialState } from "../store/root.state";
import { ActionWithPayload } from "../actions/util/generic.actions";
import { GET_TIMELINE_SUCCESS } from "../actions/util/action.types";
import TimeLine from "../../types/timeline.type";

const timelineReducer = (
  state: TimeLine | null = initialState.timeline,
  action: ActionWithPayload<string, TimeLine>
) => {
  switch (action.type) {
    /* --------------------------------------------------- */
    case GET_TIMELINE_SUCCESS:
      return action.payload;
    /* --------------------------------------------------- */
    default:
      return state;
  }
};

export { timelineReducer };