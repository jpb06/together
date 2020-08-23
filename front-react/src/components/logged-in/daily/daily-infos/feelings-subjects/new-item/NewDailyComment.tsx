import React from "react";

import { MenuItem } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import staticFeelings from "../../../../../../logic/static/static.feelings";
import staticSubjects from "../../../../../../logic/static/static.subjects";
import { DailyAddActionFeedback } from "../../../../../../types/redux";
import { FeelingKind, SubjectKind } from "../../../../../../types/shared";
import FeedbackButton from "../../../../../generic/buttons/FeedbackButton";
import DailyComment from "../DailyComment";

export enum NewDailyCommentKind {
  Subject,
  Feeling,
}

export interface NewDailyCommentType {
  type: FeelingKind | SubjectKind;
  text: string;
}

interface NewDailyCommentProps {
  type: NewDailyCommentKind;
  feedback: DailyAddActionFeedback;
  onNewComment: (dailyFeedback: NewDailyCommentType) => void;
}

const NewDailyComment: React.FC<NewDailyCommentProps> = ({
  type,
  feedback,
  onNewComment,
}) => {
  const defaultComment = {
    type: 1,
    text: "",
  };
  const [comment, setComment] = React.useState<NewDailyCommentType>(
    defaultComment
  );

  const list =
    type === NewDailyCommentKind.Feeling ? staticFeelings : staticSubjects;

  // Changing input...
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment({
      ...comment,
      [event.target.name]: event.target.value,
    });
  };

  // submitting a new subject
  const handleSubmit = () => {
    if (comment.text !== "") {
      onNewComment(comment);
      setComment(defaultComment);
    }
  };

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12}>
          <TextField
            fullWidth
            select
            variant="outlined"
            label="Type"
            name="type"
            margin="dense"
            value={comment.type}
            onChange={handleChange}
          >
            {list.map((item) => (
              <MenuItem
                key={item.value}
                value={item.value}
                divider={item.showDivider}
              >
                <DailyComment
                  type={type}
                  underlyingType={item.value}
                  label={item.label}
                />
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            fullWidth
            multiline
            rowsMax="4"
            variant="outlined"
            label="Comment"
            name="text"
            margin="dense"
            value={comment.text}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <FeedbackButton
            actionText={feedback.text}
            isPending={feedback.isPending}
            isErrored={feedback.isErrored}
            IconComponent={AddCircleIcon}
            onSubmit={handleSubmit}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default NewDailyComment;
