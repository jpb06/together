import { initialState } from "../store/root.state";
import { ActionWithPayload } from "../actions/util/generic.actions";
import { LOGIN_SUCCESS } from "../actions/util/action.types";
import User from "../../types/user.type";

const userReducer = (
  state: User | null = initialState.user,
  action: ActionWithPayload<string, User>
) => {
  switch (action.type) {
    /* --------------------------------------------------- */
    case LOGIN_SUCCESS:
      return action.payload;
    /* --------------------------------------------------- */
    default:
      return state;
  }
};

export { userReducer };
