import React from "react";

import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";

import { TerseUser } from "../../../../../stack-shared-code/types";
import { DailyDeleteActionFeedback } from "../../../../../types/redux";
import PendingDeleteButton from "../../../../generic/buttons/PendingDeleteButton";
import UserAvatar from "../../../../generic/user-avatar/UserAvatar";
import styles from "./Ticket.styles";
import { TicketUserType } from "./TicketList";

interface TicketProps {
  name: string;
  user: TerseUser;
  userType: TicketUserType;
  feedback: DailyDeleteActionFeedback;
  showDivider: boolean;
  onTicketDeletion: (key: string) => void;
}

const Ticket: React.FC<TicketProps> = ({
  name,
  user,
  userType,
  showDivider,
  feedback,
  onTicketDeletion,
}) => {
  const classes = styles();

  const handleRemoval = () => onTicketDeletion(name);

  return (
    <ListItem divider={showDivider} ContainerProps={{ "aria-label": name }}>
      <ListItemAvatar className={classes.avatarContainer}>
        <UserAvatar user={user} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <>
            {userType === TicketUserType.Creator ? "Created by" : "Assigned to"}
            <Typography
              component="span"
              variant="body2"
              className={classes.user}
              color="textPrimary"
            >
              {`${user.firstName} ${user.lastName}`}
            </Typography>
          </>
        }
        secondary={name}
      />
      <ListItemSecondaryAction>
        <Grid container>
          <Grid>
            {feedback.term === name && feedback.isPending ? (
              <PendingDeleteButton />
            ) : (
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={handleRemoval}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Ticket;
