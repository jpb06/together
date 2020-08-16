import {
    AnswerTeamInviteModalSteps, ReduxActionContext as Context, ReduxActionType as Type
} from "../../../types/redux";
import { payloadAction, showErrorAction, successPayloadAction } from "../../actions";
import { initialState } from "../../store/root.state";
import answerTeamInviteModalStateReducer from "./answer.team.invite.modal.state.reducer";

describe("Answer team invite modal state reducer", () => {
  it("should initialize properly", () => {
    const reducer = answerTeamInviteModalStateReducer(
      undefined,
      payloadAction("Init" as Type)
    );

    expect(reducer).toStrictEqual(initialState.answerTeamInviteModalState);
  });

  it("should display the modal", () => {
    const reducer = answerTeamInviteModalStateReducer(
      initialState.answerTeamInviteModalState,
      payloadAction(Type.ShowAnswerTeamInviteModal, true)
    );

    expect(reducer).toStrictEqual({
      ...initialState.answerTeamInviteModalState,
      isModalOpen: true,
    });
  });

  it("should change its state when user teams are fetched succesfully", () => {
    const reducer = answerTeamInviteModalStateReducer(
      initialState.answerTeamInviteModalState,
      successPayloadAction(Type.GetUserTeams, Context.Modal, [
        { team: 1 },
        { team: 2 },
      ])
    );

    expect(reducer).toStrictEqual({
      ...initialState.answerTeamInviteModalState,
      step: AnswerTeamInviteModalSteps.SwitchTeam,
    });
  });

  it("should close the modal if user if only in one team", () => {
    const reducer = answerTeamInviteModalStateReducer(
      initialState.answerTeamInviteModalState,
      successPayloadAction(Type.GetUserTeams, Context.Modal, [{ team: 1 }])
    );

    expect(reducer).toStrictEqual({
      ...initialState.answerTeamInviteModalState,
      isModalOpen: false,
    });
  });

  it("should close the modal if timeline is fetched succesfully", () => {
    const reducer = answerTeamInviteModalStateReducer(
      initialState.answerTeamInviteModalState,
      successPayloadAction(Type.GetTimeline, Context.Modal)
    );

    expect(reducer).toStrictEqual({
      ...initialState.answerTeamInviteModalState,
      isModalOpen: false,
    });
  });

  it("should close the modal if a call failed in the modal context", () => {
    const reducer = answerTeamInviteModalStateReducer(
      initialState.answerTeamInviteModalState,
      showErrorAction(Type.GetTimeline, Context.Modal, "Oups")
    );

    expect(reducer).toStrictEqual({
      ...initialState.answerTeamInviteModalState,
      isModalOpen: false,
    });
  });
});
