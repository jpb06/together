import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import CallMergeIcon from "@material-ui/icons/CallMerge";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";
import TimeLine, {
  TimeLineEntryType,
  TimeLineEntryData
} from "../types/timeline.type";
import { TeamMember } from "../types/user.type";

const isCreator = (data: TimeLineEntryData) => {
  if ((data as TeamMember).status) {
    return (data as TeamMember).status === "creator";
  }
  return false;
};

export function getIconFromTimelineEntryType(
  type: TimeLineEntryType,
  data: TimeLineEntryData
): OverridableComponent<SvgIconTypeMap> {
  switch (type) {
    case TimeLineEntryType.Daily:
      return DirectionsRunIcon;
    case TimeLineEntryType.InviteToJoinCurrentTeam:
    case TimeLineEntryType.JoinRequestToCurrentTeam:
      return GroupAddIcon;
    case TimeLineEntryType.InvitationSentToCurrentUser:
    case TimeLineEntryType.JoinRequestSentByCurrentUser:
      return CallMergeIcon;
    case TimeLineEntryType.NewTeamMemberNotice:
      return isCreator(data) ? SupervisedUserCircleIcon : EmojiPeopleIcon;
    default:
      return NotListedLocationIcon;
  }
}

export function isTimelineEmpty(timeline: TimeLine) {
  const isUserEventsEmpty = timeline.userEvents.length === 0;
  const isCurrentTeamEmpty =
    !timeline.currentTeam || timeline.currentTeam.events.length === 0;

  return isUserEventsEmpty && isCurrentTeamEmpty;
}
