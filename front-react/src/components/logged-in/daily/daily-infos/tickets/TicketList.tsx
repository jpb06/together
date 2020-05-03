import React from "react";
import List from "@material-ui/core/List";
import styles from "./TicketList.styles";
import TicketType from "../../../../../types/ticket.type";
import Ticket from "./Ticket";
import { TerseUser } from "../../../../../types/user.type";
import { DailyDeleteActionFeedback } from "../../../../../redux/types/daily.feedback.type";

export enum TicketUserType {
  Assignee,
  Creator,
}

interface TicketListProps {
  tickets: Array<TicketType>;
  NoDataIconComponent: React.ElementType;
  userType: TicketUserType;
  feedback: DailyDeleteActionFeedback;
  onTicketDeletion: (key: string) => void;
}

const TicketList: React.FC<TicketListProps> = ({
  tickets,
  NoDataIconComponent,
  userType,
  feedback,
  onTicketDeletion,
}) => {
  const classes = styles();

  return tickets.length === 0 ? (
    <NoDataIconComponent
      fontSize="large"
      color="primary"
      className={classes.noDataIcon}
    />
  ) : (
    <List dense className={classes.fullWidth}>
      {tickets.map((ticket, index) => (
        <Ticket
          key={ticket.name}
          name={ticket.name}
          user={
            userType === TicketUserType.Assignee
              ? (ticket.assignee as TerseUser)
              : ticket.creator
          }
          userType={userType}
          feedback={feedback}
          showDivider={index !== tickets.length - 1}
          onTicketDeletion={onTicketDeletion}
        />
      ))}
    </List>
  );
};

export default TicketList;
