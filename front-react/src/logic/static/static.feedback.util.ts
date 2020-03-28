import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core";

export interface StaticFeedback {
  value: number;
  label: string;
  showDivider: boolean;
  icon: OverridableComponent<SvgIconTypeMap>;
}

const getStaticFeedback = (list: Array<StaticFeedback>, value: number) => {
  const feeling = list.find(el => el.value === value);
  if (!feeling) throw Error(`Invalid static feedback (${value})`);

  return feeling;
};

export default getStaticFeedback;
