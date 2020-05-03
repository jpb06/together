import { createStyles, Theme, fade } from "@material-ui/core";

const styles = createStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(8),
    textAlign: "center",
    color: fade("#fff", 0.8)
  },
  title: {
    fontSize: "xx-large",
    fontweight: 600
  },
  errorIcon: {
    height: 100,
    width: 100
  },
  spinner: {
    animationName: "$spin",
    animationDuration: "600ms",
    animationIterationCount: "1",
    animationTimingFunction: "linear"
  },
  "@keyframes spin": {
    from: { transform: "rotate(180deg)" },
    to: { transform: "rotate(0deg)" }
  }
}));

export default styles;
