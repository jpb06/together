import React from "react";

import { Select } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import staticTickets from "../../../../../logic/static/static.tickets.keys";
import { CandidateTicket, TerseUser } from "../../../../../stack-shared-code/types";
import { DailyAddActionFeedback } from "../../../../../types/redux";
import FeedbackButton from "../../../../generic/buttons/FeedbackButton";

interface NewTicketProps {
  users?: Array<TerseUser>;
  feedback: DailyAddActionFeedback;
  onTicketCreation: (ticket: CandidateTicket) => void;
}

const NewTicket: React.FC<NewTicketProps> = ({
  users,
  feedback,
  onTicketCreation,
}) => {
  const [ticket, setTicket] = React.useState({
    key: "WEB",
    number: "",
    userId: "",
  });

  // Changing input...
  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    setTicket({
      ...ticket,
      [event.target.name as string]:
        event.target.name === "number"
          ? (event.target.value as string).replace(/\D/, "")
          : event.target.value,
    });
  };

  // submitting a new ticket
  const handleSubmit = () => {
    const isValidNumber = /^[1-9]\d*$/.test(ticket.number);

    if (isValidNumber && ((users && ticket.userId !== "") || !users)) {
      onTicketCreation({
        key: ticket.key,
        number: parseInt(ticket.number, 10),
        userId: ticket.userId,
      });
      setTicket({
        key: "WEB",
        number: "",
        userId: "",
      });
    }
  };

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={5} sm={!users ? 5 : 4}>
          <Select
            fullWidth
            variant="outlined"
            placeholder="User"
            label="Key"
            name="key"
            margin="dense"
            value={ticket.key}
            onChange={handleChange}
            SelectDisplayProps={{
              "aria-label": "Key",
            }}
          >
            {staticTickets.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={7} sm={!users ? 7 : 3}>
          <TextField
            fullWidth
            variant="outlined"
            label="Number"
            name="number"
            margin="dense"
            data-numeric-input
            value={ticket.number}
            onChange={handleChange}
            inputProps={{ pattern: "[0-9]*", "aria-label": "Ticket number" }}
            style={{ margin: 0 }}
          />
        </Grid>
        {users && (
          <Grid item xs={12} sm={5}>
            <Select
              fullWidth
              variant="outlined"
              placeholder="User"
              label="User"
              name="userId"
              margin="dense"
              value={ticket.userId}
              onChange={handleChange}
              SelectDisplayProps={{
                "aria-label": "User",
              }}
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {`${user.firstName} ${user.lastName}`}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        )}
        <Grid item xs={12} sm={12}>
          <FeedbackButton
            actionText={feedback.text}
            isPending={feedback.isPending}
            isErrored={feedback.isErrored}
            IconComponent={AddCircleIcon}
            onSubmit={handleSubmit}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default NewTicket;
