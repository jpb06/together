import {
    ActionWithPayload, ApplicationStatus, ReduxActionType as Type
} from "../../../types/redux";
import { initialState } from "../../store/root.state";

const applicationStatusReducer = (
  status: number = initialState.status,
  action: ActionWithPayload<ApplicationStatus>
) => {
  if (action.type === Type.ApplicationStatus) {
    return action.payload;
  }

  return status;
};

export default applicationStatusReducer;
