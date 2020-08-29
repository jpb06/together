import clsx from "clsx";
import React, { useState } from "react";

import { useTheme } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

import { stringToColor } from "../../../logic/colors.util";
import { getInitials } from "../../../logic/user.util";
import { BareTeam } from "../../../types/shared";
import styles from "./TeamAvatar.styles";

interface TeamAvatarProps {
  team: BareTeam;
  isBigAvatar?: boolean;
}

const TeamAvatar: React.FC<TeamAvatarProps> = ({
  team,
  isBigAvatar = false,
}) => {
  const classes = styles();
  const theme = useTheme();
  const color = stringToColor(team.name);

  const [avatarColor] = useState(color);
  const [avatarTextColor] = useState(theme.palette.getContrastText(color));

  return (
    <Avatar
      role="img"
      style={{ backgroundColor: avatarColor, color: avatarTextColor }}
      className={clsx(classes.smallFont, {
        [classes.big]: isBigAvatar,
        [classes.small]: !isBigAvatar,
      })}
    >
      {getInitials(team.name)}
    </Avatar>
  );
};

export default TeamAvatar;
