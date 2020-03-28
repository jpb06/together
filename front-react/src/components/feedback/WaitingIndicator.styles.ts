import { createStyles, Theme, fade } from "@material-ui/core";
import { amber } from "@material-ui/core/colors";

const styles = createStyles((theme: Theme) => ({
  root: {
    textAlign: "center"
  },
  whiteColored: {
    color: fade("#fff", 0.35)
  },
  amberColored: {
    color: amber[500]
  },
  topPadding: {
    paddingTop: theme.spacing(8)
  },
  bottomMargin: {
    marginBottom: 30
  },
  progressIcon: {
    height: 70,
    width: 70
  },
  spinner: {
    animationName: "$spin",
    animationDuration: "4000ms",
    animationIterationCount: "infinite",
    animationTimingFunction: "linear"
  },
  "@keyframes spin": {
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" }
  }
}));

export default styles;
