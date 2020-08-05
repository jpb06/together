import { ReduxActionType as Type } from "../../../types/redux";
import { NewSubject } from "../../../types/shared";
import { AddSubjectParams } from "../../tasks";
import { payloadAction } from "../generic/payload.action";

export const addSubjectAction = (
  teamId: string,
  date: string,
  subject: NewSubject
) =>
  payloadAction<AddSubjectParams>(Type.AddSubject, {
    teamId,
    date,
    subject,
  });
