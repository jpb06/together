import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { payloadAction, sagaPayloadAction } from "../generic/payload.action";

export const showAnswerTeamInviteModalAction = (isOpen: boolean) =>
  payloadAction(Type.ShowAnswerTeamInviteModal, isOpen);
