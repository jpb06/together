import {
    ActionWithPayload, AnswerTeamInviteModalState, AnswerTeamInviteModalSteps,
    ReduxActionContext as Context, ReduxActionType as Type
} from "../../../types/redux";
import { TeamWithLastActivity } from "../../../types/shared";
import { isFailed, isSuccess } from "../../identifiers/generic.actions.identifiers";
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

  if (isSuccess(action.type, Type.GetUserTeams, Context.Modal)) {
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

  if (isSuccess(action.type, Type.GetTimeline, Context.Modal)) {
    return {
      ...state,
      isModalOpen: false,
    };
  }

  if (
    isFailed(Type.AnswerTeamInvite, Context.Modal) ||
    isFailed(Type.GetUserTeams, Context.Modal)
  ) {
    return {
      ...state,
      isModalOpen: false,
    };
  }

  return state;
};

export default answerTeamInviteModalStateReducer;
