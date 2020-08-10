import { Action } from "redux";

import { ReduxActionContext as Context } from "../../types/redux";
import { isIn, isSaga } from "./generic.actions.identifiers";

export const isAccountCreationAction = (action: Action) =>
  isSaga(action.type) && isIn(Context.Onboarding, action.type);
