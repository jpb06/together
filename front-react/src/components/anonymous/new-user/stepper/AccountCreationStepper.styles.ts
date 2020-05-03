import { makeStyles } from "@material-ui/core";
import { amber } from "@material-ui/core/colors";

const styles = makeStyles((theme) => ({
  stepper: {
    padding: 0,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  stepCompleted: {
    color: amber[500] + " !important",
  },
  alternativeLabel: {
    marginTop: "0 !important",
  },
}));

export default styles;
