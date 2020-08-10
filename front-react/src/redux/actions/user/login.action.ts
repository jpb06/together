import { History, LocationState } from "history";

import { sagaPayloadAction } from "../";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { LoginParams } from "../../tasks";

export const loginAction = (
  login: string,
  password: string,
  history: History<LocationState>,
  context: Context = Context.Global
) =>
  sagaPayloadAction<LoginParams>(Type.Login, context, {
    login,
    password,
    history,
  });
