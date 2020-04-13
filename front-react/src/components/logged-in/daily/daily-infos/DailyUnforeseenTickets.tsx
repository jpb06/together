import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import AssignmentLateRoundedIcon from "@material-ui/icons/AssignmentLateRounded";
import Daily from "../../../../types/daily.type";
import TicketList, { TicketUserType } from "./tickets/TicketList";
import { CandidateTicket } from "../../../../types/ticket.type";
import { useReduxDispatch } from "../../../../hooks/redux.hooks";
import { MessageType } from "../../../feedback/FeedbackSnackbarContent";
import sendSnackbarFeedbackAction from "../../../../redux/actions/snackbar.feedback.actions";
import addUnforeseenTicketAction from "../../../../redux/actions/daily/add.unforeseen.ticket.action";
import * as localStorage from "local-storage";
import LocalStorageKeys from "../../../../logic/local.storage.keys";
import BareTeam from "../../../../types/team.type";
import removeUnforeseenTicketAction from "../../../../redux/actions/daily/remove.unforeseen.ticket.action";
import {
  DailyDeleteActionFeedback,
  DailyAddActionFeedback,
} from "../../../../redux/store/root.state";
import NewTicket from "./tickets/NewTicket";

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
  const dispatch = useReduxDispatch();

  const [currentTeam] = useState<BareTeam>(
    localStorage.get<BareTeam>(LocalStorageKeys.currentTeam)
  );

  const handleTicketCreation = (ticket: CandidateTicket) => {
    // Only one ticket creation action at a time
    if (addActionFeedback.isPending) return;

    const name = `${ticket.key}-${ticket.number}`;

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
      addUnforeseenTicketAction(currentTeam.id, new Date().toUTCString(), name)
    );
  };

  const handleTicketDeletion = (key: string) => {
    // Only one ticket deletion action at a time
    if (deleteActionFeedback.isPending) return;

    dispatch(
      removeUnforeseenTicketAction(
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
