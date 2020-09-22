import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import CallMergeIcon from "@material-ui/icons/CallMerge";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";

import {
    TeamMember, TimeLine, TimeLineEntryData, TimeLineEntryKind
} from "../stack-shared-code/types";

const isCreator = (data: TimeLineEntryData) => {
  if ((data as TeamMember).status) {
    return (data as TeamMember).status === "creator";
  }
  return false;
};

export const getIconFromTimelineEntryType = (
  type: TimeLineEntryKind,
  data: TimeLineEntryData
): OverridableComponent<SvgIconTypeMap> => {
  switch (type) {
    case TimeLineEntryKind.Daily:
      return DirectionsRunIcon;
    case TimeLineEntryKind.InviteToJoinCurrentTeam:
    case TimeLineEntryKind.JoinRequestToCurrentTeam:
      return GroupAddIcon;
    case TimeLineEntryKind.InvitationSentToCurrentUser:
    case TimeLineEntryKind.JoinRequestSentByCurrentUser:
      return CallMergeIcon;
    case TimeLineEntryKind.NewTeamMemberNotice:
      return isCreator(data) ? SupervisedUserCircleIcon : EmojiPeopleIcon;
    default:
      return NotListedLocationIcon;
  }
};

export function isTimelineEmpty(timeline: TimeLine) {
  const isUserEventsEmpty = timeline.userEvents.length === 0;
  const isCurrentTeamEmpty =
    !timeline.currentTeam || timeline.currentTeam.events.length === 0;

  return isUserEventsEmpty && isCurrentTeamEmpty;
}
