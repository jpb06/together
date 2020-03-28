import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import React from "react";
import Divider from "@material-ui/core/Divider";
import styles from "./DailySection.styles";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core";
import DailyType from "./../../../../../../types/daily.type";

interface DailySectionProps {
  title: string;
  IconComponent: OverridableComponent<SvgIconTypeMap>;
  ContentComponent: React.ElementType;
  daily: DailyType;
}

const DailySection: React.FC<DailySectionProps> = ({
  title,
  IconComponent,
  ContentComponent,
  daily
}) => {
  const classes = styles();

  return (
    <div>
      <ListItem disableGutters className={classes.dailyItem}>
        <ListItemAvatar className={classes.dailyItemIcon}>
          <Avatar className={classes.secondaryColor}>
            <IconComponent color="primary" />
          </Avatar>
        </ListItemAvatar>
        <div className={classes.fullWidth}>
          <span className={classes.title}>{title}</span>
          <ContentComponent daily={daily} />
        </div>
      </ListItem>
      <Divider component="li" />
    </div>
  );
};

export default DailySection;
