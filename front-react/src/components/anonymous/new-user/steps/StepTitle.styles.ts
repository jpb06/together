import { makeStyles } from "@material-ui/core";
import { amber } from "@material-ui/core/colors";

const styles = makeStyles((theme) => ({
  stepTitle: {
    color: amber[500],
    margin: 0,
  },
  withBottomMargin: {
    marginBottom: theme.spacing(1),
  },
  centered: {
    textAlign: "center",
  },
}));

export default styles;
