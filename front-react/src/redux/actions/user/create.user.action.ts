import { History, LocationState } from "history";

import { sagaPayloadAction } from "../";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { NewUser } from "../../../types/shared";
import { CreateUserParams } from "../../tasks";

export const createUserAction = (
  user: NewUser,
  history: History<LocationState>,
  context: Context = Context.Global
) =>
  sagaPayloadAction<CreateUserParams>(Type.GetUserTeams, context, {
    ...user,
    history,
  });
