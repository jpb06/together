import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

export interface StaticFeedback {
  value: number;
  label: string;
  showDivider: boolean;
  icon: OverridableComponent<SvgIconTypeMap>;
}

export const getStaticFeedback = (list: Array<StaticFeedback>, value: number) =>
  list.find((el) => el.value === value);

export const getStaticFeedbackIcon = (
  list: Array<StaticFeedback>,
  value: number
) => list.find((el) => el.value === value);
