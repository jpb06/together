import React from "react";

import {
    Daily as DailyType, InvitedUser, TeamInvite, TeamJoinRequest, TeamMember, TimeLineEntryData,
    TimeLineEntryKind, UserJoinRequest
} from "../../../../../stack-shared-code/types";
import Daily from "./daily/Daily";
import InvitationSentToCurrentUser from "./invitations-sent-to-current-user/InvitationSentToCurrentUser";
import InviteToJoinCurrentTeam from "./invites-to-join-current-team/InviteToJoinCurrentTeam";
import JoinRequestSentByCurrentUser from "./join-requests-sent-by-current-user/JoinRequestSentByCurrentUser";
import JoinRequestToCurrentTeam from "./join-requests-to-current-team/JoinRequestToCurrentTeam";
import NewTeamMemberNotice from "./new-team-member-notice/NewTeamMemberNotice";
import StepDivider from "./StepDivider";
import styles from "./TimelineStepContent.styles";

interface TimelineStepContentProps {
  type: TimeLineEntryKind;
  data: TimeLineEntryData;
}

const TimelineStepContent: React.FC<TimelineStepContentProps> = ({
  type,
  data,
}) => {
  const classes = styles();

  return (
    <div>
      <div className={classes.content}>
        {
          {
            Daily: <Daily daily={data as DailyType} />,
            InviteToJoinCurrentTeam: (
              <InviteToJoinCurrentTeam invite={data as InvitedUser} />
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
            ),
          }[type]
        }
      </div>
      <StepDivider />
    </div>
  );
};

export default TimelineStepContent;
