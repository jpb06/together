import {
    ActionWithPayload, AnswerTeamInviteModalState, AnswerTeamInviteModalSteps,
    ReduxActionContext as Context, ReduxActionType as Type
} from "../../../types/redux";
import { TeamWithLastActivity } from "../../../types/shared";
import { isFailedIn, isSuccessFor } from "../../identifiers/generic.actions.identifiers";
import { initialState } from "../../store/root.state";

const answerTeamInviteModalStateReducer = (
  state: AnswerTeamInviteModalState = initialState.answerTeamInviteModalState,
  action: ActionWithPayload<any>
) => {
  if (action.type === Type.ShowAnswerTeamInviteModal) {
    return {
      isModalOpen: action.payload as boolean,
      step: AnswerTeamInviteModalSteps.Question,
    };
  }

  if (isSuccessFor(Type.GetUserTeams, action.type, Context.Modal)) {
    if ((action.payload as Array<TeamWithLastActivity>).length > 1) {
      return {
        ...state,
        step: AnswerTeamInviteModalSteps.SwitchTeam,
      };
    } else {
      return {
        ...state,
        isModalOpen: false,
      };
    }
  }

  if (isSuccessFor(Type.GetTimeline, action.type, Context.Modal)) {
    return {
      ...state,
      isModalOpen: false,
    };
  }

  if (isFailedIn(Context.Modal, action.type)) {
    return {
      ...state,
      isModalOpen: false,
    };
  }

  return state;
};

export default answerTeamInviteModalStateReducer;
