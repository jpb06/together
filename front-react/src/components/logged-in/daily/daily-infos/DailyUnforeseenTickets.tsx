import * as localStore from "local-storage";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Grid from "@material-ui/core/Grid";
import AssignmentLateRoundedIcon from "@material-ui/icons/AssignmentLateRounded";

import LocalStorageKeys from "../../../../logic/local.storage.keys";
import {
    addUnforeseenTicketAction, removeTicketAction, showSnackbarAction
} from "../../../../redux/actions";
import { TicketRemovalType } from "../../../../redux/tasks";
import { DailyAddActionFeedback, DailyDeleteActionFeedback } from "../../../../types/redux";
import { BareTeam, CandidateTicket, Daily } from "../../../../types/shared";
import NewTicket from "./tickets/NewTicket";
import TicketList, { TicketUserType } from "./tickets/TicketList";

interface DailyUnforeseenTicketsProps {
  daily: Daily;
  addActionFeedback: DailyAddActionFeedback;
  deleteActionFeedback: DailyDeleteActionFeedback;
}

const DailyUnforeseenTickets: React.FC<DailyUnforeseenTicketsProps> = ({
  daily,
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

    if (
      daily.unforeseenTickets.find((el) => el.name === name) ||
      daily.doneTickets.find((el) => el.name === name)
    ) {
      dispatch(showSnackbarAction(`The ticket ${name} has already been added`));
      return;
    }

    dispatch(
      addUnforeseenTicketAction(currentTeam.id, new Date().toUTCString(), name)
    );
  };

  const handleTicketDeletion = (key: string) => {
    // Only one ticket deletion action at a time
    if (deleteActionFeedback.isPending) return;

    dispatch(
      removeTicketAction(
        TicketRemovalType.Unforeseen,
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
          tickets={daily.unforeseenTickets}
          NoDataIconComponent={AssignmentLateRoundedIcon}
          userType={TicketUserType.Creator}
          feedback={deleteActionFeedback}
          onTicketDeletion={handleTicketDeletion}
        />
      </Grid>

      <NewTicket
        feedback={addActionFeedback}
        onTicketCreation={handleTicketCreation}
      />
    </div>
  );
};

export default DailyUnforeseenTickets;
