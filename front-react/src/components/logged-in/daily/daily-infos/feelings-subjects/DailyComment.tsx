import { Typography } from "@material-ui/core";
import React from "react";
import styles from "./DailyComment.styles";
import { getStaticFeedback } from "../../../../../logic/static/static.feedback.util";
import { NewDailyCommentKind } from "./new-item/NewDailyComment";
import staticSubjects from "../../../../../logic/static/static.subjects";
import staticFeelings from "../../../../../logic/static/static.feelings";

interface DailyCommentProps {
  type: NewDailyCommentKind;
  underlyingType: number;
  label?: string;
}

const DailyComment: React.FC<DailyCommentProps> = ({
  type,
  underlyingType,
  label,
}) => {
  const classes = styles();

  const staticList =
    type === NewDailyCommentKind.Feeling ? staticFeelings : staticSubjects;

  const comment = getStaticFeedback(staticList, underlyingType);
  const IconComponent = comment.icon;

  return (
    <>
      <IconComponent className={classes.middleVerticalAlign} />
      <Typography variant={"caption"} className={classes.text}>
        {label ? label : comment.label}
      </Typography>
    </>
  );
};

export default DailyComment;
