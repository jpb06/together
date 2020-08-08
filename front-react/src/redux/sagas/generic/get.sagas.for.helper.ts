import { Action } from "redux";

import { ReduxActionType as Type } from "../../../types/redux";
import { isSagaFor } from "../../identifiers/generic.actions.identifiers";

export const getSagasFor = (actionsTypes: Array<Type>) => (action: Action) =>
  actionsTypes.some((type) => isSagaFor(type, action.type));
