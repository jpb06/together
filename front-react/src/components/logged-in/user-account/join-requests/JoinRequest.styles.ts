import { makeStyles } from "@material-ui/core";
import { amber } from "@material-ui/core/colors";

const styles = makeStyles((theme) => ({
  root: {
    padding: "10px",
    textAlign: "center",
  },
  yellowText: {
    color: amber[500],
    marginTop: theme.spacing(1),
  },
}));

export default styles;
