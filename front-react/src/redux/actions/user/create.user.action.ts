import { History, LocationState } from "history";

import { sagaPayloadAction } from "../";
import { NewUser } from "../../../stack-shared-code/types";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { CreateUserParams } from "../../tasks";

export const createUserAction = (
  user: NewUser,
  history: History<LocationState>,
  context: Context = Context.Global
) =>
  sagaPayloadAction<CreateUserParams>(Type.CreateUser, context, {
    ...user,
    history,
  });
