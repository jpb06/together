import React from "react";
import TopLevelFeedback from "../../generic/feedback/TopLevelFeedback";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

interface WithTeamGuardProps {
  hasTeam: boolean;
  jsx: JSX.Element;
}

const WithTeamGuard: React.FC<WithTeamGuardProps> = ({ hasTeam, jsx }) =>
  hasTeam ? (
    jsx
  ) : (
    <TopLevelFeedback
      Icon={HighlightOffIcon}
      title="No team"
      content={<div>You don't appear to belong to any team yet</div>}
    />
  );

export default WithTeamGuard;
