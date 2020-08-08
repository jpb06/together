import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { sagaPayloadAction } from "../generic/payload.action";

export const showAnswerTeamInviteModalAction = (
  isOpen: boolean,
  context: Context = Context.Global
) => sagaPayloadAction(Type.ShowAnswerTeamInviteModal, context, isOpen);
