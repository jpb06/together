import { makeStyles } from "@material-ui/core";
import { amber } from "@material-ui/core/colors";

const styles = makeStyles(theme => ({
  padding: {
    padding: "10px",
    textAlign: "center"
  },
  userName: {
    color: amber[500],
    marginTop: theme.spacing(1)
  }
}));

export default styles;
