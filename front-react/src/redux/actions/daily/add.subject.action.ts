import { NewSubject } from "../../../stack-shared-code/types";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { AddSubjectParams } from "../../tasks";
import { sagaPayloadAction } from "../generic/payload.action";

export const addSubjectAction = (
  teamId: string,
  date: string,
  subject: NewSubject
) =>
  sagaPayloadAction<AddSubjectParams>(Type.AddSubject, Context.Daily, {
    teamId,
    date,
    subject,
  });
