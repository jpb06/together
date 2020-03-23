import { ApplicationError } from "../../types/application.error.type";
import { initialState } from "../store/root.state";
import { ActionWithPayload } from "../actions/util/generic.actions";
import { LOGIN_FAILURE, CLEAR_ERROR } from "../actions/util/action.types";

const errorReducer = (
  state: ApplicationError | null = initialState.error,
  action: ActionWithPayload<string, string>
) => {
  switch (action.type) {
    /* --------------------------------------------------- */
    case LOGIN_FAILURE:
      return { message: action.payload };
    /* --------------------------------------------------- */
    case CLEAR_ERROR:
      return null;
    /* --------------------------------------------------- */
    default:
      return state;
  }
};

export { errorReducer };
