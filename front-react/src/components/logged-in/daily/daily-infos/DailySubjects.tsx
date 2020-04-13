import React, { useState } from "react";
import ForumIcon from "@material-ui/icons/Forum";
import Grid from "@material-ui/core/Grid";
import Daily from "../../../../types/daily.type";
import {
  DailyAddActionFeedback,
  DailyDeleteActionFeedback,
} from "../../../../redux/store/root.state";
import BareTeam from "../../../../types/team.type";
import LocalStorageKeys from "../../../../logic/local.storage.keys";
import * as localStorage from "local-storage";
import { useReduxDispatch } from "../../../../hooks/redux.hooks";
import addSubjectAction from "../../../../redux/actions/daily/add.subject.action";
import removeSubjectAction from "../../../../redux/actions/daily/remove.subject.action";
import NewDailyComment, {
  NewDailyCommentKind,
  NewDailyCommentType,
} from "./feelings-subjects/new-item/NewDailyComment";
import { SubjectType } from "../../../../logic/static/static.subjects";
import DailyCommentsList from "./feelings-subjects/list/DailyCommentsList";

interface DailySubjectsProps {
  daily: Daily;
  addActionFeedback: DailyAddActionFeedback;
  deleteActionFeedback: DailyDeleteActionFeedback;
}

const DailySubjects: React.FC<DailySubjectsProps> = ({
  daily,
  addActionFeedback,
  deleteActionFeedback,
}) => {
  const dispatch = useReduxDispatch();

  const [currentTeam] = useState<BareTeam>(
    localStorage.get<BareTeam>(LocalStorageKeys.currentTeam)
  );

  const handleSubjectCreation = async (data: NewDailyCommentType) => {
    // Only one subject creation action at a time
    if (addActionFeedback.isPending) return;

    dispatch(
      addSubjectAction(currentTeam.id, new Date().toUTCString(), {
        type: data.type as SubjectType,
        description: data.text,
      })
    );
  };

  const handleSubjectDeletion = async (id: string) => {
    // Only one subject deletion action at a time
    if (deleteActionFeedback.isPending) return;

    dispatch(removeSubjectAction(currentTeam.id, new Date().toUTCString(), id));
  };

  return (
    <>
      <Grid container justify="center">
        <DailyCommentsList
          type={NewDailyCommentKind.Subject}
          list={daily.subjects}
          feedback={deleteActionFeedback}
          NoDataIconComponent={ForumIcon}
          onItemDeletion={handleSubjectDeletion}
        />
      </Grid>

      <NewDailyComment
        type={NewDailyCommentKind.Subject}
        feedback={addActionFeedback}
        onNewComment={handleSubjectCreation}
      />
    </>
  );
};

export default DailySubjects;
