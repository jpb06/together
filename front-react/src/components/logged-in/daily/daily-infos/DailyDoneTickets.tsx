import * as localStore from "local-storage";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Grid from "@material-ui/core/Grid";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";

import LocalStorageKeys from "../../../../logic/local.storage.keys";
import {
    addDoneTicketAction, removeTicketAction, showSnackbarAction
} from "../../../../redux/actions";
import { TicketRemovalType } from "../../../../redux/tasks";
import { BareTeam, CandidateTicket, Daily, TeamMember } from "../../../../stack-shared-code/types";
import { DailyAddActionFeedback, DailyDeleteActionFeedback } from "../../../../types/redux";
import NewTicket from "./tickets/NewTicket";
import TicketList, { TicketUserType } from "./tickets/TicketList";

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
  const dispatch = useDispatch();

  const [currentTeam] = useState<BareTeam>(
    localStore.get<BareTeam>(LocalStorageKeys.currentTeam)
  );

  const handleTicketCreation = (ticket: CandidateTicket) => {
    // Only one ticket creation action at a time
    if (addActionFeedback.isPending) return;

    const name = `${ticket.key}-${ticket.number}`;

    const assignee = teamMembers.find((user) => user.id === ticket.userId);
    if (!assignee) {
      dispatch(showSnackbarAction(`Unable to find ticket ${name}'s assignee`));
      return;
    }

    if (
      daily.unforeseenTickets.find((el) => el.name === name) ||
      daily.doneTickets.find((el) => el.name === name)
    ) {
      dispatch(showSnackbarAction(`The ticket ${name} has already been added`));
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
      removeTicketAction(
        TicketRemovalType.Done,
        currentTeam.id,
        new Date().toUTCString(),
        key
      )
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
