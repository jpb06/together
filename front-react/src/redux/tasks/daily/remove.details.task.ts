import { call, put } from "redux-saga/effects";

import { apiCallTask } from "../";
import { ApiRoutes } from "../../../api/api.routes.enum";
import TogetherApi from "../../../api/setup/together.api";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { successPayloadAction } from "../../actions";

export enum DetailsRemovalType {
  Feelings,
  Subjects,
}

export interface RemoveDetailsParams {
  detailsType: DetailsRemovalType;
  teamId: string;
  date: string;
  id: string;
}

const validateType = (detailsType: DetailsRemovalType) => {
  if (
    detailsType !== DetailsRemovalType.Feelings &&
    detailsType !== DetailsRemovalType.Subjects
  )
    throw new Error(
      "Invalid type for removal: should be either subjects or feelings"
    );
};

export function* removeDetailsSubtask(
  params: RemoveDetailsParams,
  route: ApiRoutes,
  successActionType: Type,
  context: Context
) {
  validateType(params.detailsType);

  const message: string = yield apiCallTask(
    TogetherApi.Instance.post(route, {
      teamId: params.teamId,
      date: params.date,
      id: params.id,
    })
  );

  yield put(successPayloadAction(successActionType, context, message));
}

export function* removeDetailsTask(
  params: RemoveDetailsParams,
  context: Context
) {
  let message;

  switch (params.detailsType) {
    case DetailsRemovalType.Feelings:
      message = yield call(
        removeDetailsSubtask,
        params,
        ApiRoutes.DailyFeelingsRemove,
        Type.RemoveFeeling,
        context
      );
      break;
    case DetailsRemovalType.Subjects:
      message = yield call(
        removeDetailsSubtask,
        params,
        ApiRoutes.DailySubjectsRemove,
        Type.RemoveSubject,
        context
      );
      break;
    default:
  }

  return message;
}
