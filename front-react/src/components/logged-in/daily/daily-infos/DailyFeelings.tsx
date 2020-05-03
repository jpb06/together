import React, { useState } from "react";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import Grid from "@material-ui/core/Grid";
import Daily from "../../../../types/daily.type";
import { useReduxDispatch } from "../../../../hooks/redux.hooks";
import BareTeam from "../../../../types/team.type";
import LocalStorageKeys from "../../../../logic/local.storage.keys";
import * as localStorage from "local-storage";
import addFeelingAction from "../../../../redux/actions/daily/add.feeling.action";
import removeFeelingAction from "../../../../redux/actions/daily/remove.feeling.action";
import NewDailyComment, {
  NewDailyCommentKind,
  NewDailyCommentType,
} from "./feelings-subjects/new-item/NewDailyComment";
import { FeelingType } from "../../../../logic/static/static.feelings";
import DailyCommentsList from "./feelings-subjects/list/DailyCommentsList";
import {
  DailyAddActionFeedback,
  DailyDeleteActionFeedback,
} from "../../../../redux/types/daily.feedback.type";

interface DailyFeelingsProps {
  daily: Daily;
  addActionFeedback: DailyAddActionFeedback;
  deleteActionFeedback: DailyDeleteActionFeedback;
}

const DailyFeelings: React.FC<DailyFeelingsProps> = ({
  daily,
  addActionFeedback,
  deleteActionFeedback,
}) => {
  const dispatch = useReduxDispatch();

  const [currentTeam] = useState<BareTeam>(
    localStorage.get<BareTeam>(LocalStorageKeys.currentTeam)
  );

  const handleFeelingCreation = (data: NewDailyCommentType) => {
    // Only one ticket creation action at a time
    if (addActionFeedback.isPending) return;

    dispatch(
      addFeelingAction(currentTeam.id, new Date().toUTCString(), {
        type: data.type as FeelingType,
        comment: data.text,
      })
    );
  };

  const handleFeelingDeletion = (id: string) => {
    // Only one feeling deletion action at a time
    if (deleteActionFeedback.isPending) return;

    dispatch(removeFeelingAction(currentTeam.id, new Date().toUTCString(), id));
  };

  return (
    <>
      <Grid container justify="center">
        <DailyCommentsList
          type={NewDailyCommentKind.Feeling}
          list={daily.feelings}
          feedback={deleteActionFeedback}
          NoDataIconComponent={EmojiEmotionsOutlinedIcon}
          onItemDeletion={handleFeelingDeletion}
        />
      </Grid>

      <NewDailyComment
        type={NewDailyCommentKind.Feeling}
        feedback={addActionFeedback}
        onNewComment={handleFeelingCreation}
      />
    </>
  );
};

export default DailyFeelings;
