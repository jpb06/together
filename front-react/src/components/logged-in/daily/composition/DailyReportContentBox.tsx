import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import React from "react";
import clsx from "clsx";
import CardHeader from "@material-ui/core/CardHeader";
import LinearProgress from "@material-ui/core/LinearProgress";
import styles from "./DailyReportContentBox.styles";
import { DailyGlobalFeedback } from "../../../../redux/types/daily.feedback.type";

interface DailyReportContentBoxProps {
  title: string;
  ContentComponent: React.ElementType;
  feedback: DailyGlobalFeedback;
  data: any;
}

const DailyReportContentBox: React.FC<DailyReportContentBoxProps> = ({
  title,
  ContentComponent,
  feedback,
  data,
}) => {
  const classes = styles();

  const getCardMediaComponent = (): React.ElementType => {
    if (feedback.isValidated || !feedback.isPending) return "div";

    return () => (
      <LinearProgress color="primary" className={clsx(classes.media)} />
    );
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        component={getCardMediaComponent()}
        className={clsx(classes.media, {
          [classes.validationUnset]: !feedback.isValidated,
          [classes.validationSet]: feedback.isValidated,
        })}
        title="Agile"
        src="/"
      />
      <CardHeader title={title} className={classes.cardHeader} />
      <CardContent className={classes.content}>
        <ContentComponent {...data} />
      </CardContent>
    </Card>
  );
};

export default DailyReportContentBox;
