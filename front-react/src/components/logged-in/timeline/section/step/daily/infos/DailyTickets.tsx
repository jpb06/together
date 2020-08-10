import React from "react";

import Grid from "@material-ui/core/Grid";

import { Daily as DailyType } from "../../../../../../../types/shared";
import DailyTicketsItem from "./tickets/DailyTicketsItem";

interface DailyTicketsProps {
  daily: DailyType;
}

const DailyTickets: React.FC<DailyTicketsProps> = ({ daily }) => {
  return (
    <Grid container spacing={1}>
      {daily.unforeseenTickets.length > 0 && (
        <DailyTicketsItem
          label="Unforeseen"
          count={daily.unforeseenTickets.length}
        />
      )}
      {daily.doneTickets.length > 0 && (
        <DailyTicketsItem label="Done" count={daily.doneTickets.length} />
      )}
    </Grid>
  );
};

export default DailyTickets;
