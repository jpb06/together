import React from "react";
import styles from "./TimelineStepContent.styles";
import {
  TimeLineEntryType,
  TimeLineEntryData
} from "../../../../../types/timeline.type";
import Daily from "./daily/Daily";
import DailyType from "./../../../../../types/daily.type";
import {
  UserJoinRequest,
  TeamMember,
  UserInvite
} from "../../../../../types/user.type";
import InviteToJoinCurrentTeam from "./invites-to-join-current-team/InviteToJoinCurrentTeam";
import JoinRequestToCurrentTeam from "./join-requests-to-current-team/JoinRequestToCurrentTeam";
import InvitationSentToCurrentUser from "./invitations-sent-to-current-user/InvitationSentToCurrentUser";
import { TeamInvite, TeamJoinRequest } from "../../../../../types/invites.type";
import JoinRequestSentByCurrentUser from "./join-requests-sent-by-current-user/JoinRequestSentByCurrentUser";
import NewTeamMemberNotice from "./new-team-member-notice/NewTeamMemberNotice";
import StepDivider from "./StepDivider";

interface TimelineStepContentProps {
  type: TimeLineEntryType;
  data: TimeLineEntryData;
}

const TimelineStepContent: React.FC<TimelineStepContentProps> = ({
  type,
  data
}) => {
  const classes = styles();

  return (
    <div>
      <div className={classes.content}>
        {
          {
            Daily: <Daily daily={data as DailyType} />,
            InviteToJoinCurrentTeam: (
              <InviteToJoinCurrentTeam invite={data as UserInvite} />
            ),
            JoinRequestToCurrentTeam: (
              <JoinRequestToCurrentTeam request={data as UserJoinRequest} />
            ),
            InvitationSentToCurrentUser: (
              <InvitationSentToCurrentUser invite={data as TeamInvite} />
            ),
            JoinRequestSentByCurrentUser: (
              <JoinRequestSentByCurrentUser request={data as TeamJoinRequest} />
            ),
            NewTeamMemberNotice: (
              <NewTeamMemberNotice member={data as TeamMember} />
            )
          }[type]
        }
      </div>
      <StepDivider />
    </div>
  );
};

export default TimelineStepContent;
