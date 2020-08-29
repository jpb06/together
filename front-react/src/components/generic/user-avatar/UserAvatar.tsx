import clsx from "clsx";
import React, { useState } from "react";

import Avatar from "@material-ui/core/Avatar";
import { useTheme } from "@material-ui/core/styles";

import { stringToColor } from "../../../logic/colors.util";
import { getInitials } from "../../../logic/user.util";
import { TerseUser } from "../../../types/shared";
import styles from "./UserAvatar.styles";

interface UserAvatarProps {
  user: TerseUser;
  isBigAvatar?: boolean;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  user,
  isBigAvatar = false,
}) => {
  const classes = styles();
  const theme = useTheme();

  const fullName = user.fullName
    ? user.fullName
    : `${user.firstName} ${user.lastName}`;
  const initials = user.initials ? user.initials : getInitials(fullName);

  const [avatarColor] = useState(stringToColor(fullName));
  const [avatarTextColor] = useState(
    theme.palette.getContrastText(stringToColor(fullName))
  );

  if (user.avatarName && user.avatarName.length !== 0) {
    return (
      <Avatar
        alt={fullName}
        src={`/static/images/avatars/${user.avatarName}`}
        className={clsx({
          [classes.big]: isBigAvatar,
          [classes.small]: !isBigAvatar,
        })}
      />
    );
  } else {
    return (
      <Avatar
        role="img"
        style={{ backgroundColor: avatarColor, color: avatarTextColor }}
        className={clsx(classes.smallFont, {
          [classes.big]: isBigAvatar,
          [classes.small]: !isBigAvatar,
        })}
      >
        {initials}
      </Avatar>
    );
  }
};

export default UserAvatar;
