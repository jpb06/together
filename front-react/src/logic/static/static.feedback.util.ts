import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core";

export interface StaticFeedback {
  value: number;
  label: string;
  showDivider: boolean;
  icon: OverridableComponent<SvgIconTypeMap>;
}

const getStaticFeedback = (list: Array<StaticFeedback>, value: number) => {
  const item = list.find((el) => el.value === value);
  if (!item) throw Error(`Invalid static feedback (${value})`);

  return item;
};

const getStaticFeedbackIcon = (list: Array<StaticFeedback>, value: number) => {
  const item = list.find((el) => el.value === value);
  if (!item) throw Error(`Invalid static feedback (${value})`);

  return item.icon;
};

export { getStaticFeedback, getStaticFeedbackIcon };
