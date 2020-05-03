import { makeStyles } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";

const styles = makeStyles((theme) => ({
  noMargin: {
    margin: 0,
  },
  waitingContainer: {
    height: 290,
  },
  errorText: {
    color: deepOrange[800],
    fontWeight: "bold",
  },
}));

export default styles;
