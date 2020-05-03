import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import Daily from "../../../../types/daily.type";
import { TeamMember } from "../../../../types/user.type";
import NewTicket from "./tickets/NewTicket";
import TicketList, { TicketUserType } from "./tickets/TicketList";
import { CandidateTicket } from "../../../../types/ticket.type";
import { useReduxDispatch } from "../../../../hooks/redux.hooks";
import { MessageType } from "../../../generic/feedback/FeedbackSnackbarContent";
import addDoneTicketAction from "../../../../redux/actions/daily/add.done.ticket.action";
import BareTeam from "../../../../types/team.type";
import LocalStorageKeys from "../../../../logic/local.storage.keys";
import * as localStorage from "local-storage";
import removeDoneTicketAction from "../../../../redux/actions/daily/remove.done.ticket.action";
import {
  DailyAddActionFeedback,
  DailyDeleteActionFeedback,
} from "../../../../redux/types/daily.feedback.type";
import { sendSnackbarFeedbackAction } from "../../../../redux/actions/snackbar.feedback.actions";

interface DailyDoneTicketsProps {
  daily: Daily;
  teamMembers: Array<TeamMember>;
  addActionFeedback: DailyAddActionFeedback;
  deleteActionFeedback: DailyDeleteActionFeedback;
}

const DailyDoneTickets: React.FC<DailyDoneTicketsProps> = ({
  daily,
  teamMembers,
  addActionFeedback,
  deleteActionFeedback,
}) => {
  const dispatch = useReduxDispatch();

  const [currentTeam] = useState<BareTeam>(
    localStorage.get<BareTeam>(LocalStorageKeys.currentTeam)
  );

  const handleTicketCreation = (ticket: CandidateTicket) => {
    // Only one ticket creation action at a time
    if (addActionFeedback.isPending) return;

    const name = `${ticket.key}-${ticket.number}`;

    const assignee = teamMembers.find((user) => user.id === ticket.userId);
    if (!assignee) {
      dispatch(
        sendSnackbarFeedbackAction(
          MessageType.Error,
          `Unable to find ticket ${name}'s assignee`
        )
      );
      return;
    }

    if (daily.unforeseenTickets.find((el) => el.name === name)) {
      dispatch(
        sendSnackbarFeedbackAction(
          MessageType.Error,
          `The ticket ${name} has already been added`
        )
      );
      return;
    }

    dispatch(
      addDoneTicketAction(
        currentTeam.id,
        assignee.email,
        new Date().toUTCString(),
        name
      )
    );
  };

  const handleTicketDeletion = (key: string) => {
    // Only one ticket deletion action at a time
    if (deleteActionFeedback.isPending) return;

    dispatch(
      removeDoneTicketAction(currentTeam.id, new Date().toUTCString(), key)
    );
  };

  return (
    <div>
      <Grid container justify="center">
        <TicketList
          tickets={daily.doneTickets}
          userType={TicketUserType.Assignee}
          NoDataIconComponent={AssignmentTurnedInIcon}
          feedback={deleteActionFeedback}
          onTicketDeletion={handleTicketDeletion}
        />
      </Grid>

      <NewTicket
        users={teamMembers}
        feedback={addActionFeedback}
        onTicketCreation={handleTicketCreation}
      />
    </div>
  );
};

export default DailyDoneTickets;
