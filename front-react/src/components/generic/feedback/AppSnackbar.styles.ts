import { makeStyles } from "@material-ui/core";
import { amber, green, grey } from "@material-ui/core/colors";

const styles = makeStyles((theme) => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: grey[100],
  },
  warning: {
    backgroundColor: amber[700],
  },
  content: {
    display: "flex",
    alignItems: "center",
  },
  text: {
    marginLeft: theme.spacing(1),
  },
}));

export default styles;
