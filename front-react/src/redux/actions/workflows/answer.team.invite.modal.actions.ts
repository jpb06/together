import { ReduxActionType as Type } from "../../../types/redux";
import { payloadAction } from "../generic/payload.action";

export const showAnswerTeamInviteModalAction = (isOpen: boolean) =>
  payloadAction(Type.ShowAnswerTeamInviteModal, isOpen);
