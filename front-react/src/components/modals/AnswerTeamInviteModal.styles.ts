import { makeStyles } from "@material-ui/core";
import { amber } from "@material-ui/core/colors";

const styles = makeStyles({
  title: {
    color: amber[300]
  },
  dialogContent: {
    padding: 0
  },
  waitingContainer: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 20
  }
});

export default styles;
