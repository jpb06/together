import React from "react";

import { Typography } from "@material-ui/core";

import { getStaticFeedback } from "../../../../../logic/daily.details.util";
import staticFeelings from "../../../../../logic/static/static.feelings";
import staticSubjects from "../../../../../logic/static/static.subjects";
import styles from "./DailyComment.styles";
import { NewDailyCommentKind } from "./new-item/NewDailyComment";

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
  if (!comment) return null;

  const IconComponent = comment.icon;

  return (
    <>
      {label ? (
        <IconComponent className={classes.middleVerticalAlign} />
      ) : (
        <span role="img" aria-label={`${comment.label} icon`}>
          <IconComponent className={classes.middleVerticalAlign} />
        </span>
      )}
      <Typography variant={"caption"} className={classes.text}>
        {label ? label : comment.label}
      </Typography>
    </>
  );
};

export default DailyComment;
