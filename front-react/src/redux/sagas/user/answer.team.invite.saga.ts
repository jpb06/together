import { ReduxActionType as Type } from "../../../types/redux";
import { answerTeamInviteTask } from "../../tasks";
import { safeTakeLeadingFor } from "../generic/safe.take.leading.helper";

export function* watchAnswerTeamInvite() {
  yield safeTakeLeadingFor([Type.AnswerTeamInvite], answerTeamInviteTask);
}
