import { ReduxActionType as Type } from "../../../types/redux";
import { combineActions } from "../../actions";
import { getDailyAndTeamMembersTask } from "../../tasks/daily/get.daily.and.team.members.task";
import { safeTakeLeading } from "../generic/safe.take.leading.helper";

export function* watchGetDaily() {
  yield safeTakeLeading(
    combineActions(Type.GetDaily, Type.TeamMembers),
    getDailyAndTeamMembersTask
  );
}
