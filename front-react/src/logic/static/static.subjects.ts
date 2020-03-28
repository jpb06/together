import GroupIcon from "@material-ui/icons/Group";
import ForwardIcon from "@material-ui/icons/Forward";
import CheckIcon from "@material-ui/icons/Check";
import RowingIcon from "@material-ui/icons/Rowing";
import ErrorIcon from "@material-ui/icons/Error";
import { StaticFeedback } from "./static.feedback.util";

export enum SubjectType {
  Drive = 1,
  Restraint = 2,
  Risk = 3,
  Team = 4,
  Goal = 5
}

const staticSubjects: Array<StaticFeedback> = [
  {
    value: SubjectType.Drive,
    label: "Drive",
    showDivider: false,
    icon: ForwardIcon
  },
  {
    value: SubjectType.Restraint,
    label: "Restraint",
    showDivider: false,
    icon: RowingIcon
  },
  {
    value: SubjectType.Risk,
    label: "Risk",
    showDivider: true,
    icon: ErrorIcon
  },
  {
    value: SubjectType.Team,
    label: "Team",
    showDivider: false,
    icon: GroupIcon
  },
  {
    value: SubjectType.Goal,
    label: "Goal",
    showDivider: false,
    icon: CheckIcon
  }
];

export default staticSubjects;
