import * as localStore from "local-storage";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Grid from "@material-ui/core/Grid";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";

import LocalStorageKeys from "../../../../logic/local.storage.keys";
import { addFeelingAction, removeDetailsAction } from "../../../../redux/actions";
import { DetailsRemovalType } from "../../../../redux/tasks";
import { DailyAddActionFeedback, DailyDeleteActionFeedback } from "../../../../types/redux";
import { BareTeam, Daily, FeelingKind } from "../../../../types/shared";
import DailyCommentsList from "./feelings-subjects/list/DailyCommentsList";
import NewDailyComment, {
    NewDailyCommentKind, NewDailyCommentType
} from "./feelings-subjects/new-item/NewDailyComment";

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
  const dispatch = useDispatch();

  const [currentTeam] = useState<BareTeam>(
    localStore.get<BareTeam>(LocalStorageKeys.currentTeam)
  );

  const handleFeelingCreation = (data: NewDailyCommentType) => {
    // Only one ticket creation action at a time
    if (addActionFeedback.isPending) return;

    dispatch(
      addFeelingAction(currentTeam.id, new Date().toUTCString(), {
        type: data.type as FeelingKind,
        comment: data.text,
      })
    );
  };

  const handleFeelingDeletion = (id: string) => {
    dispatch(
      removeDetailsAction(
        DetailsRemovalType.Feelings,
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
