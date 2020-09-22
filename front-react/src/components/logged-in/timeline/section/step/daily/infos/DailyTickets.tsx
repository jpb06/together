import React from "react";

import Grid from "@material-ui/core/Grid";

import { Daily as DailyType } from "../../../../../../../stack-shared-code/types";
import DailyTicketsItem from "./tickets/DailyTicketsItem";

interface DailyTicketsProps {
  daily: DailyType;
}

const DailyTickets: React.FC<DailyTicketsProps> = ({ daily }) => {
  return (
    <Grid container spacing={1}>
      <div role="listitem" aria-label="Unforeseen tickets list">
        {daily.unforeseenTickets.length > 0 && (
          <DailyTicketsItem
            label="Unforeseen"
            count={daily.unforeseenTickets.length}
          />
        )}
      </div>
      <div role="listitem" aria-label="Done tickets list">
        {daily.doneTickets.length > 0 && (
          <DailyTicketsItem label="Done" count={daily.doneTickets.length} />
        )}
      </div>
    </Grid>
  );
};

export default DailyTickets;
