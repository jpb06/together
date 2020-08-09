import { all } from "redux-saga/effects";

import { ReduxActionContext as Context } from "../../../types/redux";
import { getTeamMembersTask } from "../team/get.team.members.task";
import { GetDailyParams, getDailyTask } from "./get.daily.task";

export function* getDailyAndTeamMembersTask(
  params: GetDailyParams,
  context: Context
) {
  yield all([
    getDailyTask(params, context),
    getTeamMembersTask(params.teamId, context),
  ]);
}
