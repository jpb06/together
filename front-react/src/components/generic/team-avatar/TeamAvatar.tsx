import Avatar from "@material-ui/core/Avatar";
import clsx from "clsx";
import React, { useState } from "react";
import { stringToColor } from "../../../logic/colors.util";
import { useTheme } from "@material-ui/core";
import styles from "./TeamAvatar.styles";
import BareTeam from "../../../types/team.type";
import { getInitials } from "../../../types/user.type";

interface TeamAvatarProps {
  team: BareTeam;
  isBigAvatar?: boolean;
}

const TeamAvatar: React.FC<TeamAvatarProps> = ({
  team,
  isBigAvatar = false
}) => {
  const classes = styles();
  const theme = useTheme();

  const [avatarColor] = useState(stringToColor(team.name));
  const [avatarTextColor] = useState(
    theme.palette.getContrastText(stringToColor(team.name))
  );

  return (
    <Avatar
      style={{ backgroundColor: avatarColor, color: avatarTextColor }}
      className={clsx(classes.smallFont, {
        [classes.big]: isBigAvatar,
        [classes.small]: !isBigAvatar
      })}
    >
      {getInitials(team.name)}
    </Avatar>
  );
};

export default TeamAvatar;
