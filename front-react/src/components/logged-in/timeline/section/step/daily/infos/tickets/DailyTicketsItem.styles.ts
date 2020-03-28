import { makeStyles } from "@material-ui/core";
import { red, green } from "@material-ui/core/colors";

const styles = makeStyles(theme => ({
  warning: {
    backgroundColor: red[700]
  },
  success: {
    backgroundColor: green[800]
  },
  chip: {
    justifyContent: "left"
  },
  fullWidth: {
    width: "100%"
  }
}));

export default styles;
