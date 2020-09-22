import * as localStore from "local-storage";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Grid from "@material-ui/core/Grid";
import ForumIcon from "@material-ui/icons/Forum";

import LocalStorageKeys from "../../../../logic/local.storage.keys";
import { addSubjectAction, removeDetailsAction } from "../../../../redux/actions";
import { DetailsRemovalType } from "../../../../redux/tasks";
import { BareTeam, Daily, SubjectKind } from "../../../../stack-shared-code/types";
import { DailyAddActionFeedback, DailyDeleteActionFeedback } from "../../../../types/redux";
import DailyCommentsList from "./feelings-subjects/list/DailyCommentsList";
import NewDailyComment, {
    NewDailyCommentKind, NewDailyCommentType
} from "./feelings-subjects/new-item/NewDailyComment";

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
  const dispatch = useDispatch();

  const [currentTeam] = useState<BareTeam>(
    localStore.get<BareTeam>(LocalStorageKeys.currentTeam)
  );

  const handleSubjectCreation = async (data: NewDailyCommentType) => {
    // Only one subject creation action at a time
    if (addActionFeedback.isPending) return;

    dispatch(
      addSubjectAction(currentTeam.id, new Date().toUTCString(), {
        type: data.type as SubjectKind,
        description: data.text,
      })
    );
  };

  const handleSubjectDeletion = async (id: string) => {
    dispatch(
      removeDetailsAction(
        DetailsRemovalType.Subjects,
        currentTeam.id,
        new Date().toUTCString(),
        id
      )
    );
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
