import { call, put } from "redux-saga/effects";

import { ApiRoutes } from "../../../api/calls/api.routes.enum";
import TogetherApi, { send } from "../../../api/setup/together.api";
import { ReduxActionType as Type } from "../../../types/redux";
import { payloadAction } from "../../actions";

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

export interface RemoveDetailsResult {
  data?: string;
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

function* remove(
  params: RemoveDetailsParams,
  route: ApiRoutes,
  successActionType: Type
) {
  validateType(params.detailsType);

  const result: RemoveDetailsResult = yield call(
    send,
    TogetherApi.Instance.post(route, {
      teamId: params.teamId,
      date: params.date,
      id: params.id,
    })
  );

  yield put(payloadAction(successActionType, result.data));
}

export function* removeDetails(params: RemoveDetailsParams) {
  let result;

  switch (params.detailsType) {
    case DetailsRemovalType.Feelings:
      result = yield call(
        remove,
        params,
        ApiRoutes.DailyFeelingsRemove,
        Type.RemoveFeelingSuccess
      );
      break;
    case DetailsRemovalType.Subjects:
      result = yield call(
        remove,
        params,
        ApiRoutes.DailySubjectsRemove,
        Type.RemoveSubjectSuccess
      );
      break;
    default:
  }

  return result.data;
}
