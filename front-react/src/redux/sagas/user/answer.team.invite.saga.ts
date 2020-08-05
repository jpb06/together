import { ReduxActionType as Type } from "../../../types/redux";
import { answerTeamInviteTask } from "../../tasks";
import { safeTakeLeading } from "../generic/safe.take.leading.helper";

export function* watchAnswerTeamInvite() {
  yield safeTakeLeading([Type.AnswerTeamInvite], answerTeamInviteTask);
}
