import { ReduxActionType as Type } from "../../../types/redux";
import { requestToJoinTeam } from "../../api/user/request.to.join.team";
import { safeTakeLeading } from "../generic/safe.take.leading.helper";

export function* watchRequestToJoinTeam() {
  yield safeTakeLeading(Type.RequestToJoinTeam, requestToJoinTeam);
}
