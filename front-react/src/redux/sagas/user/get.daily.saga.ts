import { ReduxActionType as Type } from "../../../types/redux";
import { combineActions } from "../../actions";
import { safeTakeLeading } from "../../effects/safe.take.leading.helper";
import { getDailyAndTeamMembersTask } from "../../tasks/daily/get.daily.and.team.members.task";

export function* watchGetDaily() {
  yield safeTakeLeading(
    combineActions(Type.GetDaily, Type.TeamMembers),
    getDailyAndTeamMembersTask
  );
}
