import CheckIcon from "@material-ui/icons/Check";
import ErrorIcon from "@material-ui/icons/Error";
import ForwardIcon from "@material-ui/icons/Forward";
import GroupIcon from "@material-ui/icons/Group";
import RowingIcon from "@material-ui/icons/Rowing";

import { SubjectKind } from "../../stack-shared-code/types";
import { StaticFeedback } from "../daily.details.util";

const staticSubjects: Array<StaticFeedback> = [
  {
    value: SubjectKind.Drive,
    label: "Drive",
    showDivider: false,
    icon: ForwardIcon,
  },
  {
    value: SubjectKind.Restraint,
    label: "Restraint",
    showDivider: false,
    icon: RowingIcon,
  },
  {
    value: SubjectKind.Risk,
    label: "Risk",
    showDivider: true,
    icon: ErrorIcon,
  },
  {
    value: SubjectKind.Team,
    label: "Team",
    showDivider: false,
    icon: GroupIcon,
  },
  {
    value: SubjectKind.Goal,
    label: "Goal",
    showDivider: false,
    icon: CheckIcon,
  },
];

export default staticSubjects;
