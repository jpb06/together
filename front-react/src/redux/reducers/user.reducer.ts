import { initialState } from "../store/root.state";
import { ActionWithPayload } from "../actions/util/generic.actions";
import { LOGIN_SUCCESS, UPDATE_USER } from "../actions/util/action.types";
import User from "../../types/user.type";

const userReducer = (
  state: User | null = initialState.user,
  action: ActionWithPayload<string, User>
) => {
  switch (action.type) {
    /* --------------------------------------------------- */
    case LOGIN_SUCCESS:
    case UPDATE_USER:
      return action.payload;
    /* --------------------------------------------------- */
    default:
      return state;
  }
};

export { userReducer };
