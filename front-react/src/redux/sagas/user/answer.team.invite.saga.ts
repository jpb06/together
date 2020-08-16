import { ReduxActionType as Type } from "../../../types/redux";
import { safeTakeLeadingFor } from "../../effects/safe.take.leading.helper";
import { answerTeamInviteTask } from "../../tasks";

export function* watchAnswerTeamInvite() {
  yield safeTakeLeadingFor([Type.AnswerTeamInvite], answerTeamInviteTask);
}
