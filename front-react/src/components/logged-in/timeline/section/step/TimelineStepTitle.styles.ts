import { amber } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core";

const styles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center"
  },
  icon: {
    display: "flex",
    flexShrink: 0,
    paddingRight: 8
  },
  content: {
    width: "100%",
    fontSize: "large",
    color: amber[300]
  }
}));

export default styles;
