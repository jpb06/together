import React from "react";
import styles from "./Ticket.styles";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import UserAvatar from "../../../../generic/user-avatar/UserAvatar";
import PendingDeleteButton from "../../../../generic/buttons/PendingDeleteButton";
import { TerseUser } from "../../../../../types/user.type";
import { TicketUserType } from "./TicketList";
import { DailyDeleteActionFeedback } from "../../../../../redux/store/root.state";

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
    <ListItem divider={showDivider}>
      <ListItemAvatar className={classes.avatarContainer}>
        <UserAvatar user={user} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <React.Fragment>
            {userType === TicketUserType.Creator ? "Created by" : "Assigned to"}
            <Typography
              component="span"
              variant="body2"
              className={classes.user}
              color="textPrimary"
            >
              {`${user.firstName} ${user.lastName}`}
            </Typography>
          </React.Fragment>
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
