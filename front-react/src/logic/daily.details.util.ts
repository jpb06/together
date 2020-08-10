import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core";

export interface StaticFeedback {
  value: number;
  label: string;
  showDivider: boolean;
  icon: OverridableComponent<SvgIconTypeMap>;
}

export const getStaticFeedback = (
  list: Array<StaticFeedback>,
  value: number
) => {
  const item = list.find((el) => el.value === value);
  if (!item) throw Error(`Invalid static feedback (${value})`);

  return item;
};

export const getStaticFeedbackIcon = (
  list: Array<StaticFeedback>,
  value: number
) => {
  const item = list.find((el) => el.value === value);
  if (!item) throw Error(`Invalid static feedback (${value})`);

  return item.icon;
};
